# Proofolio

**Your skills, with proof.** Proofolio is a polished prototype for IM-03, *Skill Passport: Verified Skills from Real Work*, from the iMocha track in CODE APEX 3.0.

It turns work samples into an evidence-first skill profile, compares that profile with a target role, and suggests practical next steps. A recruiter can scan the shareable passport and open the evidence behind each supported skill.

## Run the prototype

This is a dependency-free web prototype. Open `index.html` in a modern browser, or serve this directory locally:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Prototype flow

1. Start on the overview dashboard and review the sample profile.
2. Open **My skills** to search, filter, and inspect the evidence for each skill.
3. Open **Role match** and compare the profile with a software engineering, frontend, or data analyst role.
4. Open **Learning plan** and mark practical growth tasks complete.
5. Open **Public view** to see a recruiter-facing passport and preview its share action.
6. Use **Add work** to preview the repository and resume intake flow.

The sample learner and work are synthetic. The add-work interaction is explicitly a front-end preview: it does not upload files, contact GitHub, or perform AI analysis. The sample evidence is illustrative and is not a real person's verified work. The passport also explains that cited evidence does not independently prove authorship or identity.

## Trust principles

- A skill should be supported by a traceable work sample, such as a repository file and line range.
- Resume-only claims are visibly separated from repository evidence and do not raise evidence coverage.
- Role matching shows the requirements and reasons behind each result; it is not an opaque AI score.
- Missing evidence appears as a gap, never as a verified skill.
- Learners choose when to share a passport.

## Suggested build path

The current build is the Stage 1/Stage 2 interface prototype. The next implementation layer can add:

- A small API for uploading a resume and selecting a public repository.
- Resume text extraction and repository file indexing with source anchors.
- A skill taxonomy and structured evidence records stored with the source revision.
- An AI extraction step followed by citation and evidence validation.
- A role requirement library, explainable match calculation, and task generation.
- Share links with explicit learner consent and revocation.

Keep API keys on a server, never in the browser or repository. Use public, sample, or synthetic data for the hackathon demo, and credit any libraries, datasets, and model tools added later.

## Project files

- `index.html` — page structure and prototype screens.
- `styles.css` — responsive design system and layouts.
- `app.js` — sample data, navigation, role matching, evidence details, and interactions.
