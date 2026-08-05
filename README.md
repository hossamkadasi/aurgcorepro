# SurgiBoard Global

SurgiBoard Global is an evidence-governed, bilingual and offline-capable General Surgery board-preparation platform.

## Initial examination pathways

- Global Core Surgery
- Arab Board Preliminary
- Arab Board Final Knowledge
- Yemeni Board in General Surgery
- Professional Master's in General Surgery

The application uses one deduplicated master question bank and maps each item to relevant examination blueprints. Future MRCS and ABSITE pathways can be added without copying the bank.

## Implemented frontend

- responsive PWA shell for desktop, tablet and mobile;
- English and Arabic RTL support;
- real Supabase Auth integration;
- adaptive daily plan and transparent readiness estimate;
- QBank Builder with Tutor, Timed and Exam modes;
- keyboard-accessible question player;
- bilingual explanation, distractor rationales, clinical pearl, exam trap and learning objective;
- confidence calibration and high-confidence-error detection;
- mock-exam templates, autosaved active sessions and post-exam review;
- performance analytics computed from real attempts;
- SM-2-inspired review queue;
- IndexedDB storage and offline synchronization outbox;
- protected offline question packs with expiry and watermark display;
- role-protected editorial dashboard and admin metrics;
- question-reporting workflow.

## Supabase integration

The static browser client uses only:

- project URL;
- publishable key;
- authenticated `question-pack` Edge Function;
- authenticated `admin-metrics` Edge Function;
- RLS-protected student-owned tables.

No service-role key, database password, signing secret or publisher credential is stored in this repository.

The current static deployment configuration is in `public/assets/config.js`. The publishable key is intentionally safe for browser distribution; authorization remains enforced by Auth, RLS and server-side role checks.

## Content separation

The production master bank is not committed to GitHub. `public/assets/demo-questions.js` contains only explicit unpublished demonstration fixtures. Demo attempts are retained locally and are not inserted into production question-attempt tables.

Commercial MCQ books may calibrate curriculum coverage and style, but protected items are not copied or closely paraphrased without written licensing. See `docs/CONTENT_PIPELINE.md` and `docs/ARCHITECTURE.md`.

## Local validation

Serve the `public` directory from an HTTP server. Opening `index.html` directly with `file://` is not a supported PWA environment.

```bash
python3 -m http.server 8080 --directory public
```

Validation used by GitHub Actions:

```bash
node --check public/assets/config.js
node --check public/assets/demo-questions.js
node --check public/assets/app-core.js
node --check public/assets/app-views.js
node --check public/assets/app-session.js
node --check public/assets/app-account.js
node --check public/assets/app-data.js
node --check public/sw.js
python3 -m json.tool public/manifest.webmanifest
python3 -m json.tool public/version.json
```

## Deployment

`.github/workflows/deploy-pages.yml` validates and deploys `public/` to GitHub Pages. Repository Pages must be enabled once in **Settings → Pages → Source: GitHub Actions** before the first successful publication.

## Current content state

Production publishing remains closed until questions complete rights, similarity, evidence, specialist, item-quality, language and copyright review. The application honestly displays an empty production state when no reviewed question is available.
