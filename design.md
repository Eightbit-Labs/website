# Eightbit Labs — Design System

> **The Byte** — the page is built as the studio's name: eight bits, one byte.

**Theme:** light · **Mood:** precise, playful-engineered, modern · **Risk taken:** a pixel font (Silkscreen) as the site's utility voice, anchored by a live interactive 8-bit register in the hero.

---

## 1. The subject, pinned

Eightbit Labs is a five-person studio building **neural systems** and **the web platforms that carry them**. Audience: technical founders, eng leads, developer peers. The page's one job: prove the team ships precise, intelligent software, then route to GitHub.

Pass 1 built the page as the **logo** (hourglass convergence). This pass builds it as the **name**: *eightbit* — the byte, the smallest complete unit of meaning. The thesis: a studio that sweats every bit. Everything pixel-flavored on the page carries real data (ASCII codes, place values, identicons derived from real handles) — never decoration.

---

## 2. Color

Cool porcelain light theme with **one** accent: volt cobalt, the color of "logic high." It appears only on ON states, interactions, and live data. Never cream, never terracotta.

| Name | Hex | Role |
|------|-----|------|
| **Paper** | `#F3F5FA` | Page background — cool porcelain with a blue cast |
| **Card** | `#FFFFFF` | Raised surfaces, the work band |
| **Ink** | `#0D1017` | Primary text, ON bit keys, logo tile |
| **Slate** | `#5A6478` | Secondary text, pixel labels |
| **Line** | `#DDE3F0` | Hairlines, borders, the dot raster |
| **Volt** | `#2B4BFF` | Accent — logic high. ON keylines, hovers, live readout, links |
| **Volt-soft** | `rgba(43,75,255,.09)` | Cursor wash, ghost-button hover |

**Rule:** Volt = a bit turning on. If it appears somewhere nothing is "on" or interactive, remove it.

---

## 3. Typography

Three voices, all Google Fonts — deliberately none reused from pass 1:

- **Display — Unbounded (600/700).** Wide rounded geometric; echoes the rounded logo wordmark. Hero + H2 only, moderate sizes (it's a wide face).
- **Body — Schibsted Grotesk (400–700).** Modern, warm, legible. Paragraphs, buttons, nav, names.
- **Utility — Silkscreen (400/700).** The literal 8-bit voice. Tiny uppercase labels, register readout, role tags, place values. Always carries real data.

| Role | Font | Size | Notes |
|------|------|------|-------|
| Hero | Unbounded 700 | `clamp(2.35rem, 6vw, 4.3rem)` | -0.015em |
| H2 | Unbounded 600 | `clamp(1.7rem, 3.4vw, 2.6rem)` | |
| H3 | Schibsted 600 | `1.3rem` | |
| Body/Lead | Schibsted 400 | `1rem` / `clamp(1.05…1.25rem)` | |
| Pixel label | Silkscreen 400 | `0.68rem` | 0.12em tracking, uppercase |

---

## 4. Layout

Single column, max `1140px`. Sections: hero (paper) → work band (white, hairline top/bottom) → team (paper) → CTA (paper) → footer (white). No dividers — the alternating bands + generous `--section-y` do the separation. A faint fixed dot raster (26px grid) sits behind the whole page: the pixel grid the site lives on.

```
┌────────────────────────────────────────────┐
│ ◢◣ eightbit labs        work team [github] │ sticky blur bar
├────────────────────────────────────────────┤
│ 8 BITS · 1 BYTE · 5 ENGINEERS               │
│ Every bit                                   │ Unbounded 700
│ engineered.                                 │ volt period
│ lead… [Explore our GitHub] [See the work]   │
│                                             │
│ REG A — WRITING "EIGHTBIT LABS"             │ ← signature
│ [0][1][1][0][0][1][0][1]  ← flip-dot keys   │
│ 128 64 32 16 8 4 2 1                        │
│ BIN 01100101 · HEX 0x65 · CHR e ▌           │
├────────────── white band ──────────────────┤
│ WHAT WE BUILD — Two crafts, one stack.      │
│ [chip sprite / neural]  [window sprite/web] │
│ [rocket sprite — integrated delivery, wide] │
├────────────────────────────────────────────┤
│ THE TEAM — Five people. Full stack.         │
│ [identicon×5 — generated from handles]      │
├────────────────────────────────────────────┤
│        ◢◣  Read the source.  [github]       │
└────────────────────────────────────────────┘
```

---

## 5. Signature — the byte register

Eight physical flip-dot keys (3D rotateX flip, staggered 42ms cascade) auto-type `eightbit labs` in ASCII, one char every 1.4s, with a live BIN/HEX/CHR readout and place-value labels. **Clicking any key flips that bit and takes the register manual for 7s** (status line switches to `REG A — MANUAL INPUT`), so visitors can compose their own byte and see what character they made. Reduced motion: no auto-typing, keys still clickable.

**The register's output device (added 2026-07-11):** a 12×12 flip-dot wall on the hero's right (`chr out — dot matrix`) renders reg a's current character at poster scale — input bottom-left, output bottom-right. Glyphs are sampled from Silkscreen itself via an offscreen canvas, with the font's 8-unit pixel grid pinned exactly to the dot grid (1 font pixel = 2×2 dots, falling back to 1×1 for wide glyphs) so counters never smear. Weight 400 only — 700 doubles stroke width and fills counters. A metrics fingerprint (caps = x-height = 5/8 em) guards the cache, because canvas can render a fallback face for a few frames after `document.fonts` reports loaded. Lit dots are volt (logic high); each repaint sweeps diagonally via per-dot transition delays. Hidden below 960px.

Supporting pixel cast (all data-true):
- **8×8 capability sprites** — hand-drawn chip / browser / rocket, hop 2 steps on hover.
- **Team identicons** — deterministic 8×8 mirrored sprites hashed from each GitHub handle (FNV-1a + xorshift).

---

## 6. Motion

- **Load:** hero cascade (eyebrow → headline → lead → CTAs), then keys pop in left-to-right.
- **Ambient:** only the register typing + blinking cursor block. Nothing else self-animates.
- **Pointer:** volt radial wash follows the cursor through the hero (CSS vars, no rAF).
- **Scroll — "rasterize" (page-wide, scrubbed):** every section, card, and heading materializes through a growing-dot halftone mask as it rises from the fold, driven directly by scroll position — scroll back and it de-rezzes again. Progress is quantized to 8 discrete steps with no transitions: the snap between steps is the effect (an 8-bit sprite loading, not a fade). At full progress the mask is dropped (`rz-done`) so shadows and hover brackets render crisp. The fixed dot raster behind the page ticks forward in half-cell (13px) quanta as you scroll, so the whole surface participates. One rAF-throttled scroll listener drives everything via CSS custom properties (`--p` per element, `--raster-y` on `:root`).
  - *Tried and replaced (2026-07-10):* a fixed "program counter" pill showing scroll position as an 8-bit counter — cut because it was a separate widget rather than an animation of the page itself.
- **Hover micro:** cards lift + volt pixel corner-brackets snap in; sprites hop in 2 steps and go volt; buttons fill volt; nav links draw a volt underline.
- All frozen under `prefers-reduced-motion` (global kill + per-component fallbacks).

---

## 7. Voice & copy

Plain, confident, a little bit-punny but never cute twice in a row.

- Eyebrow: `8 BITS · 1 BYTE · 5 ENGINEERS`
- H1: *Every bit engineered.*
- Work H2: *Two crafts, one stack.*
- Team H2: *Five people. Full stack.*
- CTA H2: *Read the source.*

---

## 8. Quality floor

320px-safe (register uses `repeat(8,1fr)`, place labels drop at 440px), 2px volt focus ring, reduced motion respected, Ink-on-Paper ≈ 15:1, Slate-on-Paper ≈ 5.6:1, Volt used at label sizes on white ≈ 6:1.

---

## Pass log

- **Pass 1 — "Convergence" (superseded):** page built as the hourglass logo. Cool white `#F5F6F4`, orange Flux `#F0531C`, Bricolage Grotesque + Hanken Grotesk + JetBrains Mono, canvas bit-stream funneling to a pinch, pinch dividers, dark "integrated delivery" panel. Don't reuse these faces/accent in future remakes.
- **Pass 2 — "The Byte" (current, 2026-07-10):** described above. If a pass 3 is ever asked for, the unexplored angles noted were: flip-dot display wall rendering glyphs, Bayer-dither halftone imagery, and a dark "terminal phosphor" theme (was out of scope — brief required light).
- **Pass 2.1 (2026-07-11):** hero's empty right half filled by cashing in the "flip-dot display wall" angle from the pass-2 notes — as the byte register's chr-out device rather than a separate widget (same lesson as the cut program-counter pill: animate the page's own system, don't add gadgets). Remaining unexplored: Bayer-dither halftone imagery, dark phosphor theme. Also: all rounded rectangles became squircles via `corner-shape: squircle` (Chromium 139+, falls back to round).
