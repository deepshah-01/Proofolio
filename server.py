"""Proofolio local MVP server.

SQLite is used only for a zero-setup local MVP. The production target remains
FastAPI with MySQL, as described in docs/architecture.md.
"""

from __future__ import annotations

import io
import json
import os
import re
import secrets
import sqlite3
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

from flask import Flask, Request, g, jsonify, request, send_from_directory, session
from werkzeug.exceptions import RequestEntityTooLarge
from werkzeug.security import check_password_hash, generate_password_hash

from resume_parser import MAX_FILE_BYTES, ResumeParseError, parse_resume

ROOT = Path(__file__).resolve().parent
DATABASE_PATH = Path(os.environ.get("PROOFOLIO_DATABASE", ROOT / "proofolio.db"))
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
ROLES = {"student", "recruiter"}
APPLICATION_STATUSES = {"Submitted", "Under Review", "Shortlisted", "Interview Scheduled", "Selected", "Rejected", "Withdrawn"}
DEMO_USERS = {
    "student": {"email": "student@proofolio.demo", "password": "StudentDemo!23", "display_name": "Aarav Shah"},
    "recruiter": {"email": "recruiter@proofolio.demo", "password": "RecruiterDemo!23", "display_name": "Maya Recruiter"},
}


class InMemoryRequest(Request):
    """Keep untrusted resume uploads in memory for the local parser."""

    def _get_file_stream(self, total_content_length: int | None, content_type: str | None, filename: str | None = None, content_length: int | None = None) -> io.BytesIO:
        return io.BytesIO()


app = Flask(__name__)
app.request_class = InMemoryRequest
app.config.update(
    SECRET_KEY=os.environ.get("PROOFOLIO_SECRET_KEY") or secrets.token_hex(32),
    MAX_CONTENT_LENGTH=MAX_FILE_BYTES + 128 * 1024,
    MAX_FORM_MEMORY_SIZE=64 * 1024,
    MAX_FORM_PARTS=4,
    PERMANENT_SESSION_LIFETIME=timedelta(hours=4),
    SESSION_COOKIE_NAME="proofolio_session",
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def db() -> sqlite3.Connection:
    if "db" not in g:
        connection = sqlite3.connect(DATABASE_PATH)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA foreign_keys = ON")
        g.db = connection
    return g.db


@app.teardown_appcontext
def close_db(_error: BaseException | None = None) -> None:
    connection = g.pop("db", None)
    if connection is not None:
        connection.close()


def init_db() -> None:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    try:
        connection.executescript(
            """
            PRAGMA foreign_keys = ON;
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL COLLATE NOCASE UNIQUE,
              password_hash TEXT NOT NULL,
              role TEXT NOT NULL CHECK(role IN ('student','recruiter')),
              status TEXT NOT NULL DEFAULT 'active',
              created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS student_profiles (
              user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
              full_name TEXT NOT NULL, college TEXT NOT NULL, degree TEXT NOT NULL,
              branch TEXT NOT NULL, current_year TEXT NOT NULL, graduation_year INTEGER NOT NULL,
              career_interests TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL, updated_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS companies (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              owner_user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
              name TEXT NOT NULL, industry TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '',
              website TEXT NOT NULL DEFAULT '', location TEXT NOT NULL DEFAULT '', contact_name TEXT NOT NULL,
              official_email TEXT NOT NULL,
              verification_status TEXT NOT NULL DEFAULT 'unverified'
                CHECK(verification_status IN ('unverified','pending','verified','rejected')),
              created_at TEXT NOT NULL, updated_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS opportunities (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              company_id INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
              title TEXT NOT NULL, opportunity_type TEXT NOT NULL CHECK(opportunity_type IN ('internship','full_time')),
              description TEXT NOT NULL, required_skills TEXT NOT NULL DEFAULT '[]', eligible_branches TEXT NOT NULL DEFAULT '[]',
              graduation_year INTEGER, location TEXT NOT NULL DEFAULT '', work_mode TEXT NOT NULL DEFAULT '',
              compensation TEXT NOT NULL DEFAULT '', application_deadline TEXT, status TEXT NOT NULL DEFAULT 'draft'
                CHECK(status IN ('draft','published','closed','archived')),
              created_at TEXT NOT NULL, updated_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_opportunities_company ON opportunities(company_id, status);
            CREATE INDEX IF NOT EXISTS idx_opportunities_public ON opportunities(status, application_deadline);
            CREATE TABLE IF NOT EXISTS applications (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              student_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              opportunity_id INTEGER NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
              consented_at TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Submitted',
              submitted_at TEXT NOT NULL, updated_at TEXT NOT NULL,
              UNIQUE(student_user_id, opportunity_id)
            );
            CREATE TABLE IF NOT EXISTS application_status_history (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              application_id INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
              previous_status TEXT, new_status TEXT NOT NULL,
              changed_by_user_id INTEGER NOT NULL REFERENCES users(id), changed_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS student_skills (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              student_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              name TEXT NOT NULL COLLATE NOCASE, category TEXT NOT NULL DEFAULT 'Skill',
              source TEXT NOT NULL CHECK(source IN ('resume','self_reported','project')),
              evidence_status TEXT NOT NULL DEFAULT 'self_reported'
                CHECK(evidence_status IN ('self_reported','evidence_linked','independently_verified')),
              description TEXT NOT NULL DEFAULT '', citation TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL,
              UNIQUE(student_user_id, name)
            );
            CREATE TABLE IF NOT EXISTS projects (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              student_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              title TEXT NOT NULL, description TEXT NOT NULL, technologies TEXT NOT NULL DEFAULT '[]',
              repository_url TEXT NOT NULL DEFAULT '', deployment_url TEXT NOT NULL DEFAULT '', outcomes TEXT NOT NULL DEFAULT '',
              created_at TEXT NOT NULL, updated_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS evidence (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              student_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
              project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
              skill_id INTEGER REFERENCES student_skills(id) ON DELETE SET NULL,
              evidence_type TEXT NOT NULL, description TEXT NOT NULL, submitted_url TEXT NOT NULL DEFAULT '',
              verification_status TEXT NOT NULL DEFAULT 'unreviewed'
                CHECK(verification_status IN ('unreviewed','reviewed','independently_verified')),
              created_at TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_student_skills_student ON student_skills(student_user_id, evidence_status);
            CREATE INDEX IF NOT EXISTS idx_projects_student ON projects(student_user_id);
            """
        )
        connection.commit()
    finally:
        connection.close()


init_db()


def payload() -> dict[str, Any]:
    body = request.get_json(silent=True)
    return body if isinstance(body, dict) else {}


def field(body: dict[str, Any], name: str, limit: int = 500) -> str:
    value = body.get(name, "")
    return value.strip()[:limit] if isinstance(value, str) else ""


def failure(message: str, status: int = 400):
    return jsonify({"error": message}), status


def session_user() -> sqlite3.Row | None:
    user_id = session.get("user_id")
    if not isinstance(user_id, int):
        return None
    return db().execute("SELECT id, email, role, status FROM users WHERE id = ?", (user_id,)).fetchone()


def require_user(role: str | None = None):
    user = session_user()
    if user is None or user["status"] != "active":
        return None, failure("Sign in to continue.", 401)
    if role and user["role"] != role:
        return None, failure("You do not have access to this action.", 403)
    return user, None


def serialise_user(user: sqlite3.Row) -> dict[str, Any]:
    if user["role"] == "student":
        profile = db().execute("SELECT full_name FROM student_profiles WHERE user_id=?", (user["id"],)).fetchone()
        display_name = profile["full_name"] if profile else user["email"]
    else:
        company = db().execute("SELECT contact_name FROM companies WHERE owner_user_id=?", (user["id"],)).fetchone()
        display_name = company["contact_name"] if company else user["email"]
    return {"authenticated": True, "role": user["role"], "display_name": display_name, "email": user["email"], "demo": False}


def start_user_session(user: sqlite3.Row) -> dict[str, Any]:
    session.clear()
    session.permanent = True
    session["user_id"] = user["id"]
    return serialise_user(user)


def start_demo_session(role: str) -> dict[str, Any]:
    account = DEMO_USERS[role]
    session.clear()
    session.permanent = True
    session["demo_role"] = role
    return {"authenticated": True, "role": role, "display_name": account["display_name"], "email": account["email"], "demo": True}


def company_for(user_id: int) -> sqlite3.Row | None:
    return db().execute("SELECT id FROM companies WHERE owner_user_id=?", (user_id,)).fetchone()


def opportunity_json(row: sqlite3.Row) -> dict[str, Any]:
    return {
        "id": str(row["id"]), "title": row["title"], "type": row["opportunity_type"],
        "description": row["description"], "skills": json.loads(row["required_skills"]),
        "branches": json.loads(row["eligible_branches"]), "graduationYear": row["graduation_year"],
        "location": row["location"], "workMode": row["work_mode"], "compensation": row["compensation"],
        "deadline": row["application_deadline"], "status": row["status"],
        "company": row["company_name"], "verificationStatus": row["verification_status"],
        "experience": "Not specified", "qualification": "See opportunity details", "openings": 1,
    }


@app.after_request
def security_headers(response):
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("X-Frame-Options", "DENY")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.setdefault("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    if request.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    return response


@app.get("/")
def index():
    return send_from_directory(ROOT, "index.html")


@app.get("/<path:asset_name>")
def static_asset(asset_name: str):
    if asset_name not in {"styles.css", "app.js"}:
        return jsonify({"error": "Not found."}), 404
    return send_from_directory(ROOT, asset_name)


@app.post("/api/auth/register")
def register():
    body = payload()
    role = field(body, "role", 20)
    email = field(body, "email", 254).casefold()
    password = body.get("password", "")
    if role not in ROLES:
        return failure("Choose Student or Company.")
    if not EMAIL_PATTERN.match(email):
        return failure("Enter a valid email address.")
    if not isinstance(password, str) or len(password) < 10:
        return failure("Use a password with at least 10 characters.")
    timestamp = now()
    if role == "student":
        full_name, college = field(body, "full_name", 120), field(body, "college", 160)
        degree, branch = field(body, "degree", 120), field(body, "branch", 120)
        current_year, graduation_year = field(body, "current_year", 30), field(body, "graduation_year", 4)
        if not all((full_name, college, degree, branch, current_year, graduation_year.isdigit())):
            return failure("Complete every required student field.")
        if not 2020 <= int(graduation_year) <= 2050:
            return failure("Enter a valid graduation year.")
    else:
        recruiter_name, company_name = field(body, "recruiter_name", 120), field(body, "company_name", 160)
        industry = field(body, "industry", 120)
        if not recruiter_name or not company_name:
            return failure("Add the recruiter and company names.")
    try:
        with db():
            cursor = db().execute("INSERT INTO users (email,password_hash,role,created_at) VALUES (?,?,?,?)", (email, generate_password_hash(password), role, timestamp))
            user_id = cursor.lastrowid
            if role == "student":
                db().execute("INSERT INTO student_profiles (user_id,full_name,college,degree,branch,current_year,graduation_year,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)", (user_id, full_name, college, degree, branch, current_year, int(graduation_year), timestamp, timestamp))
            else:
                db().execute("INSERT INTO companies (owner_user_id,name,industry,contact_name,official_email,created_at,updated_at) VALUES (?,?,?,?,?,?,?)", (user_id, company_name, industry, recruiter_name, email, timestamp, timestamp))
    except sqlite3.IntegrityError:
        return failure("An account already exists for this email.", 409)
    user = db().execute("SELECT id,email,role,status FROM users WHERE id=?", (user_id,)).fetchone()
    return jsonify(start_user_session(user)), 201


@app.post("/api/auth/login")
def login():
    body = payload()
    role = field(body, "role", 20)
    email = field(body, "email", 254).casefold()
    password = body.get("password", "")
    if role not in ROLES or not EMAIL_PATTERN.match(email) or not isinstance(password, str):
        return failure("Choose a role and enter your email and password.")
    demo = DEMO_USERS.get(role)
    if demo and email == demo["email"] and password == demo["password"]:
        return jsonify(start_demo_session(role))
    user = db().execute("SELECT id,email,password_hash,role,status FROM users WHERE email=?", (email,)).fetchone()
    if user is None or user["role"] != role or not check_password_hash(user["password_hash"], password):
        return failure("Those details do not match the selected account.", 401)
    if user["status"] != "active":
        return failure("This account is not active.", 403)
    return jsonify(start_user_session(user))


@app.post("/api/auth/demo")
def demo_login():
    role = field(payload(), "role", 20)
    if role not in DEMO_USERS:
        return failure("Choose the student or recruiter demo.")
    return jsonify(start_demo_session(role))


@app.post("/api/auth/logout")
def logout():
    session.clear()
    return jsonify({"signed_out": True})


@app.get("/api/auth/session")
def current_session():
    user = session_user()
    if user is not None and user["status"] == "active":
        return jsonify(serialise_user(user))
    role = session.get("demo_role")
    if role in DEMO_USERS:
        return jsonify(start_demo_session(role))
    return jsonify({"authenticated": False}), 401


@app.get("/api/me/profile")
def get_profile():
    user, response = require_user()
    if response is not None:
        return response
    if user["role"] == "student":
        profile = db().execute("SELECT full_name,college,degree,branch,current_year,graduation_year,career_interests FROM student_profiles WHERE user_id=?", (user["id"],)).fetchone()
        return jsonify({"role": "student", "email": user["email"], **dict(profile)})
    company = db().execute("SELECT name,industry,description,website,location,contact_name,official_email,verification_status FROM companies WHERE owner_user_id=?", (user["id"],)).fetchone()
    return jsonify({"role": "recruiter", **dict(company)})


@app.patch("/api/me/profile")
def update_profile():
    user, response = require_user()
    if response is not None:
        return response
    body = payload()
    timestamp = now()
    if user["role"] == "student":
        current = db().execute("SELECT full_name,college,degree,branch,current_year,graduation_year,career_interests FROM student_profiles WHERE user_id=?", (user["id"],)).fetchone()
        values = {
            "full_name": field(body, "full_name", 120) or current["full_name"], "college": field(body, "college", 160) or current["college"],
            "degree": field(body, "degree", 120) or current["degree"], "branch": field(body, "branch", 120) or current["branch"],
            "current_year": field(body, "current_year", 30) or current["current_year"], "career_interests": field(body, "career_interests", 800) or current["career_interests"],
        }
        year = field(body, "graduation_year", 4)
        graduation_year = int(year) if year.isdigit() and 2020 <= int(year) <= 2050 else current["graduation_year"]
        with db():
            db().execute("UPDATE student_profiles SET full_name=?,college=?,degree=?,branch=?,current_year=?,graduation_year=?,career_interests=?,updated_at=? WHERE user_id=?", (*values.values(), graduation_year, timestamp, user["id"]))
    else:
        current = db().execute("SELECT name,industry,description,website,location,contact_name,official_email FROM companies WHERE owner_user_id=?", (user["id"],)).fetchone()
        values = {"name": field(body, "name", 160) or current["name"], "industry": field(body, "industry", 120) or current["industry"], "description": field(body, "description", 2000) or current["description"], "website": field(body, "website", 255) or current["website"], "location": field(body, "location", 160) or current["location"], "contact_name": field(body, "contact_name", 120) or current["contact_name"], "official_email": field(body, "official_email", 254).casefold() or current["official_email"]}
        if not EMAIL_PATTERN.match(values["official_email"]):
            return failure("Enter a valid official email address.")
        with db():
            db().execute("UPDATE companies SET name=?,industry=?,description=?,website=?,location=?,contact_name=?,official_email=?,updated_at=? WHERE owner_user_id=?", (*values.values(), timestamp, user["id"]))
    return get_profile()


@app.get("/api/me/passport")
def get_passport():
    user, response = require_user("student")
    if response is not None:
        return response
    skills = db().execute("SELECT id,name,category,source,evidence_status,description,citation FROM student_skills WHERE student_user_id=? ORDER BY name", (user["id"],)).fetchall()
    projects = db().execute("SELECT id,title,description,technologies,repository_url,deployment_url,outcomes FROM projects WHERE student_user_id=? ORDER BY created_at DESC", (user["id"],)).fetchall()
    evidence = db().execute("SELECT id,project_id,skill_id,evidence_type,description,submitted_url,verification_status FROM evidence WHERE student_user_id=? ORDER BY created_at DESC", (user["id"],)).fetchall()
    return jsonify({"skills": [dict(row) for row in skills], "projects": [{**dict(row), "technologies": json.loads(row["technologies"])} for row in projects], "evidence": [dict(row) for row in evidence]})


@app.post("/api/me/skills")
def save_skill():
    user, response = require_user("student")
    if response is not None:
        return response
    body = payload()
    name = field(body, "name", 100)
    source = field(body, "source", 30) or "self_reported"
    status = field(body, "evidence_status", 40) or "self_reported"
    if not name or source not in {"resume", "self_reported", "project"} or status not in {"self_reported", "evidence_linked", "independently_verified"}:
        return failure("Add a valid skill claim.")
    timestamp = now()
    with db():
        db().execute("""INSERT INTO student_skills (student_user_id,name,category,source,evidence_status,description,citation,created_at)
            VALUES (?,?,?,?,?,?,?,?)
            ON CONFLICT(student_user_id,name) DO UPDATE SET category=excluded.category,source=excluded.source,evidence_status=excluded.evidence_status,description=excluded.description,citation=excluded.citation""", (user["id"], name, field(body, "category", 100) or "Skill", source, status, field(body, "description", 1000), field(body, "citation", 500), timestamp))
    return jsonify({"saved": True}), 201


@app.post("/api/me/projects")
def save_project():
    user, response = require_user("student")
    if response is not None:
        return response
    body = payload()
    title, description = field(body, "title", 160), field(body, "description", 2000)
    technologies = body.get("technologies", [])
    if not title or not description or not isinstance(technologies, list):
        return failure("Add a project title, description, and technologies.")
    clean_technologies = [item.strip()[:100] for item in technologies if isinstance(item, str) and item.strip()][:25]
    timestamp = now()
    cursor = db().execute("INSERT INTO projects (student_user_id,title,description,technologies,repository_url,deployment_url,outcomes,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?)", (user["id"], title, description, json.dumps(clean_technologies), field(body, "repository_url", 500), field(body, "deployment_url", 500), field(body, "outcomes", 1000), timestamp, timestamp))
    for skill_name in clean_technologies:
        db().execute("""INSERT INTO student_skills (student_user_id,name,category,source,evidence_status,description,citation,created_at)
            VALUES (?,?,?,?,?,?,?,?) ON CONFLICT(student_user_id,name) DO UPDATE SET source='project', evidence_status='evidence_linked'""", (user["id"], skill_name, "Project technology", "project", "evidence_linked", f"Linked to project: {title}", title, timestamp))
    db().commit()
    return jsonify({"id": str(cursor.lastrowid)}), 201


@app.get("/api/opportunities")
def list_opportunities():
    rows = db().execute("""SELECT opportunities.*, companies.name AS company_name, companies.verification_status
        FROM opportunities JOIN companies ON companies.id=opportunities.company_id
        WHERE opportunities.status='published' AND (opportunities.application_deadline IS NULL OR opportunities.application_deadline >= date('now'))
        ORDER BY opportunities.created_at DESC""").fetchall()
    return jsonify({"items": [opportunity_json(row) for row in rows]})


@app.get("/api/company/opportunities")
def company_opportunities():
    user, response = require_user("recruiter")
    if response is not None:
        return response
    company = company_for(user["id"])
    rows = db().execute("""SELECT opportunities.*, companies.name AS company_name, companies.verification_status
        FROM opportunities JOIN companies ON companies.id=opportunities.company_id
        WHERE opportunities.company_id=? ORDER BY opportunities.created_at DESC""", (company["id"],)).fetchall()
    return jsonify({"items": [opportunity_json(row) for row in rows]})


@app.post("/api/opportunities")
def create_opportunity():
    user, response = require_user("recruiter")
    if response is not None:
        return response
    body = payload()
    title, description = field(body, "title", 160), field(body, "description", 4000)
    kind, status = field(body, "opportunity_type", 20), field(body, "status", 20) or "draft"
    skills, branches = body.get("required_skills", []), body.get("eligible_branches", [])
    if not title or not description or kind not in {"internship", "full_time"} or status not in {"draft", "published"} or not isinstance(skills, list) or not isinstance(branches, list):
        return failure("Add valid opportunity details before saving.")
    company = db().execute("SELECT id FROM companies WHERE owner_user_id=?", (user["id"],)).fetchone()
    timestamp = now()
    cursor = db().execute("""INSERT INTO opportunities (company_id,title,opportunity_type,description,required_skills,eligible_branches,graduation_year,location,work_mode,compensation,application_deadline,status,created_at,updated_at)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)""", (company["id"], title, kind, description, json.dumps(skills), json.dumps(branches), body.get("graduation_year"), field(body, "location", 160), field(body, "work_mode", 30), field(body, "compensation", 120), field(body, "application_deadline", 10) or None, status, timestamp, timestamp))
    db().commit()
    return jsonify({"id": cursor.lastrowid, "status": status}), 201


@app.post("/api/opportunities/<int:opportunity_id>/applications")
def apply(opportunity_id: int):
    user, response = require_user("student")
    if response is not None:
        return response
    if payload().get("consent") is not True:
        return failure("Confirm profile-sharing consent before applying.")
    listing = db().execute("SELECT id FROM opportunities WHERE id=? AND status='published' AND (application_deadline IS NULL OR application_deadline >= date('now'))", (opportunity_id,)).fetchone()
    if listing is None:
        return failure("This opportunity is closed or expired.", 409)
    timestamp = now()
    try:
        with db():
            cursor = db().execute("INSERT INTO applications (student_user_id,opportunity_id,consented_at,submitted_at,updated_at) VALUES (?,?,?,?,?)", (user["id"], opportunity_id, timestamp, timestamp, timestamp))
            db().execute("INSERT INTO application_status_history (application_id,previous_status,new_status,changed_by_user_id,changed_at) VALUES (?,?,?,?,?)", (cursor.lastrowid, None, "Submitted", user["id"], timestamp))
    except sqlite3.IntegrityError:
        return failure("You have already applied to this opportunity.", 409)
    return jsonify({"id": cursor.lastrowid, "status": "Submitted"}), 201


@app.get("/api/me/applications")
def student_applications():
    user, response = require_user("student")
    if response is not None:
        return response
    rows = db().execute("""SELECT applications.id, applications.opportunity_id, applications.status, applications.submitted_at,
        opportunities.title, opportunities.opportunity_type, companies.name AS company_name
        FROM applications JOIN opportunities ON opportunities.id=applications.opportunity_id
        JOIN companies ON companies.id=opportunities.company_id
        WHERE applications.student_user_id=? ORDER BY applications.submitted_at DESC""", (user["id"],)).fetchall()
    return jsonify({"items": [{"id": str(row["id"]), "opportunityId": str(row["opportunity_id"]), "title": row["title"], "type": row["opportunity_type"], "company": row["company_name"], "status": row["status"], "appliedAt": row["submitted_at"]} for row in rows]})


@app.get("/api/company/opportunities/<int:opportunity_id>/applications")
def company_applications(opportunity_id: int):
    user, response = require_user("recruiter")
    if response is not None:
        return response
    company = company_for(user["id"])
    owned = db().execute("SELECT id FROM opportunities WHERE id=? AND company_id=?", (opportunity_id, company["id"])).fetchone()
    if owned is None:
        return failure("You do not have access to this opportunity.", 404)
    rows = db().execute("""SELECT applications.id, applications.status, applications.submitted_at,
        student_profiles.full_name, student_profiles.college, student_profiles.degree, student_profiles.branch, student_profiles.graduation_year
        FROM applications JOIN student_profiles ON student_profiles.user_id=applications.student_user_id
        WHERE applications.opportunity_id=? ORDER BY applications.submitted_at DESC""", (opportunity_id,)).fetchall()
    return jsonify({"items": [{"id": str(row["id"]), "status": row["status"], "submittedAt": row["submitted_at"], "name": row["full_name"], "college": row["college"], "degree": row["degree"], "branch": row["branch"], "graduationYear": row["graduation_year"]} for row in rows]})


@app.get("/api/company/opportunities/<int:opportunity_id>/matches")
def candidate_matches(opportunity_id: int):
    user, response = require_user("recruiter")
    if response is not None:
        return response
    company = company_for(user["id"])
    opportunity = db().execute("SELECT required_skills,eligible_branches,graduation_year,title FROM opportunities WHERE id=? AND company_id=?", (opportunity_id, company["id"])).fetchone()
    if opportunity is None:
        return failure("You do not have access to this opportunity.", 404)
    required = [item.casefold() for item in json.loads(opportunity["required_skills"])]
    branches = json.loads(opportunity["eligible_branches"])
    candidates = db().execute("SELECT user_id,full_name,college,degree,branch,graduation_year FROM student_profiles ORDER BY full_name").fetchall()
    results = []
    for candidate in candidates:
        eligible = (not branches or candidate["branch"] in branches) and (not opportunity["graduation_year"] or candidate["graduation_year"] == opportunity["graduation_year"])
        skills = db().execute("SELECT name,evidence_status,source,citation FROM student_skills WHERE student_user_id=?", (candidate["user_id"],)).fetchall()
        by_name = {skill["name"].casefold(): skill for skill in skills}
        factors = []
        points = 0.0
        for required_skill in required:
            skill = by_name.get(required_skill)
            if skill is None:
                state = "missing"
            elif skill["evidence_status"] in {"evidence_linked", "independently_verified"}:
                state = "evidence_linked"
                points += 1
            else:
                state = "claimed"
            factors.append({"skill": required_skill, "status": state, "citation": skill["citation"] if skill else ""})
        application = db().execute("SELECT id,status FROM applications WHERE student_user_id=? AND opportunity_id=?", (candidate["user_id"], opportunity_id)).fetchone()
        results.append({"studentId": str(candidate["user_id"]), "name": candidate["full_name"], "college": candidate["college"], "degree": candidate["degree"], "branch": candidate["branch"], "graduationYear": candidate["graduation_year"], "eligible": eligible, "score": round(points / max(len(required), 1) * 100), "factors": factors, "applicationId": str(application["id"]) if application else None, "applicationStatus": application["status"] if application else None})
    results.sort(key=lambda item: (not item["eligible"], -item["score"], item["name"].casefold()))
    return jsonify({"opportunity": opportunity["title"], "items": results})


@app.patch("/api/company/applications/<int:application_id>/status")
def update_application_status(application_id: int):
    user, response = require_user("recruiter")
    if response is not None:
        return response
    new_status = field(payload(), "status", 40)
    if new_status not in APPLICATION_STATUSES - {"Withdrawn"}:
        return failure("Choose a valid recruiter application status.")
    company = company_for(user["id"])
    application = db().execute("""SELECT applications.id, applications.status FROM applications
        JOIN opportunities ON opportunities.id=applications.opportunity_id
        WHERE applications.id=? AND opportunities.company_id=?""", (application_id, company["id"])).fetchone()
    if application is None:
        return failure("You do not have access to this application.", 404)
    if application["status"] == new_status:
        return jsonify({"id": str(application_id), "status": new_status})
    timestamp = now()
    with db():
        db().execute("UPDATE applications SET status=?, updated_at=? WHERE id=?", (new_status, timestamp, application_id))
        db().execute("INSERT INTO application_status_history (application_id,previous_status,new_status,changed_by_user_id,changed_at) VALUES (?,?,?,?,?)", (application_id, application["status"], new_status, user["id"], timestamp))
    return jsonify({"id": str(application_id), "status": new_status})


@app.post("/api/parse-resume")
def parse_resume_endpoint():
    if session.get("demo_role") != "student":
        _user, response = require_user("student")
        if response is not None:
            return response
    uploaded = request.files.get("resume")
    if uploaded is None or not uploaded.filename:
        return failure("Choose a resume file before continuing.")
    try:
        result = parse_resume(uploaded.filename, uploaded.stream.read(MAX_FILE_BYTES + 1))
    except ResumeParseError as exc:
        return failure(str(exc))
    except Exception:
        app.logger.exception("Resume parsing failed")
        return failure("The resume could not be parsed. Try a fresh PDF, DOCX, or TXT export.", 500)
    return jsonify(result)


@app.errorhandler(RequestEntityTooLarge)
def request_too_large(_error):
    return failure("This file is larger than 10 MB. Export a smaller resume and try again.", 413)


if __name__ == "__main__":
    init_db()
    print("Proofolio is running at http://127.0.0.1:5000")
    print("Local accounts are stored in proofolio.db; resume uploads are parsed in memory only.")
    app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
