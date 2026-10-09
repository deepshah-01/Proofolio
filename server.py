"""Local web server and resume parsing endpoint for Proofolio."""

from __future__ import annotations

import io
from pathlib import Path

from flask import Flask, Request, jsonify, request, send_from_directory
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
    MAX_CONTENT_LENGTH=MAX_FILE_BYTES + 128 * 1024,
    MAX_FORM_MEMORY_SIZE=64 * 1024,
    MAX_FORM_PARTS=4,
)


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


@app.errorhandler(RequestEntityTooLarge)
def request_too_large(_error):
    return jsonify({"error": "This file is larger than 10 MB. Export a smaller resume and try again."}), 413


if __name__ == "__main__":
    print("Proofolio is running at http://127.0.0.1:5000")
    print("Resume files are parsed in memory and are not saved by this prototype.")
    app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
