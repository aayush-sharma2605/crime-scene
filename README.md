# CRIME SCENE: THE UNSOLVED CASE 🔍
> **A College Crime-Investigation Competition Web Application**  
> Built with Next.js 16 (App Router), React, TypeScript, Tailwind CSS, and Supabase.

---

## 🚀 Quick Start (Local Development)

You can run the application directly from the root workspace or from inside `crime-scene-app`:

```bash
# From crime_project root:
npm run dev

# Or from inside crime-scene-app:
cd crime-scene-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Access Credentials

The platform comes pre-seeded with 20 teams and admin access so you can immediately test the entire competition experience without database setup:

| Role | Username / Team Code | Password / PIN | Description |
| :--- | :--- | :--- | :--- |
| **Lead Detective (Admin)** | `ADMIN` | `admin123` | Full Admin HQ: Live Monitor, Submissions Review, Results, Hotspot Editor |
| **Team 01 (Student)** | `TEAM01` | `1234` | Assigned to **Case 01: The Locked Room** |
| **Team 02 (Student)** | `TEAM02` | `1234` | Assigned to **Case 02: The Leaked Question Paper** |
| **Team 03 (Student)** | `TEAM03` | `1234` | Assigned to **Case 03: The Museum Heist** |
| **Team 04 (Student)** | `TEAM04` | `1234` | Assigned to **Case 04: The Missing Person** |
| **Teams 05 - 20** | `TEAM05` ... `TEAM20` | `1234` | Distributed across all 4 cases (~80 participants) |

*(Quick-fill buttons are also available directly on the login page for instant access!)*

---

## 🕵️ The 4 Official Investigation Cases

Every case, evidence clue, suspect, deduction question, accepted concept, hint, and rubric is implemented **EXACTLY** from the competition organizers' document:

1. **CASE 01 — THE LOCKED ROOM**
   - **Victim:** Vikram Rathore (58), owner of Rathore Publishing House
   - **Perpetrator:** Sarah Menon (Business partner & chief editor)
   - **Crime:** Murder staged as burglary/accident using the brass owl paperweight
   - **Clues:** Phone, Window, Flower bed, Coffee cups, Wall clock, Brass owl, Ladder, Door key, Muddy shoe print (Red Herring)

2. **CASE 02 — THE LEAKED QUESTION PAPER**
   - **Incident:** Data Structures exam paper photo leaked on WhatsApp at 8:05 PM
   - **Perpetrator:** Gopal Bhatia (Department clerk)
   - **Motive:** Backlog assistance for his son Aman Bhatia
   - **Clues:** Leaked photo, Green chipped mug, Steel cupboard, Visitor register, Bhatia drawer, Tiffin box, Blue mug (Red Herring)

3. **CASE 03 — THE MUSEUM HEIST**
   - **Incident:** Maharani's Emerald Necklace replaced with a replica in locked display
   - **Perpetrator:** Rekha Bhandari (Jewellery designer, donor guest R.B.)
   - **Motive:** Studio approaching bankruptcy
   - **Clues:** Fake necklace, Catalogue photo, Boy's sketchbook, Cleaner log, Guest list, Key box, CCTV gap (Red Herring)

4. **CASE 04 — THE MISSING PERSON**
   - **Incident:** Ananya Desai disappears 20 hours before the college drama show
   - **Perpetrator:** Kavya Nair (Understudy seeking lead role)
   - **Resolution:** Ananya was lured and locked in Storeroom B-07 (alive & unharmed)
   - **Clues:** Mirror note (spelling clue), Bag, Phone, Key board, Kavya script, Storeroom door, Show poster (Red Herring)

---

## 🎮 Student Investigation Gameplay Loop

1. **LOGIN (`/login`)**: Fast, secure team code + PIN authentication.
2. **TEAM DASHBOARD (`/dashboard`)**: Displays assigned case, status, and rules.
3. **CASE BRIEFING (`/play/[caseId]/briefing`)**: Official incident report and suspect cards. Clicking **Begin Investigation** initiates the **server-side timer**.
4. **CRIME SCENE (`/play/[caseId]/scene`)**: Interactive high-res canvas with zoom controls, pulsating radar hotspots, and forensic discovery modal.
5. **EVIDENCE BOARD (`/play/[caseId]/board`)**: Detective corkboard with discovered clues, notes, and search filter.
6. **DEDUCTION QUESTIONS (`/play/[caseId]/questions`)**: 8 questions per case (MCQ, multi-select, timeline drag/ordering, suspect selection, reasoning) with **real-time autosave**.
7. **HINTS MODAL**: 3 official hints with point deduction confirmation (-5 pts each).
8. **CLOSE THE CASE (`/play/[caseId]/reconstruction`)**: Comprehensive synthesis (Perpetrator, Staged Scene, Motive, Evidence, Timeline).
9. **CASE SEALED (`/play/[caseId]/sealed`)**: Locks submission, records server duration, and shows score breakdown when published.

---

## ⚖️ Scoring System (100 Points Total)

- **Auto-Graded Questions:** 55 Points (evaluated server-side)
- **Case Reconstruction:** 40 Points (graded against official case rubrics via AI/hybrid concept matcher)
- **Speed Bonus:** +5 Points (for fast solving under 30–60 mins)
- **Hint Penalty:** -5 Points per hint used

---

## 🛠️ Admin HQ & Judging System

- **Dashboard (`/admin/dashboard`):** Realtime telemetry across all 80 participants, active investigations, sealed cases, average duration, and score metrics.
- **Participant Manager (`/admin/participants`):** Add teams, assign cases, inspect rosters, view PINs.
- **Visual Hotspot Editor (`/admin/cases/[caseId]/hotspots`):** Organizer can click on the crime scene image to visually position evidence hotspots, edit descriptions, and flag items as **KEY**, **RED HERRING**, or **CONTEXT** (hidden from students).
- **Live Monitor (`/admin/monitor`):** Realtime table of teams, live timer status, clues discovered, hints used, and scores.
- **Submissions & Review (`/admin/submissions/[id]`):** Judge evaluation panel showing student reconstruction text alongside the official solution key, auto-grades, and manual score override inputs.
- **Results & CSV Export (`/admin/results`):** Final ranked leaderboard, student score publication toggle, and instant CSV exports (Teams, Submissions, Final Rankings).

---

## ☁️ Deployment (Vercel + Supabase Free Tier)

1. **Supabase Setup:**
   - Create a free project at [supabase.com](https://supabase.com).
   - Go to the SQL Editor and run `supabase/migrations/0001_schema.sql`.
2. **Environment Variables:**
   - Copy `.env.example` to `.env.local` or configure on Vercel:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
     - `AI_API_KEY` (Optional OpenAI key for enhanced semantic evaluation)
3. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel.
   - Set root directory as `crime-scene-app`.
   - Deploy with 1-click!
