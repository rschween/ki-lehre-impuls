# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

A Quarto website presenting the current state of AI in higher education. Content is in German, targeting staff at Swiss universities.

## Build Commands

```bash
quarto preview          # Live preview on port 8800
quarto render           # Build site to /docs/
```

## Project Structure

```text
ki-lehre-refresher/
├── _quarto.yml                     # Main configuration
├── index.qmd                       # Welcome/landing page
├── presentation/
│   └── index.qmd                   # Embeds the RevealJS slides
├── slides/
│   └── ai-higher-ed/
│       └── index.qmd               # RevealJS presentation source
├── qa/
│   └── index.qmd                   # Q&A and further research
├── docs/                           # Rendered output (GitHub Pages)
├── styles/
│   ├── custom.scss                 # Custom theme styles
│   └── styles.css                  # Additional CSS
├── assets/                         # Images, PDFs, other assets
├── scripts/                        # JavaScript (e.g., copy-prompt.js)
└── _extensions/                    # Quarto extensions
    ├── timer/                      # Countdown timer shortcode
    └── custom-callout/             # Custom callout styling
```

### Content Organization

- Every content page is named `index.qmd` inside its own subdirectory
- No content files at root level (except `index.qmd` landing page)
- Slides are in `slides/<presentation-name>/index.qmd` and embedded via iframe in `presentation/index.qmd`

## Writing Conventions

### Language

German with Swiss spelling conventions:

- Use "ss" instead of "ß" (e.g., "weisst" not "weißt", "muss" not "muß")
- Address readers with informal "du" form, not formal "Sie"
- No emojis in content

### Formatting

- Do not use em-dashes ("---" or "—"). Use colons or restructure sentences instead.
- Do not use dividing lines ("---" on its own line) except in YAML headers
- Ensure blank line above all markdown lists
- Use sentence case for headings (capitalize first word only)

### Links

- Internal links: use relative paths to `.qmd` files (e.g., `[text](presentation/index.qmd)`)
- External links: Quarto adds external link icons automatically

## Custom Callouts

Defined in `_quarto.yml`. Use in content like:

```markdown
::: {.experiment}
## Title
Content here
:::
```

### Available Types

| Type | Purpose | Color |
|------|---------|-------|
| `experiment` | Hands-on tasks ("Deine Aufgabe") | Magenta |
| `individual` | Solo work ("Einzelarbeit") | Magenta |
| `group` | Group work ("Gruppenarbeit") | Magenta |
| `demonstration` | Instructor-led demo | Grey |
| `scenario` | Context/situation description | Grey |
| `reflect` | Reflection prompts ("Reflexion") | Gold |
| `key-point` | Important takeaways ("Kernaussage") | Gold |
| `pro-tip` | Helpful tips (collapsible) | Gold |
| `source-check` | Source verification prompts | Gold |
| `warning` | Cautions ("Achtung") | Magenta |
| `prompt` | Copyable chatbot prompts | Grey |

## Timer Extension

Add countdown timers to slides or pages:

```markdown
{{< timer 5 >}}
```

The number is minutes.

## RevealJS Slides

Slides in `slides/` use RevealJS format. Key options in YAML header:

```yaml
format:
  revealjs:
    theme: default
    slide-number: true
    preview-links: auto
    footer: "Footer text"
    navigation-mode: vertical    # or linear
    controls: true
    progress: true
```

### Slide Syntax

```markdown
## Slide Title

Content for this slide.

## Next Slide

More content.

---

Horizontal rule creates a new slide without a title.
```

### Embedding Slides

In `presentation/index.qmd`, embed slides via iframe:

```html
<iframe
  src="../slides/ai-higher-ed/index.html"
  width="100%"
  height="600px"
  style="border: 1px solid #ccc; border-radius: 4px;">
</iframe>
```

Note: Link to `.html` (rendered output), not `.qmd`.

## Navigation Structure

### Navbar

- Präsentation: links to `presentation/index.qmd`
- Q & A: links to `qa/index.qmd`
- Knowledge Base: external link to virtuelleakademie.ch

### Sidebars

Each section has its own sidebar (configured in `_quarto.yml` under `sidebar:`):

- `id: presentation` for the presentation section
- `id: qa` for the Q&A section

To assign a page to a sidebar, add to its YAML header:

```yaml
sidebar: presentation
```

## Adding New Content

### New Page in Existing Section

1. Create subdirectory: `qa/new-topic/`
2. Create `qa/new-topic/index.qmd` with appropriate `sidebar:` in YAML
3. Add to sidebar contents in `_quarto.yml`

### New Presentation

1. Create `slides/new-presentation/index.qmd` with `format: revealjs`
2. Embed in a page using iframe pointing to `.html` output

## Deployment

- Output renders to `docs/`
- Deployed via GitHub Pages from the `docs/` folder
- Run `quarto render` before committing to update the built site
