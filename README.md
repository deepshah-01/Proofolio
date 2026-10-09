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

## Resume import

The import flow accepts PDF, DOCX, TXT, and Markdown files up to 10 MB. It extracts selectable PDF text, Word document paragraphs, or plain text, then identifies contact details, common resume section headings, and skill terms from a small, explicit vocabulary. Each skill mention includes a page and line for PDF files, or a text line for DOCX, TXT, and Markdown files.

The user reviews the extracted items before adding them. They are labelled as resume mentions and remain separate from skills supported by project files. The parser does not assign proficiency levels, verify identity, prove authorship, or use an AI model. Scanned PDFs need OCR and are reported as unsupported.

Uploads are parsed in memory by a service bound to `127.0.0.1`; this prototype does not write the uploaded file or extracted text to a database. Imported claims live in browser memory and disappear when the page is reloaded. Do not expose the development server to a public network.

## Other screens

- **Overview:** candidate snapshot, sample evidence, and role readiness.
- **My skills:** search and filter project evidence and resume mentions.
- **Role match:** inspect requirement-by-requirement support and gaps.
- **Learning plan:** track practical sample tasks.
- **Public view:** preview a recruiter passport. The share action is illustrative and does not create a hosted profile.

The learner, projects, code excerpts, role requirements, and learning tasks outside resume import are synthetic prototype data. GitHub repository analysis, hosted sharing, accounts, persistence, and production deployment are not implemented.

## Implementation

- `index.html`, `styles.css`, `app.js` — responsive interface and browser-side interactions.
- `server.py` — local web server and bounded upload endpoint.
- `resume_parser.py` — format extraction, source locations, and conservative term matching.
- `requirements.txt` — Flask and pypdf dependencies.
- `sample_resume.txt` — synthetic resume you can use to try the import flow.

The PDF reader uses pypdf text extraction. Extraction quality depends on the PDF having selectable text; it does not perform OCR. See the [pypdf text extraction guide](https://pypdf.readthedocs.io/en/stable/user/extract-text.html).
