"""In-memory resume extraction for the Proofolio local prototype.

This module extracts text and traceable mentions. It does not make employment,
skill-level, identity, or authorship claims.
"""

from __future__ import annotations

import io
import re
import zipfile
from dataclasses import dataclass
from pathlib import PurePath
from typing import Iterable
from xml.etree import ElementTree

from pypdf import PdfReader


MAX_FILE_BYTES = 10 * 1024 * 1024
MAX_PDF_PAGES = 30


class ResumeParseError(ValueError):
    """A safe, user-displayable error raised while reading a resume."""


@dataclass(frozen=True)
class SourceLine:
    page: int | None
    line: int
    text: str


SKILL_ALIASES: dict[str, tuple[str, ...]] = {
    "Python": ("python",),
    "JavaScript": ("javascript", "ecmascript"),
    "TypeScript": ("typescript",),
    "Java": ("java",),
    "C++": ("c++",),
    "C#": ("c#", "c sharp"),
    "SQL": ("sql", "structured query language"),
    "React": ("react", "react.js", "reactjs"),
    "Node.js": ("node.js", "nodejs", "node js"),
    "Flask": ("flask",),
    "FastAPI": ("fastapi", "fast api"),
    "Django": ("django",),
    "HTML": ("html",),
    "CSS": ("css",),
    "Git": ("git", "github", "gitlab"),
    "Docker": ("docker",),
    "AWS": ("aws", "amazon web services"),
    "Azure": ("azure",),
    "Google Cloud": ("google cloud", "gcp"),
    "REST APIs": ("rest api", "restful api", "rest apis", "restful apis"),
    "Machine learning": ("machine learning", "ml models"),
    "Data analysis": ("data analysis", "data analytics", "data analyst"),
    "Pandas": ("pandas",),
    "NumPy": ("numpy",),
    "TensorFlow": ("tensorflow",),
    "PyTorch": ("pytorch",),
    "Excel": ("excel", "microsoft excel"),
    "Power BI": ("power bi",),
    "Tableau": ("tableau",),
    "Automated testing": ("automated testing", "unit testing", "pytest", "jest"),
    "Communication": ("communication", "presented findings"),
    "Project leadership": ("team lead", "led a team", "project lead"),
}

SECTION_HEADINGS: dict[str, tuple[str, ...]] = {
    "Summary": ("summary", "profile", "about me", "objective"),
    "Experience": ("experience", "employment", "work history", "professional experience"),
    "Education": ("education", "academic background", "qualification"),
    "Projects": ("projects", "selected projects", "personal projects", "portfolio"),
    "Skills": ("skills", "technical skills", "core competencies", "technologies"),
    "Certifications": ("certifications", "certificates", "licenses"),
}


def _clean_lines(text: str, page_number: int | None) -> list[SourceLine]:
    lines: list[SourceLine] = []
    for line_number, raw_line in enumerate(text.splitlines(), start=1):
        normalized = re.sub(r"\s+", " ", raw_line).strip()
        if normalized:
            lines.append(SourceLine(page_number, line_number, normalized))
    return lines


def _extract_pdf(data: bytes) -> tuple[list[SourceLine], int]:
    if not data.startswith(b"%PDF-"):
        raise ResumeParseError("This file does not look like a valid PDF.")
    try:
        reader = PdfReader(io.BytesIO(data), strict=False)
        if reader.is_encrypted:
            raise ResumeParseError("This PDF is password-protected. Export an unlocked copy and try again.")
        if len(reader.pages) > MAX_PDF_PAGES:
            raise ResumeParseError(f"Please use a resume with {MAX_PDF_PAGES} pages or fewer.")
        pages = [page.extract_text() or "" for page in reader.pages]
    except ResumeParseError:
        raise
    except Exception as exc:  # pypdf raises several format-specific exceptions.
        raise ResumeParseError("We couldn't read this PDF. Try exporting it again from your document editor.") from exc

    lines = [line for page_no, text in enumerate(pages, start=1) for line in _clean_lines(text, page_no)]
    if not any(line.text for line in lines):
        raise ResumeParseError("This PDF has no selectable text. Scanned-image OCR is not enabled yet.")
    return lines, len(pages)


def _extract_docx(data: bytes) -> tuple[list[SourceLine], int]:
    try:
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            document_info = archive.getinfo("word/document.xml")
            if document_info.file_size > MAX_FILE_BYTES * 4:
                raise ResumeParseError("This Word document expands beyond the supported size.")
            xml_data = archive.read("word/document.xml")
            if b"<!DOCTYPE" in xml_data.upper() or b"<!ENTITY" in xml_data.upper():
                raise ResumeParseError("This Word document contains unsupported XML declarations.")
        root = ElementTree.fromstring(xml_data)
    except ResumeParseError:
        raise
    except (KeyError, zipfile.BadZipFile, ElementTree.ParseError, OSError) as exc:
        raise ResumeParseError("This Word file is damaged or is not a valid DOCX document.") from exc

    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs: list[str] = []
    for paragraph in root.findall(".//w:p", namespace):
        value = "".join(node.text or "" for node in paragraph.findall(".//w:t", namespace)).strip()
        if value:
            paragraphs.append(value)
    lines = _clean_lines("\n".join(paragraphs), None)
    if not lines:
        raise ResumeParseError("This Word document does not contain readable text.")
    return lines, 1


def _extract_txt(data: bytes) -> tuple[list[SourceLine], int]:
    try:
        text = data.decode("utf-8-sig")
    except UnicodeDecodeError:
        try:
            text = data.decode("cp1252")
        except UnicodeDecodeError as exc:
            raise ResumeParseError("This text file has an unsupported character encoding.") from exc
    lines = _clean_lines(text, None)
    if not lines:
        raise ResumeParseError("This text file is empty.")
    return lines, 1


def _contains_alias(text: str, alias: str) -> bool:
    escaped = re.escape(alias)
    pattern = rf"(?<![a-z0-9]){escaped}(?![a-z0-9])"
    return re.search(pattern, text, flags=re.IGNORECASE) is not None


def _extract_skills(lines: Iterable[SourceLine]) -> list[dict[str, object]]:
    source_lines = list(lines)
    found: list[dict[str, object]] = []
    for skill_name, aliases in SKILL_ALIASES.items():
        match = next(
            (
                (line, alias)
                for line in source_lines
                for alias in aliases
                if _contains_alias(line.text, alias)
            ),
            None,
        )
        if match is None:
            continue
        line, _alias = match
        found.append(
            {
                "name": skill_name,
                "page": line.page,
                "line": line.line,
                "excerpt": line.text[:240],
                "classification": "resume_mention",
            }
        )
    return found


def _extract_sections(lines: Iterable[SourceLine]) -> list[dict[str, object]]:
    source_lines = list(lines)
    sections: list[dict[str, object]] = []
    for section_name, headings in SECTION_HEADINGS.items():
        heading_index = next(
            (
                index
                for index, line in enumerate(source_lines)
                if re.sub(r"[^a-z ]", "", line.text.lower()).strip() in headings
            ),
            None,
        )
        if heading_index is None:
            continue
        heading = source_lines[heading_index]
        content: list[SourceLine] = []
        for line in source_lines[heading_index + 1 :]:
            normalized = re.sub(r"[^a-z ]", "", line.text.lower()).strip()
            is_next_heading = any(normalized in values for values in SECTION_HEADINGS.values())
            if is_next_heading:
                break
            content.append(line)
            if len(content) == 4:
                break
        sections.append(
            {
                "name": section_name,
                "page": heading.page,
                "line": heading.line,
                "excerpt": " ".join(line.text for line in content)[:320],
                "line_count": len(content),
            }
        )
    return sections


def _extract_contact(lines: list[SourceLine]) -> dict[str, str | None]:
    top_text = "\n".join(line.text for line in lines[:18])
    email_match = re.search(r"(?<![\w.+-])[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}(?![\w.-])", top_text)
    phone_match = re.search(r"(?<!\w)(?:\+?\d[\d \t().-]{7,}\d)(?!\w)", top_text)
    phone = phone_match.group(0).strip() if phone_match else None
    if phone and not 10 <= len(re.sub(r"\D", "", phone)) <= 15:
        phone = None
    name = None
    ignored = {"resume", "curriculum vitae", "cv", "contact", "profile", "portfolio"}
    for line in lines[:8]:
        candidate = line.text.strip(" |·•-")
        if candidate.lower() in ignored or "@" in candidate or re.search(r"https?://|www\.", candidate, re.I):
            continue
        if len(candidate.split()) in (2, 3, 4) and re.fullmatch(r"[A-Za-z][A-Za-z .'-]+", candidate):
            name = candidate
            break
    return {
        "name": name,
        "email": email_match.group(0) if email_match else None,
        "phone": phone,
    }


def parse_resume(file_name: str, data: bytes) -> dict[str, object]:
    """Parse a PDF, DOCX, or text resume without writing the upload to disk."""
    if not data:
        raise ResumeParseError("Choose a resume file before continuing.")
    if len(data) > MAX_FILE_BYTES:
        raise ResumeParseError("This file is larger than 10 MB. Export a smaller resume and try again.")

    extension = PurePath(file_name).suffix.lower()
    if extension == ".pdf":
        lines, page_count = _extract_pdf(data)
        file_type = "PDF"
    elif extension == ".docx":
        lines, page_count = _extract_docx(data)
        file_type = "DOCX"
    elif extension in {".txt", ".md"}:
        lines, page_count = _extract_txt(data)
        file_type = "Text"
    else:
        raise ResumeParseError("Choose a PDF, DOCX, or TXT resume.")

    joined_text = " ".join(line.text for line in lines)
    if len(joined_text) < 60:
        raise ResumeParseError("This file contains too little text to parse as a resume.")

    return {
        "file_name": PurePath(file_name).name,
        "file_type": file_type,
        "page_count": page_count if file_type == "PDF" else None,
        "character_count": len(joined_text),
        "contact": _extract_contact(lines),
        "skills": _extract_skills(lines),
        "sections": _extract_sections(lines),
        "warnings": ["Resume mentions are self-reported. They are not verified skills."],
    }
