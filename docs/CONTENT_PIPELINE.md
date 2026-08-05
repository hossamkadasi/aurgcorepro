# SurgiBoard Global Content Pipeline

## Purpose

This document defines how General Surgery questions move from an original draft to a published learning item. Commercial MCQ books may be used to calibrate curriculum coverage, cognitive level, and examination style, but their protected questions, options, explanations, and distinctive clinical vignettes must not be copied or closely paraphrased without a written license.

## Examination pathways

- Global Core Surgery
- Arab Board Preliminary
- Arab Board Final Knowledge
- Yemeni Board in General Surgery
- Professional Master's in General Surgery

Each pathway has a versioned blueprint. Topic weights remain unset when no verified official distribution is publicly available.

## Editorial states

1. `draft`
2. `evidence_checked`
3. `item_reviewed`
4. `specialist_reviewed`
5. `published`
6. `retired`

Published items require references, completed similarity screening, evidence-review attribution, specialist-review attribution, review dates, and a scheduled re-review date.

## Roles

- **Student:** accesses only issued, published question packs and their own learning records.
- **Editor:** creates and edits questions, sources, and blueprint mappings.
- **Reviewer:** records evidence, item-quality, language, copyright, and specialist review decisions.
- **Administrator:** manages roles, analytics, publication operations, and audit review.

New accounts always receive the `student` role. Users cannot promote their own role.

## Core data model

- `questions`: current item content and publication state.
- `question_versions`: immutable version snapshots.
- `source_registry`: verified textbooks, MCQ style references, guidelines, official blueprints, and research sources.
- `question_sources`: fact, curriculum, style, and copyright-check relationships.
- `exam_blueprints` and `blueprint_domains`: versioned pathway taxonomy.
- `question_blueprint_map`: question-to-domain alignment.
- `editorial_reviews`: review type, decision, checklist, comments, and reviewer identity.
- `audit_events`: server-side security and administrative activity.

## Security boundaries

- The master question table is not directly readable by students.
- Student delivery occurs through the JWT-protected `question-pack` Edge Function.
- The function selects only `published` questions.
- Offline packs are rate-limited, signed, user-watermarked, time-limited, and recorded for revocation/audit.
- Row Level Security restricts users to their own profile, sessions, attempts, bookmarks, devices, packs, and reports.
- Administrator analytics require server-side role verification.
- GraphQL is disabled because the application uses REST, Auth, and Edge Functions only.

## Pilot content status

The first controlled pilot contains 10 newly authored bilingual draft questions covering:

- acute appendicitis
- acute calculous cholecystitis and difficult cholecystectomy
- sepsis and septic shock
- colorectal enhanced recovery

Each pilot item has:

- English stem and explanation
- Arabic translation and explanation
- four options with option-level rationales
- clinical pearl and exam trap
- factual guideline source
- MCQ-book style reference only
- pathway and blueprint alignment
- version 1 snapshot
- pending item-quality, evidence, specialist, language, and copyright reviews

No pilot item is available to students until the publication gates are completed.

## Current launch gates

- Complete specialist and evidence review of the pilot items.
- Run similarity screening and record the result.
- Enable leaked-password protection and CAPTCHA in Supabase Auth.
- Enable GitHub Pages with GitHub Actions for the permanent PWA URL.
- Publish only an approved subset for controlled user testing.
