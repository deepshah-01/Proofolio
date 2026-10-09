"""Local web server and resume parsing endpoint for Proofolio."""

from __future__ import annotations

import io
import hmac
import os
import secrets
from datetime import timedelta
from pathlib import Path

from flask import Flask, Request, jsonify, request, send_from_directory, session
from werkzeug.exceptions import RequestEntityTooLarge

from resume_parser import MAX_FILE_BYTES, ResumeParseError, parse_resume


ROOT = Path(__file__).resolve().parent


class InMemoryRequest(Request):
    """Keep multipart uploads in memory instead of spooling them to disk."""

    def _get_file_stream(
        self,
        total_content_length: int | None,
        content_type: str | None,
        filename: str | None = None,
        content_length: int | None = None,
    ) -> io.BytesIO:
        return io.BytesIO()


app = Flask(__name__)
app.request_class = InMemoryRequest
app.config.update(
    SECRET_KEY=os.environ.get("PROOFOLIO_SECRET_KEY") or secrets.token_hex(32),
    MAX_CONTENT_LENGTH=MAX_FILE_BYTES + 128 * 1024,
    MAX_FORM_MEMORY_SIZE=64 * 1024,
    MAX_FORM_PARTS=4,
    PERMANENT_SESSION_LIFETIME=timedelta(hours=4),
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE="Lax",
)

DEMO_USERS = {
    "student": {
        "email": "student@proofolio.demo",
        "password": "StudentDemo!23",
        "display_name": "Aarav Shah",
    },
    "recruiter": {
        "email": "recruiter@proofolio.demo",
        "password": "RecruiterDemo!23",
        "display_name": "Maya Recruiter",
    },
}


def _start_demo_session(role: str) -> dict[str, str]:
    account = DEMO_USERS[role]
    session.clear()
    session.permanent = True
    session["role"] = role
    session["display_name"] = account["display_name"]
    session["email"] = account["email"]
    return {"role": role, "display_name": account["display_name"], "email": account["email"]}


@app.after_request
def set_response_headers(response):
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
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


@app.post("/api/parse-resume")
def parse_resume_endpoint():
    if session.get("role") != "student":
        return jsonify({"error": "Sign in to the student demo to import a resume."}), 403
    uploaded = request.files.get("resume")
    if uploaded is None or not uploaded.filename:
        return jsonify({"error": "Choose a resume file before continuing."}), 400

    try:
        data = uploaded.stream.read(MAX_FILE_BYTES + 1)
        result = parse_resume(uploaded.filename, data)
    except ResumeParseError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception:
        app.logger.exception("Resume parsing failed")
        return jsonify({"error": "The resume could not be parsed. Try a fresh PDF, DOCX, or TXT export."}), 500

    return jsonify(result)


@app.get("/api/auth/session")
def current_session():
    role = session.get("role")
    if role not in DEMO_USERS:
        return jsonify({"authenticated": False}), 401
    return jsonify(
        {
            "authenticated": True,
            "role": role,
            "display_name": session.get("display_name", DEMO_USERS[role]["display_name"]),
            "email": session.get("email", DEMO_USERS[role]["email"]),
        }
    )


@app.post("/api/auth/login")
def demo_credential_login():
    payload = request.get_json(silent=True) or {}
    role = payload.get("role")
    account = DEMO_USERS.get(role) if isinstance(role, str) else None
    email = payload.get("email", "")
    password = payload.get("password", "")
    if not account or not isinstance(email, str) or not isinstance(password, str):
        return jsonify({"error": "Choose a role and enter the matching demo credentials."}), 400
    valid_email = hmac.compare_digest(email.strip().casefold(), account["email"].casefold())
    valid_password = hmac.compare_digest(password, account["password"])
    if not (valid_email and valid_password):
        return jsonify({"error": "Those details do not match the selected demo account."}), 401
    return jsonify(_start_demo_session(role))


@app.post("/api/auth/demo")
def one_click_demo_login():
    payload = request.get_json(silent=True) or {}
    role = payload.get("role")
    if not isinstance(role, str) or role not in DEMO_USERS:
        return jsonify({"error": "Choose the student or recruiter demo."}), 400
    return jsonify(_start_demo_session(role))


@app.post("/api/auth/logout")
def end_demo_session():
    session.clear()
    return jsonify({"signed_out": True})


@app.errorhandler(RequestEntityTooLarge)
def request_too_large(_error):
    return jsonify({"error": "This file is larger than 10 MB. Export a smaller resume and try again."}), 413


if __name__ == "__main__":
    print("Proofolio is running at http://127.0.0.1:5000")
    print("Resume files are parsed in memory and are not saved by this prototype.")
    app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
