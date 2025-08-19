## AI Automation Workshop — Austin (Landing Page Blueprint)

Theme: AEO/GEO vs SEO • CRM Copilot • Tools & Skills

Practical demos. Real templates. Walk out with a playbook you can ship the next day.

### Above the Fold

- **Headline**: AI That Sells Itself — If You Set It Up Right
- **Subhead**: Modern buyers don’t “Google and scroll.” They ask. Your business needs to answer—in search, in AI chat, and inside your CRM. In 90 minutes, we’ll show you how.
- **Key Outcomes**
  - **AEO/GEO vs SEO**: Rewire your content for answer engines (ChatGPT, Perplexity, Gemini) and AI‑rewrites in Google. Learn what to write, how to structure it, and how to measure.
  - **CRM Copilot**: Turn your CRM into a revenue assistant—auto‑summaries, lead research, call notes, follow‑ups, and next‑best‑actions.
  - **Tools & Skills**: The exact stack and prompts we use to ship fast without hiring a team.
- **Primary CTA**: [Reserve my seat]
- **Secondary CTA**: [Get the syllabus] (opens modal to capture email)
- **Logistics Strip (icons)**: Date • Time • Venue • Seats limited (≈40) • Recording included • Money‑back guarantee

### Who This Is For

Founders, marketers, sales leaders, and operators who want lead flow that compounds and follow‑ups that happen automatically—without 6‑month agency retainers.

### What You’ll Learn

#### 1) AEO/GEO vs SEO (Answer & Generative Engine Optimization)

- How Google is changing: AI Overviews, People Also Ask, snippets, entity/FAQ structure.
- Answer engines: How ChatGPT/Perplexity/Gemini pick sources and cite.
- Your playbook:
  - Structure pages for questions → answers → proof → action.
  - Build FAQ stacks and entity pages that models love.
  - Add first‑party proof (data, images, checklists) so LLMs trust you.
- Hands‑on: We rework one page live and show how to track wins.

Quick Comparison Table

| Dimension | SEO (Old Playbook) | AEO/GEO (Now) |
| --- | --- | --- |
| Goal | Rank pages | Get quoted as the answer |
| Format | Long posts, keywords | Q&A blocks, concise briefs, checklists |
| Evidence | Generic tips | First‑party data, screenshots, SOPs |
| Structure | H1/H2, backlinks | Entities, FAQs, succinct claims |
| KPI | Positions, sessions | Mentions in AI answers, assisted conversions |

#### 2) CRM Copilot Essentials (Framework & Demos)

- What it covers: cleaning and auto‑entry to CRM, lead scoring, and an auto‑reply assistant to accelerate first response.
- We’ll walkthrough:
  - Normalize and clean incoming leads; enrich firmographics; dedupe and assign owners.
  - Score leads by intent and fit; route based on thresholds; set next‑best‑actions.
  - Draft first‑reply and follow‑ups automatically with safe guardrails and review steps.
- Takeaways: prompt pack, scoring rubric, and a plug‑and‑play workflow map.

#### 3) Tools & Skills (Stack You Can Afford)

- Content: brief generator, FAQ builder, screenshot/diagram SOPs, image trust signals.
- CRM: enrichment, summarization, nudge sequences, pipeline health.
- Ops: meeting notes → tasks → recap email in one click.
- Governance: light guardrails so AI doesn’t hallucinate.

### Agenda (90 Minutes)

- 0:00 – 0:10 — The landscape: why SEO alone stalls and where AI sends buyers now.
- 0:10 – 0:35 — AEO/GEO playbook + live page rework.
- 0:35 – 1:00 — CRM Copilot Essentials — data hygiene, lead scoring, auto‑reply assistant (guided demo).
- 1:00 – 1:20 — Tools & Skills — your stack and setup checklist.
- 1:20 – 1:30 — Q&A + “Setup Clinic” sign‑ups.

### What You Get (Included with Ticket)

- **AEO Starter Pack**: entity brief template, 50 promptable FAQs, trust‑signal checklist.
- **CRM Copilot Prompt Pack**: research, recap, next‑action, reply‑draft prompts.
- **Workflow Maps & SOPs**: diagrams and step‑by‑step setup PDFs.
- **Replay & Slides**: recording and deck within 24 hours.

### Tickets & Pricing

- **Early Bird** — $39 (first 20 seats)
- **General Admission** — $59
- **Team Bundle** — 3 seats for $129
- **VIP Add‑On** — +$149: 30‑minute private audit (8 slots)

Guarantee: If you don’t leave with a clear, shippable plan, email us within 7 days for a full refund—no forms, no fuss.

**CTA**: [Grab your seat →]

### Speaker

**Anton Osipov — Director of Marketing Data Science • Founder, DaVeenci**  
Built AI systems for lead gen, content operations, and sales enablement across tech, energy, and services.

### FAQs

- **Is this beginner‑friendly?** Yes. We assume zero code. You’ll get templates and a stack you can use the same week.
- **Will I get a recording?** Yes, all tickets include the full replay.
- **What tools do I need?** We’ll provide options from free‑to‑affordable. No long‑term contracts required.
- **Can my team join online?** Yes. One ticket per attendee; use the Team Bundle for savings.
- **Refund policy?** 7‑day, no‑questions‑asked.
- **Will you pitch services?** We’ll show real setups. If you want help after, we offer a limited “Setup Clinic.”

### “Setup Clinic” (Optional Service Upsell)

- **Scope**: 2 pages rebuilt for AEO/GEO + CRM Copilot workflow wired to your form.
- **Deliverables**: briefs, prompts, SOPs, and a 30‑min handoff.
- **Slots**: Extremely limited — book at checkout.

### Post‑Purchase Flow (for funnel)

- **Receipt + Calendar Hold (ICS)**
- **Pre‑work Email**: pick your page/offer, answer 3 questions.
- **Reminders**: T‑24h, T‑1h with Zoom/venue details.
- **Replay + Assets** within 24h.
- **Follow‑up**: 7‑day challenge + Setup Clinic CTA.

### Conversion Copy — Variations

- **Hero options**:
  - “Your next customers ask AI. Make sure it answers with you.”
  - “Stop chasing algorithms. Start getting chosen by AI.”
  - “From SEO to AEO: be the answer buyers see first.”
- **Subheads**:
  - “A fast, hands‑on workshop to refactor your content and wire a CRM Copilot.”
  - “90 minutes. One stack. Tangible wins.”
- **CTA microcopy**:
  - “Save my seat (limited)”
  - “Show me the syllabus”
  - “Add VIP audit”

### Social Proof Ideas

- Logos/quotes from past attendees (1‑line outcomes).
- Before/after snippet: screenshot of an AI answer citing your page.
- Short clip: 20‑sec demo of CRM Copilot writing a follow‑up.

---

## Payment & Ticketing (Pro Setup — Stripe Checkout + Webhooks on Render)

High‑level: Your page calls `POST /api/checkout` → Stripe hosts the secure form → returns to your thank‑you page.

Webhook `POST /webhooks/stripe` writes the order to Postgres, updates seat counts, triggers email + ICS, and posts the buyer into your CRM with their ticket QR.

### Architecture (Render)

- **Frontend**: Workshop landing page at `/events/ai-automation-workshop-austin` (existing route).
- **Backend**: Node/Express Web Service with endpoints:
  - `POST /api/checkout` → creates Stripe Checkout Session (line items map to price IDs; include `client_reference_id` and metadata for seat type, email, name, optional VIP).
  - `POST /webhooks/stripe` → processes `checkout.session.completed` (and related events) to confirm payment, decrement available seats, generate ticket, send emails, and log to CRM.

### Environment Variables (Render)

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PUBLIC_URL=https://daveenci.ai/events/ai-automation-workshop-austin`
- `EARLY_PRICE_ID`
- `GA_PRICE_ID`
- `TEAM_PRICE_ID`
- `VIP_PRICE_ID`
- `(Optional) GHL_API_KEY` or your CRM webhook URL

### Frontend Integration

- Primary CTA “Reserve my seat” → calls backend `POST /api/checkout` with payload `{ plan: 'early'|'general'|'team', addOns: ['vip'], email, name }`.
- On session create success → redirect to Stripe Checkout URL.
- Success/Cancel URLs set to:
  - `success_url: ${PUBLIC_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url: ${PUBLIC_URL}`
- Secondary CTA “Get the syllabus” → open modal and capture email; POST to `/api/lead` (simple store + email responder).

### Backend Responsibilities

- Validate incoming payload (plan, add‑ons), pick correct Stripe Price IDs.
- Create Checkout Session with quantity/line‑items; include metadata `{ workshop: 'ai-automation-workshop-austin', seatType, vip }`.
- Webhook: verify signature, handle `checkout.session.completed`:
  - Upsert attendee row in Postgres (email unique).
  - Decrement seats remaining (cap at 40); enforce sold‑out state.
  - Generate ICS invite and email receipt + access details.
  - If VIP, create a Calendly link email or internal booking workflow.
  - Push attendee to CRM (optional) with tags: `workshop`, `vip`.

### Data Model (suggested)

- `workshop_attendees(id, email, name, seat_type, vip, stripe_session_id, amount, status, created_at)`
- `workshop_seats(date, total_seats, seats_sold)` or derive via count

### Thank‑You Page

- Route: `/events/thank-you-event` (existing).
- Show confirmation, seat details, and resend‑email link.

### CSP & External Domains

- Allow Stripe domains in CSP:
  - `https://js.stripe.com`
  - `https://api.stripe.com`
  - `https://checkout.stripe.com`

### QA Checklist

- [ ] Stripe keys and webhook secret set in Render env
- [ ] Price IDs verified (Early, GA, Team, VIP)
- [ ] Seat cap enforced at 40; graceful sold‑out state
- [ ] Success/Cancel URLs verified
- [ ] Webhook signature verified; retries idempotent
- [ ] Postgres writes confirmed; duplicates handled
- [ ] Emails: receipt, ICS, reminders (T‑24h, T‑1h)
- [ ] Thank‑you page renders session details
- [ ] CRM integration optional but working if enabled
- [ ] CSP allows Stripe domains

---

## Build Notes (for `src/pages/events/ai-automation-workshop-austin.tsx`)

- Wire CTAs to the checkout API; ensure component handles pending/error states.
- Implement Syllabus modal with email capture; POST to `/api/lead`.
- Render agendas, outcomes, pricing tiers, FAQs per sections above.
- Keep copy variants in a small local array for easy A/B tests.
- Show “seats remaining” if available (derived from API).

---

## Open Questions

- Exact venue/date/time confirmation for logistics bar.
- Whether to enable Team Bundle as single multi‑quantity checkout vs three single tickets.
- VIP audit scheduling: Calendly or manual booking?


