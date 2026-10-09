# Proofolio

Proofolio is a skill passport prototype for CODE APEX 3.0, iMocha Track problem IM-03. It separates skills supported by submitted work from terms mentioned in a resume, and gives each extracted claim a source location for review.

## Run locally

Use Python 3.10 or later.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python server.py
```

Open `http://127.0.0.1:5000`. The parser endpoint is served by the same local Flask process; opening `index.html` directly will not enable resume parsing.

## Sign in to the demo

The sign-in page offers separate **Student** and **Recruiter** workspaces. Select a role and choose **Continue as a …** for one-click access, or use the matching credentials below:

| Role | Email | Password |
| --- | --- | --- |
| Student | `student@proofolio.demo` | `StudentDemo!23` |
| Recruiter | `recruiter@proofolio.demo` | `RecruiterDemo!23` |

The student demo opens the skill passport, opportunity browser, and application tracker. The recruiter demo opens candidate matching, opportunity management, and the company profile. You can post a demo opening, apply with explicit consent, then update its status from the recruiter workspace. Both roles share sample activity in this browser so the full journey can be demonstrated. The candidate, listing, company, and account data are synthetic. These shared credentials are for local prototyping only; this is not production authentication and it does not provide real accounts or access control for a public deployment.

To try the complete loop, sign in as the student, choose an eligible opportunity, review its evidence breakdown, and submit the sample application after checking the consent box. Sign out and use the recruiter demo in the same browser, open **Candidate matching**, select that opportunity, and change the application status. Sign back in as the student to see the updated status. New listings and application states are stored in local browser storage.

## Resume import

The import flow accepts PDF, DOCX, TXT, and Markdown files up to 10 MB. It extracts selectable PDF text, Word document paragraphs, or plain text, then identifies contact details, common resume section headings, and skill terms from a small, explicit vocabulary. Each skill mention includes a page and line for PDF files, or a text line for DOCX, TXT, and Markdown files.

The user reviews and can correct extracted name and contact details, and can uncheck false skill matches before saving. Items are labelled as resume mentions and remain separate from skills supported by project files. The parser does not assign proficiency levels, verify identity, prove authorship, or use an AI model. Scanned PDFs need OCR and are reported as unsupported.

Uploads are parsed in memory by a service bound to `127.0.0.1`; this prototype does not write the uploaded file or extracted text to a database. Opportunity posts, profile edits, and application status are stored in browser local storage for the demo; imported claims and uploaded files are not persisted. Do not expose the development server to a public network.

## Other screens

- **Overview:** candidate snapshot, sample evidence, and role readiness.
- **My skills:** search and filter project evidence and resume mentions.
- **Role match:** inspect requirement-by-requirement support and gaps.
- **Learning plan:** track practical sample tasks.
- **Opportunities:** browse synthetic internship and full-time listings, review eligibility and evidence matches, and apply with explicit profile-sharing consent.
- **Applications:** track submitted demo applications and status changes.
- **Recruiter matching:** inspect requirement-by-requirement evidence for a selected opportunity and update application status.
- **Company profile / Manage opportunities:** edit a synthetic company profile and create sample listings.
- **Public view:** preview a recruiter passport. The share action is illustrative and does not create a hosted profile.

The learner, company, opportunities, recruiter, projects, code excerpts, role requirements, and learning tasks outside resume import are synthetic prototype data. Matching uses explicit branch and graduation-year eligibility checks plus cited evidence coverage; supported evidence counts fully, partial evidence counts half, and resume-only claims do not increase the score. This is a transparent rule-based demo, not an AI model, vacancy service, or hiring recommendation. Company verification, real messaging, GitHub analysis, hosted sharing, persistent accounts, and production deployment are not implemented. Demo sessions use signed Flask cookies and expire after four hours; configure `PROOFOLIO_SECRET_KEY` if you need a stable local signing key across restarts.

## Implementation

- `index.html`, `styles.css`, `app.js` — responsive interface and browser-side interactions.
- `server.py` — local web server and bounded upload endpoint.
- `resume_parser.py` — format extraction, source locations, and conservative term matching.
- `requirements.txt` — Flask and pypdf dependencies.
- `sample_resume.txt` — synthetic resume you can use to try the import flow.

The PDF reader uses pypdf text extraction. Extraction quality depends on the PDF having selectable text; it does not perform OCR. See the [pypdf text extraction guide](https://pypdf.readthedocs.io/en/stable/user/extract-text.html).
