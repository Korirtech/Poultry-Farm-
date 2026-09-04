# Website design direction

## Approach 1

**Theme Name:** Field Notes / Operational Editorial

**Very Brief Intro:** A warm, editorial product story that treats farm operations like a well-kept field notebook: measured, practical, and quietly confident. Cream paper, deep pine, and clay-orange signals make the system feel grounded in place rather than like generic SaaS.

**Probability:** 0.06

## Approach 2

**Theme Name:** Glasshouse Control Room

**Very Brief Intro:** A crisp, light interface inspired by greenhouse glazing, stainless equipment, and morning light. Cool mint, blue-black type, and translucent panels would frame the blueprint as a modern operations platform.

**Probability:** 0.03

## Approach 3

**Theme Name:** Ember Ledger

**Very Brief Intro:** A dark, high-contrast operations brand with charcoal surfaces, ember accents, and strong numeric hierarchy. It would feel like a night-shift command center for farm managers.

**Probability:** 0.08

## Selected direction: Field Notes / Operational Editorial

### Design Movement

Contemporary editorial design with Swiss information hierarchy, agrarian field-note references, and a restrained vernacular print sensibility.

### Core Principles

1. **Operational clarity:** Every section should answer what the system tracks, who uses it, or what decision it improves.
2. **Grounded materiality:** Use paper-like warmth, hairline rules, ink-black typography, and small marks that suggest a working notebook rather than a template.
3. **Measured confidence:** Use large numerals, calm spacing, and selective clay-orange highlights to make the product feel dependable.
4. **Asymmetric rhythm:** Favor offset columns, side notes, vertical rail labels, and staggered cards over centered stacks.

### Color Philosophy

The base is warm oat paper, chosen to make the page feel tactile and human. Deep pine signals stewardship, health, and the farm landscape. Clay orange is reserved for action, alerts, and key moments so it feels like a deliberate field marker rather than a generic accent. Ink black keeps technical copy readable and serious.

### Layout Paradigm

Use an editorial canvas with a wide content rail, a narrow vertical index, and offset feature blocks. The hero begins with a left-aligned narrative and a right-side operational dashboard vignette. Subsequent sections alternate between full-width ruled bands, two-column content, and “field note” callouts.

### Signature Elements

- A vertical chapter rail with small uppercase labels and index numbers.
- “Field note” tags with clay-orange registration marks and notebook-like metadata.
- Metric cards framed with hairline rules, oversized numerals, and short labels.

### Interaction Philosophy

Interactions should feel like turning to the next tab in a well-organized logbook: immediate, calm, and useful. Buttons use a short press scale and a subtle underline sweep. Tabs and anchor links should scroll with a crisp focus state; non-functional product actions should clearly announce that they are concept placeholders.

### Animation

Use a 220ms ease-out for button states and section reveals. On first load, the chapter rail and hero copy fade upward in a staggered sequence while the dashboard vignette settles in from the right. Metric cards may lift 2px on hover. Respect reduced-motion preferences and never animate layout dimensions.

### Typography System

Use **DM Serif Display** for the main headline and major section numbers, paired with **IBM Plex Sans** for UI labels, body copy, and data. Use uppercase micro-labels with letter spacing for metadata. Headlines should have tight tracking and deliberate line breaks; body copy should stay between 60–72 characters per line.

### Brand Essence

A practical operating blueprint for Kenyan poultry farms that turns daily records into calmer decisions—**grounded, precise, humane**.

### Brand Voice

Headlines should be direct and observational, not inflated. CTAs should sound like a next operational step. Microcopy should favor specific nouns and verbs over generic SaaS language.

Example lines:

- “Make the day’s record the farm’s clearest signal.”
- “Start with the flock. Build from what you know.”

### Wordmark & Logo

The mark is a simple open oval made from two offset strokes: one suggests a bird’s body, the other a data loop. It should appear as a bold graphic symbol without text, paired with the wordmark “Flockline” in DM Serif Display with a small clay-orange registration notch.

### Signature Brand Color

**Clay Marker — #C96F3B.** A warm, ownable orange used sparingly for actions, warning states, and the small marks that connect operational detail to human attention.

## Content architecture

The site will be a single responsive long-form product page with anchor navigation:

1. **Hero:** Flockline positioning, primary CTA, and compact operations dashboard vignette.
2. **Operating thesis:** Why batch-level records, farm-scoped access, and daily consistency matter.
3. **Blueprint at a glance:** Role cards and a model relationship diagram rendered as a visual editorial block.
4. **The daily loop:** A four-step workflow from record to review.
5. **MVP modules:** Flocks, production, tasks, reports, alerts, and finance shown as a structured grid.
6. **Build in phases:** A horizontal phase timeline from foundation to offline enhancement.
7. **Trust layer:** Security, timezone, KSh, auditability, and offline roadmap.
8. **Closing CTA:** Invite a farm team to begin with the first flock.

## Style Decisions

- Keep the page light and paper-toned; do not use a dark neon dashboard treatment.
- Use generated imagery only for the prominent hero vignette and brand mark; use CSS-built diagrams and metric cards for accuracy.
- Keep all copy grounded in the provided blueprint. Do not invent customer reviews, ratings, or testimonials.
- Use responsive behavior that preserves the editorial rail on desktop and converts it into a compact top index on mobile.
