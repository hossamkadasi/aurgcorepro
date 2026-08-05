# SurgiBoard Global

SurgiBoard Global is an independent, bilingual, offline-first General Surgery board preparation platform for:

- Global Core Surgery
- Arab Board Preliminary
- Arab Board Final Knowledge
- Yemeni Board in General Surgery
- Professional Master's in General Surgery

This repository contains the installable PWA and its GitHub Pages deployment workflow. The backend is an isolated Supabase project with authentication, row-level security, user progress, administrative analytics, protected question delivery, signed offline packs, and audit logging.

## Permanent URL

After GitHub Pages is enabled with **Source: GitHub Actions**, the expected URL is:

`https://hossamkadasi.github.io/aurgcorepro/`

The repository can later be renamed to `surgiboard-global` and connected to a custom domain.

## Content policy

Commercial MCQ books may guide curriculum coverage, learning objectives, difficulty, and examination style. Protected questions, options, explanations, and distinctive vignettes must not be copied or closely paraphrased without written permission. Published content must be newly authored or formally licensed, source-mapped, similarity-checked, and reviewed by a General Surgery specialist.

## Security model

- No service-role credentials are stored in the browser.
- New accounts receive the `student` role.
- Users can access only their own profile and learning records.
- The question master table is not directly readable by client roles.
- Question packs are issued by a JWT-protected Edge Function, limited, expiring, signed, and user-watermarked.
- Administrator metrics require a valid JWT and server-side administrator verification.
- Every exposed table uses Row Level Security.

## Medical disclaimer

This platform is for professional education and examination preparation. It is not clinical decision support and does not replace current guidelines, local protocols, specialist judgment, or patient-specific medical advice.
