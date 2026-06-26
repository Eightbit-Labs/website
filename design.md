# Eightbit Labs — Design System

> **Convergence** — the studio where two streams meet at a point.

**Theme:** light · **Mood:** engineered, calm, fast · **Risk taken:** the whole page is organized around the logo's pinch point, with a live "bit-stream" that flows down and converges in the hero.

---

## 1. The subject, pinned

Eightbit Labs is a small, sharp software studio that builds **neural systems** and **the web platforms that carry them**. The audience is technical decision-makers (founders, eng leads) sizing the team up, plus developer peers. The page has one job: convince them this team ships precise, intelligent software, then route them to GitHub.

The brand's own artifact does the design work for us. The logo is an **hourglass built from two triangles** — a downward, solid triangle meeting an upward, outlined triangle at a narrow pinch. It encodes the two things the studio actually is:

- **Two disciplines converging** — neural systems (▽) and web engineering (△) meeting at one point: integrated delivery.
- **Flow and time** — sand through a glass; "eightbit" = the byte, the smallest unit, streaming through.

So the design isn't decorated *with* the logo — it is built *as* the logo. The spine of the page is a vertical convergence axis; sections are separated by **pinch dividers** (two hairline triangles kissing at a point); the hero literally streams bits down to the pinch.

This is deliberately **not** the three AI defaults: not cream-paper-serif-terracotta (we use a cool neutral paper, a grotesque, and amber stays disciplined and monochrome-first), not near-black-with-acid-accent (light theme), not a hairline broadsheet (we have one bold orchestrated moment, generous space, and radii).

---

## 2. Color

Achromatic at the core — true to a logo that is literally black and white — with **one** warm accent standing in for the flowing sand. Paper is cool-neutral white, never cream.

| Name | Hex | Role |
|------|-----|------|
| **Paper** | `#F5F6F4` | Page background — cool off-white, the "glass" |
| **Bright** | `#FCFDFB` | Raised card / panel surface |
| **Ink** | `#0C0D0E` | Primary text, the solid triangle, near-black |
| **Graphite** | `#5A5E60` | Secondary text, mono labels |
| **Mist** | `#E2E5E1` | Hairlines, borders, dividers |
| **Pinch** | `#101216` | The one dark band (integrated-delivery / pinch panel) |
| **Flux** | `#F0531C` | Accent — molten sand. Links, active state, the stream, one emphasis |
| **Flux-soft** | `rgba(240,83,28,0.12)` | Accent wash for hovers/fills |

**Rule:** Flux appears only at points of *convergence or interaction* — the bit-stream, a link underline drawing to a point, the active nav tick, the CTA. If it shows up as decoration, remove it. The page should read black-on-white with amber sparks.

---

## 3. Typography

The logo wordmark is rounded and geometric, so the type goes the other way — crisp grotesque — and lets the mark hold the round. Three roles, all on Google Fonts.

- **Display — Bricolage Grotesque (800/700).** Characterful modern grotesque with optical flare; not Inter/Space-Grotesk default. Tight tracking. Used big and rarely.
- **Body / UI — Hanken Grotesk (400/500/600).** Warm, legible grotesque, less ubiquitous than Inter. All paragraphs, buttons, nav.
- **Utility / data — JetBrains Mono (400/500).** The "eightbit" voice: eyebrows, stats, role tags, section indices, rendered like terminal output (`// neural`, `05 — engineers`). Encodes real metadata, never decoration.

### Scale

| Role | Font | Size (clamp) | Weight | Tracking |
|------|------|------|--------|----------|
| Hero | Bricolage | `clamp(2.9rem, 7vw, 5.5rem)` | 800 | -0.03em |
| H2 | Bricolage | `clamp(2rem, 4vw, 3.25rem)` | 700 | -0.025em |
| H3 | Hanken | `1.25rem` | 600 | -0.01em |
| Body | Hanken | `1.0625rem` | 400 | -0.005em |
| Lead | Hanken | `clamp(1.05rem, 1.6vw, 1.3rem)` | 400 | -0.01em |
| Mono label | JetBrains Mono | `0.78rem` | 500 | 0.04em, uppercase |

---

## 4. Layout

A single centered column (max `1180px`) with a **convergence axis** running down the middle. Sections alternate Paper / Bright and are joined by **pinch dividers** rather than plain rules. Generous vertical rhythm (`clamp(6rem, 12vh, 9rem)` between sections).

```
┌──────────────────────────────────────────────┐
│ ◢◣ eightbit labs            // github ↗       │  sticky, mono meta, blur
├──────────────────────────────────────────────┤
│            ▽   bits stream down ↓             │
│           ╲   ·  · ·  ·   ╱                   │   HERO
│        We build software that thinks.         │   Bricolage 800
│        ╱   · converge at pinch ·  ╲           │
│            △   ↑ disperse below               │
│   [ explore github ]   [ see the work ]       │
│   // neural systems · web engineering         │
└──────────────────────────────────────────────┘
                  · ▽△ ·   pinch divider
┌──────────────────────────────────────────────┐
│ // what we build                              │
│  ┌────────────┐    ▷◁    ┌────────────┐       │  TWO STREAMS
│  │ ▽ neural   │  pinch   │ △ web      │       │  converge inward
│  │   systems  │          │ engineering│       │
│  └────────────┘          └────────────┘       │
│        ┌──────── pinch panel (dark) ───────┐  │
│        │ integrated delivery — where they  │  │
│        │ meet                              │  │
│        └───────────────────────────────────┘  │
└──────────────────────────────────────────────┘
                  · ▽△ ·
┌──────────────────────────────────────────────┐
│ // the team        05 — engineers            │  TEAM
│  five who ship                                │
│  [card] [card] [card] [card] [card]           │  mono role tags
└──────────────────────────────────────────────┘
                  · ▽△ ·
┌──────────────────────────────────────────────┐
│  See what we're building.                     │  CTA band
│  github.com/Eightbit-Labs            →        │
└──────────────────────────────────────────────┘
```

**Capabilities as content-true structure:** the two disciplines are presented as two streams that slide *toward center* on scroll and resolve into the dark "integrated delivery" pinch panel below — the hourglass narrative, not arbitrary 01/02/03 numbering. Numbered markers are dropped; mono tags carry real info instead.

---

## 5. Signature — the pinch & the bit-stream

**One memorable thing, executed well; everything else stays quiet.**

1. **Bit-stream (hero).** A canvas of small squares ("bits") drifts slowly down through the hero, pulled toward the central axis as it nears the pinch line, then dispersing below — an hourglass of light, the literal "eightbit through the glass." Amber-tinted, sparse (~78 bits), low opacity. Fall speed is kept very slow (a bit takes ~12–30s top-to-bottom) so it reads as a calm, settling drift rather than motion.
2. **Pinch dividers.** Between every section, two thin triangles meet at a center point — a recurring echo of the mark that ties the page together cheaply and unmistakably.
3. **The original logo**, set in a rounded black tile so the white hourglass reads on light paper — used in nav, the CTA centerpiece, and footer.

---

## 6. Motion

Deliberate, reduced-motion-safe (everything below freezes to a tasteful static state under `prefers-reduced-motion`).

- **Load sequence:** hero headline clip-reveals line by line → lead + CTAs fade up → the bit-stream drifts underneath.
- **Ambient:** the bit-stream (hero only), a very slow downward drift converging at the pinch. Nothing else moves on its own.
- **Scroll reveals:** sections rise + clip from the convergence axis (IntersectionObserver, staggered).
- **Capabilities:** the two discipline cards translate inward toward the pinch as they enter.
- **Hover micro:** buttons fill from a center point with Flux-soft + draw a 1px Flux underline to a point; cards lift 2px and gain a Flux hairline + a triangular corner notch.

---

## 7. Components

- **Nav:** sticky, translucent blur pill-bar; SVG mark + wordmark left, mono `// github ↗` link right; active scroll position shows a small Flux tick.
- **Button / primary:** Ink fill, Paper text, fills toward Flux on hover. **Secondary:** Mist hairline, Ink text, Flux-soft wash on hover.
- **Capability card:** Bright surface, Mist hairline, generous padding, a discipline triangle (▽/△) drawn in the corner, mono tag.
- **Pinch panel:** Pinch dark surface, Paper text, one Flux keyline — the only dark block on the page.
- **Team card:** Bright surface, name (Hanken 600), mono role tag, GitHub link; hover reveals a triangular notch + Flux handle.
- **Pinch divider:** centered two-triangle SVG, Mist stroke.

---

## 8. Voice & copy

Plain, confident, engineered. Active verbs, sentence case, no filler.

- **Eyebrow:** `// neural systems + web engineering`
- **Hero H1:** *We build software that thinks.*
- **Hero lead:** *Eightbit Labs ships neural systems and the web platforms that carry them — engineered for speed, clarity, and production from day one.*
- **Capabilities H2:** *Two disciplines, one point of convergence.*
  - Neural systems — *Model-backed features, inference workflows, and experimentation pipelines built to run inside real products.*
  - Web engineering — *High-performance interfaces, API-connected apps, and developer tooling that stays maintainable.*
  - Integrated delivery (pinch) — *Where the two streams meet: machine intelligence wired to strong UX, deliberate from architecture to interface.*
- **Team H2:** *The people who ship it.*  ·  mono: `05 — engineers`
- **CTA:** *See what we're building.* → `github.com/Eightbit-Labs`

---

## 9. Quality floor

Responsive to 320px (stream thins, grids collapse to one column, nav wraps). Visible keyboard focus (2px Flux ring). `prefers-reduced-motion` respected everywhere. Color contrast: Ink on Paper ≥ 15:1; Graphite on Paper ≥ 5:1; Flux used for accent/large text, never small body.

---

## 10. Tokens (CSS custom properties)

```css
:root {
  /* color */
  --paper:#F5F6F4; --bright:#FCFDFB; --ink:#0C0D0E; --graphite:#5A5E60;
  --mist:#E2E5E1; --pinch:#101216; --flux:#F0531C; --flux-soft:rgba(240,83,28,.12);

  /* type */
  --font-display:'Bricolage Grotesque', system-ui, sans-serif;
  --font-body:'Hanken Grotesk', system-ui, sans-serif;
  --font-mono:'JetBrains Mono', ui-monospace, monospace;

  /* space */
  --col-max:1180px; --gutter:clamp(1.25rem,4vw,2.5rem);
  --section-y:clamp(6rem,12vh,9rem);

  /* radius + shadow */
  --r-sm:6px; --r-md:12px; --r-lg:20px; --r-pill:999px;
  --shadow-card:0 1px 2px rgba(12,13,14,.04), 0 12px 32px -12px rgba(12,13,14,.12);
  --shadow-pop:0 2px 6px rgba(12,13,14,.06), 0 24px 60px -20px rgba(12,13,14,.22);
  --ease:cubic-bezier(.22,1,.36,1);
}
```
