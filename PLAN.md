# Plan: New Refresher Presentation ("Best Of" + Deep Dive)

## Context

The current refresher presentation (~40 slides, 30 min) focuses on the
productivity-learning paradox and expertise reversal. The beginner (3h) and
intermediate (3h) courses have since been developed with richer content. The
goal is to create a new 25-minute presentation that:

- Summarizes the "best of" from both beginner and intermediate courses (~12 min)
- Goes deeper on the Evaluation Paradox + Bounded Rationality (~12 min)
- Archives the current presentation with a timestamp
- Keeps interactive elements (OJS, R visualizations)
- Works for a mixed audience (may have attended one course, not necessarily both)

## Step 1: Archive the current presentation

**Create archive structure:**

- Create directory `slides/archive/ai-higher-ed-2025/`
- Copy `slides/ai-higher-ed/index.qmd` to `slides/archive/ai-higher-ed-2025/index.qmd`
- Update the archived version's YAML footer to indicate it's an archived version

**Update `_quarto.yml`:**

- Add `slides/archive/**/*.qmd` to the `render:` list
- Add an "Archiv" dropdown or nav item in the navbar linking to the archived presentation

**Update `presentation/index.qmd`:**

- Add an "Archiv" section at the bottom with a link to the archived version

**Files to modify:**

- `_quarto.yml` (add render path + nav item)
- `presentation/index.qmd` (add archive link)
- New: `slides/archive/ai-higher-ed-2025/index.qmd` (copy of current)

## Step 2: Create new presentation slides

Replace `slides/ai-higher-ed/index.qmd` with the new presentation. Structure below.

### Slide-by-slide outline (~25 slides, 25 minutes)

#### Part A: Summary / "Best Of" (~13 slides, ~12 min)

**Slide 1: Title**
- "KI in der Hochschulbildung: Werkzeuge fur Experten, Herausforderungen fur Lernende"
- Andrew Ellis, Virtuelle Akademie, BFH
- Subtitle: Refresher 2026

**Slide 2: The Iceberg** (from current refresher)
- Performance above water, Learning below water
- Reuse existing ggplot code

**Slide 3: How LLMs work** (from beginner, condensed)
- Next-word prediction: statistical pattern completion from context
- "Context determines the result"
- Visual: simplified probability distribution or token prediction concept

**Slide 4: Capabilities and limits** (from beginner, condensed)
- Multi-modal tools: text, images, code, web search
- But: no built-in fact-checking, hallucinations
- "Versatile, but always verify"

**Slide 5: The Paradox** (from current refresher)
- Bastani et al. study: +48% with GPT-4, -17% without
- Reuse existing ggplot visualization with error bars

**Slide 6: The Bottleneck** (from current refresher / intermediate)
- Working memory: 4 +/- 1 elements
- Diagram: New Info (infinite) -> Working Memory (limited) -> Long-term Memory (infinite)
- Reuse existing ggplot code

**Slide 7: Desirable Difficulties** (from current refresher / intermediate)
- Bjork quote
- The four strategies: Generate, Distribute, Retrieve, Interleave
- Risk: AI can undermine each by taking over cognitive work

**Slide 8: The Generation Effect** (from current refresher)
- Bar chart: Self-generated (~70%) > Read (~50%) > From AI (~35%)
- Reuse existing ggplot code

**Slide 9: Offloading vs. Outsourcing** (from beginner, key distinction)
- Offloading: Tool reduces working memory load, you keep thinking
- Outsourcing: Tool replaces your thinking
- Spectrum visualization (port from intermediate fig-offloading-spectrum.qmd)

**Slide 10: Historical Analogies** (from current refresher)
- Timeline: Calculator -> GPS -> Google -> AI
- Pattern repeats, AI is broader
- Reuse existing ggplot code

**Slide 11: Expert vs. Learner** (from current refresher / intermediate)
- Same tool, fundamentally different impact
- Experts: can evaluate, offload routine, have capacity for complexity
- Learners: can't evaluate, skip fundamentals, risk "fluent incompetence"

**Slide 12: Expertise Reversal Effect** (from current refresher, interactive)
- Interactive OJS visualization with buttons (0% to 100% prior knowledge)
- Two crossing lines: high support vs. low support
- Reuse existing OJS code

**Slide 13: Transition slide**
- "Die bisherigen Kurse haben gezeigt: Es kommt darauf an, WER das Werkzeug nutzt."
- "Aber warum genau ist die Situation fur Lernende so problematisch?"
- Bridge from summary to deep dive

#### Part B: Deep Dive (~12 slides, ~12 min)

**Slide 14: The Evaluation Paradox - Setup**
- Title: "Das Evaluationsparadox"
- Core claim: "Um KI-Output kritisch zu bewerten, braucht man die Kompetenz, die erst durch Lernen entsteht."
- This is the central tension for educational AI use

**Slide 15: Four Cognitive Operations** (from intermediate)
- Retrieving (Abrufen): Activating knowledge from memory
- Generating (Generieren): Producing own solutions
- Connecting (Verknupfen): Relating elements, comparing, integrating
- Monitoring (Uberwachen): Evaluating against internal criteria
- These are what build schemas. AI can replace each one.

**Slide 16: The Paradox Visualized**
- DiagrammeR diagram (port from intermediate fig-evaluation-paradox.qmd)
- Cycle: Evaluate AI output -> requires competence -> comes from learning -> requires own thinking -> replaced by AI -> (loop)
- Adapt color scheme to match refresher palette (magenta/gold)

**Slide 17: Live Demonstration concept**
- Ask audience: "Can you evaluate this AI output?"
- Show AI-generated content from an unfamiliar domain (e.g., medical diagnosis, legal analysis, or advanced mathematics)
- Point: Without domain expertise, you cannot tell if this is correct
- "Your students are in this position for YOUR subject"

**Slide 18: What this means for teaching**
- Students need to build internal models BEFORE they can use AI critically
- "Critical thinking is not a context-free skill" (Willingham)
- The 4 operations must happen in the learner's head, not in the AI

**Slide 19: Transition to Bounded Rationality**
- "But why do students outsource in the first place?"
- "Are they lazy? Dishonest? Or... rational?"

**Slide 20: Case Study: "Ein Gesprach an der BFH"** (NEW)
- Based on a real conversation with a BFH math lecturer
- Narrative structure using RevealJS fragments (progressive reveal):

- Fragment 1: Grey-boxed quote from the lecturer (anonymized, condensed):
  "Wir nutzen lokale KI-Modelle fur Prufungserstellung und Korrektur. Aber bei
  Studierenden sehen wir: Sie kommen nicht zu Ubungsstunden, stellen keine
  Fragen, uben nicht. Ihnen fehlt die intrinsische Motivation."
  Key detail: the lecturer is already an AI practitioner (local models for exams,
  essay correction, confidential documents). The audience sees themselves.

- Fragment 2: Two-column comparison:
  Left (grey): "Die Diagnose" = Motivationsproblem.
    KI-Losung: gamifizierte KI-Ubungen, KI-Tutoren die "engagieren"
  Right (magenta): "Das eigentliche Problem" = Cognitive Overload.
    Die Aufgaben uberlasten das Arbeitsgedachtnis, weil die notigen Schemata fehlen.

- Fragment 3: Gold callout bridging to Beach/Ant:
  "Falsche Diagnose -> falsche KI-Intervention.
  Nicht die Ameise ist das Problem, sondern der Strand."

- AI connections made explicit:
  1. Lecturer as audience proxy (already using AI in teaching)
  2. Wrong diagnosis leads to wrong AI intervention (AI tutors for "engagement"
     treat the symptom; redesigning cognitive load treats the cause)
  3. Right AI use: AI for the INSTRUCTOR to calibrate task difficulty and create
     scaffolded exercises, not AI for students to bypass productive struggle

- Speaker notes: connect to Evaluation Paradox (students who can't solve problems
  also can't evaluate AI-generated solutions), elaborate on how this case
  demonstrates that "motivation" attributions are often cognitive load problems
  in disguise

**Slide 21: The Beach, Not the Ant** (Simon)
- Visual: DiagrammeR diagram (port from intermediate fig-beach-ant.qmd)
- Herbert Simon's insight: behavior is shaped by environment more than motivation
- Student behavior reflects the "terrain" we design
- Now lands with force because audience just saw the concrete case study

**Slide 22: Students as Rational Agents**
- If the environment makes outsourcing the easiest path, rational agents will outsource
- This is not a character problem; it's an environmental design problem
- Four terrain factors: Task design, Assessment format, AI accessibility, Structural incentives

**Slide 23: "Gestalte den Strand, nicht die Ameise"**
- Practical implications:
  - Design tasks where the cognitive work IS the deliverable (not just the product)
  - Assess the process, not just the output
  - Make productive struggle the path of least resistance
- Brief examples

**Slide 24: Core Message** (merged from previous slides 23+24)
- Two columns:
  - Evaluation Paradox: students CAN'T self-regulate AI use (lack competence to evaluate)
  - Bounded Rationality: students WON'T self-regulate (environment makes outsourcing rational)
- Together: We cannot rely on student judgment alone
- Core statement: "KI-Werkzeuge sind fur Experten gemacht."
- For teaching: Build foundations first. Design environments that require thinking.
  Trust the process of productive struggle.

**Slide 25: References**

### R/OJS code strategy

**Reuse directly from current refresher** (copy R chunks):
- Iceberg visualization (slide 2)
- Paradox line plot with error bars (slide 5)
- Bottleneck diagram (slide 6)
- Generation effect bar chart (slide 8)
- Timeline visualization (slide 10)
- Interactive expertise reversal OJS (slide 12)

**Port from intermediate course** (adapt to refresher color palette):
- Offloading spectrum (slide 9): from `ki-lehre-intermediate/resources/figures/fig-offloading-spectrum.qmd`
- Evaluation paradox diagram (slide 16): from `ki-lehre-intermediate/resources/figures/fig-evaluation-paradox.qmd`
- Beach/Ant diagram (slide 21): from `ki-lehre-intermediate/resources/figures/fig-beach-ant.qmd`

**Create new:**
- Four cognitive operations visual (slide 15): simple ggplot or HTML/CSS grid
- Transition slides (13, 19): text-only, minimal
- Case study slide (slide 20): styled quote box, two-column fragment, gold callout
- Merged core message slide (slide 24): two-column layout with summary

### Color palette adaptation

The intermediate course uses a different color scheme (blues: #0072B2, #56B4E9; orange: #D55E00; slate: #64748b). When porting figures, adapt to the refresher palette:
- Magenta (#A3195B) for action/attention
- Gold (#D4A03E) for insights
- Grays (#333, #666, #999) for neutral elements

## Step 3: Update presentation embedding page

**File: `presentation/index.qmd`**
- Update the description (25-minute talk, not 30-minute)
- Keep the RevealJS embed shortcode (same path, new content)
- Update the "Vertiefung" section if needed
- Add archive link at bottom

## Step 4: Consider Q&A and Guide updates

The Q&A section currently covers 9 topics matching the old presentation. After the new presentation is created, we should consider:
- Adding a Q&A page for the Evaluation Paradox (currently not a standalone page)
- Adding a Q&A page for Bounded Rationality / Environmental Design
- These are optional and can be done as a follow-up

## Step 5: Delete TODO.md

Remove `presentation/TODO.md` as its tasks will be completed.

## Verification

1. Run `quarto preview` to verify the site builds and the new slides render correctly
2. Check that all R visualizations render (ggplot + DiagrammeR)
3. Check that the OJS interactive expertise reversal visualization works
4. Verify the archived presentation is accessible via the archive nav item
5. Navigate through all ~25 slides to confirm flow and timing
6. Test on a 1600x900 viewport (the configured slide dimensions)
