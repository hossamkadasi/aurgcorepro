# SurgiBoard Global Architecture

## Product boundary

SurgiBoard Global is an independent General Surgery board-preparation platform. It is not part of SurgCore Pro. The initial pathways are Global Core Surgery, Arab Board Preliminary, Arab Board Final Knowledge, Yemeni Board in General Surgery, and the Professional Master's in General Surgery. The taxonomy is designed to add MRCS and ABSITE mappings without duplicating the master item bank.

## Frontend

The public GitHub Pages application is an installable, bilingual PWA built with standards-based HTML, CSS and JavaScript. It includes:

- responsive desktop, tablet and phone shells;
- English and Arabic RTL presentation;
- adaptive daily plan and readiness estimate;
- QBank builder with Tutor, Timed and Exam modes;
- question-level confidence, timing, bookmarks, flags, notes and reports;
- verified Arab Board mock templates and explicit provisional templates where public evidence is incomplete;
- computed performance analytics and spaced-repetition review queue;
- IndexedDB persistence, an offline synchronization outbox and controlled offline packs;
- server-role-protected editorial metrics.

The application shell is cached by the service worker. The service worker does not cache Supabase Auth, Data API or Edge Function traffic. The master question bank is never embedded in the public repository.

## Backend

The browser contains only the Supabase project URL and publishable key. These are public client identifiers and do not bypass Row Level Security. The service-role key and signing secrets remain server-side.

Student question delivery uses the authenticated `question-pack` Edge Function. It returns only published questions and issues a signed, expiring, user-watermarked pack. Student pages do not query the `questions` table directly.

The browser synchronizes only the signed-in user's records:

- `profiles`
- `question_attempts`
- `study_sessions`
- `bookmarks`
- `question_reports`
- `user_devices`

The `admin-metrics` Edge Function validates the administrator role server-side before returning aggregate metrics.

## Demonstration content

`public/assets/demo-questions.js` contains a small, explicit demonstration fixture. Every fixture is marked `DEMO / UNPUBLISHED`, has no production review date and is excluded from backend attempt synchronization. Demonstration items exist to test the learning interface while the production publication gates remain closed.

## Content governance

Production items are classified as Original, Licensed or Official Public. Publication requires rights clearance, similarity screening, item-quality review, evidence review, specialist review, language review and copyright review. Commercial books can guide curriculum, cognitive level and style but their protected questions and explanations are not copied without a written license.

## Readiness estimate

The readiness value is a transparent learning estimate, not an official pass prediction. The current client-side model combines recent accuracy, blueprint coverage, confidence calibration and timed efficiency. Its interface is intentionally replaceable by a validated server-side psychometric model later.
