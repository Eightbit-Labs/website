import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react'
import logoMark from '../el logo (1).png'
import './App.css'

/* ------------------------------------------------------------------ */
/* Brand mark — the hourglass logo in a rounded black tile so the       */
/* white mark reads on the light theme.                                 */
/* ------------------------------------------------------------------ */
function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`logo-tile ${className ?? ''}`} aria-hidden="true">
      <img src={logoMark} alt="" />
    </span>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.426 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.369-1.344-3.369-1.344-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.349-1.088.635-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.565 9.565 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.026 2.748-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.678.921.678 1.857 0 1.341-.012 2.423-.012 2.753 0 .269.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* PixelSprite — renders an 8x8 grid of '0'/'1' strings as crisp        */
/* SVG pixels. Fill comes from currentColor so CSS drives the state.    */
/* ------------------------------------------------------------------ */
function PixelSprite({ rows, className }: { rows: string[]; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 8 8" aria-hidden="true">
      {rows.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === '1' ? <rect key={`${x}-${y}`} x={x + 0.05} y={y + 0.05} width="0.9" height="0.9" rx="0.12" /> : null,
        ),
      )}
    </svg>
  )
}

/* hand-drawn 8x8 sprites for the three capabilities */
const SPRITE_NEURAL = [
  '00100100',
  '01111110',
  '11000011',
  '01011010',
  '01011010',
  '11000011',
  '01111110',
  '00100100',
]

const SPRITE_WEB = [
  '11111111',
  '10101001',
  '11111111',
  '10000001',
  '10111001',
  '10000001',
  '10110001',
  '11111111',
]

const SPRITE_SHIP = [
  '00011000',
  '00111100',
  '00100100',
  '00111100',
  '01111110',
  '11011011',
  '00100100',
  '01000010',
]

/* deterministic 8x8 identicon from a handle — every teammate gets a
   unique sprite derived from their GitHub name, mirrored for symmetry */
function identiconRows(seed: string): string[] {
  let h = 2166136261
  for (const ch of seed) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619) >>> 0
  }
  const rows: string[] = []
  for (let y = 0; y < 8; y++) {
    let half = ''
    for (let x = 0; x < 4; x++) {
      h ^= h << 13
      h >>>= 0
      h ^= h >>> 17
      h ^= h << 5
      h >>>= 0
      half += h % 100 < 44 ? '1' : '0'
    }
    rows.push(half + [...half].reverse().join(''))
  }
  return rows
}

/* ------------------------------------------------------------------ */
/* ByteRegister — the signature. Eight flip-dot keys type out           */
/* "eightbit labs" in ASCII; click any bit to take the register over    */
/* and compose your own byte. Readout decodes bin / hex / char live.    */
/* ------------------------------------------------------------------ */
const MESSAGE = 'eightbit labs'

/* how long a click holds the register in manual mode */
function manualDeadline(): number {
  return Date.now() + 7000
}

const toBits = (code: number): boolean[] =>
  code
    .toString(2)
    .padStart(8, '0')
    .split('')
    .map((c) => c === '1')

function ByteRegister({ onCode }: { onCode?: (code: number) => void }) {
  const [bits, setBits] = useState<boolean[]>(() => toBits(MESSAGE.charCodeAt(0)))
  const [manual, setManual] = useState(false)
  const manualUntil = useRef(0)
  const idxRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (Date.now() < manualUntil.current) return
      setManual(false)
      idxRef.current = (idxRef.current + 1) % MESSAGE.length
      setBits(toBits(MESSAGE.charCodeAt(idxRef.current)))
    }, 1400)
    return () => clearInterval(t)
  }, [])

  const handleFlip = (i: number) => {
    manualUntil.current = manualDeadline()
    setManual(true)
    setBits((b) => b.map((v, j) => (j === i ? !v : v)))
  }

  const code = bits.reduce((acc, b, i) => acc | (b ? 1 << (7 - i) : 0), 0)

  useEffect(() => {
    onCode?.(code)
  }, [code, onCode])

  const bin = bits.map((b) => (b ? '1' : '0')).join('')
  const hex = `0x${code.toString(16).padStart(2, '0').toUpperCase()}`
  const chr = code === 32 ? '␣' : code > 32 && code < 127 ? String.fromCharCode(code) : '·'

  return (
    <div className="register">
      <p className="pix register-status">
        {manual ? (
          <>reg a — manual input<span className="volt-txt"> · resuming…</span></>
        ) : (
          <>reg a — writing “{MESSAGE}”</>
        )}
      </p>

      <div className="register-keys" role="group" aria-label="Interactive byte register — click a key to flip a bit">
        {bits.map((on, i) => (
          <button
            key={i}
            type="button"
            className={`bit-key${on ? ' on' : ''}`}
            style={{ '--i': i } as CSSProperties}
            aria-pressed={on}
            aria-label={`bit ${7 - i}, value ${1 << (7 - i)}, ${on ? 'on' : 'off'}`}
            onClick={() => handleFlip(i)}
          >
            <span className="bit-flipper" aria-hidden="true">
              <span className="face face-0">0</span>
              <span className="face face-1">1</span>
            </span>
          </button>
        ))}
      </div>

      <div className="register-places pix" aria-hidden="true">
        {[128, 64, 32, 16, 8, 4, 2, 1].map((v) => (
          <span key={v}>{v}</span>
        ))}
      </div>

      <p className="register-readout pix">
        <span>bin {bin}</span>
        <span>hex {hex}</span>
        <span className="readout-chr">
          chr <b className="volt-txt">{chr}</b>
          <span className="cursor-block" aria-hidden="true" />
        </span>
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* GlyphDisplay — the register's output device. A 12×12 flip-dot wall   */
/* renders whatever character reg a currently holds, at poster scale.   */
/* Glyphs are sampled live from the site's own pixel face (Silkscreen)  */
/* via an offscreen canvas, so the wall speaks the same 8-bit voice.    */
/* Volt dots = logic high; every change repaints in a diagonal sweep    */
/* like a real flip-dot panel.                                          */
/* ------------------------------------------------------------------ */
const DOT_GRID = 12
const DOT_BLANK: boolean[] = new Array(DOT_GRID * DOT_GRID).fill(false)
const glyphCache = new Map<string, boolean[]>()

/* one dot = one Silkscreen font pixel, in canvas px */
const SILK_UNIT = 10

/* Silkscreen fingerprint: it is the only face in the stack whose caps
   AND x-height both measure exactly 5/8 em. True only once the canvas
   can really draw with it (which can lag document.fonts readiness). */
function silkscreenLive(ctx: CanvasRenderingContext2D): boolean {
  ctx.font = `400 ${SILK_UNIT * 8}px Silkscreen, ui-monospace, monospace`
  const asc = (s: string) => ctx.measureText(s).actualBoundingBoxAscent
  return Math.abs(asc('E') - SILK_UNIT * 5) < 1 && Math.abs(asc('x') - SILK_UNIT * 5) < 1
}

function sampleGlyph(chr: string): boolean[] {
  if (!chr) return DOT_BLANK
  /* weight 400 is Silkscreen's true single-pixel-stroke cut — 700
     doubles stroke width and fills the counters of wide glyphs */
  const font = (px: number) => `400 ${px}px Silkscreen, ui-monospace, monospace`

  const cell = SILK_UNIT
  const size = DOT_GRID * cell
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return DOT_BLANK

  ctx.textBaseline = 'alphabetic'

  /* never cache a fallback-face render — it would stick forever */
  const silkReady = silkscreenLive(ctx)
  const cached = silkReady ? glyphCache.get(chr) : undefined
  if (cached) return cached
  ctx.font = font(cell * 8)

  /* Silkscreen draws on an 8-unit em grid: caps 5 units, no descenders,
     so at font-size 8×cell one font pixel is exactly one dot. Render at
     2×2 dots per font pixel (poster scale) when the glyph fits, and pin
     the font's pixel grid to the dot grid so counters never smear. */
  const probe = ctx.measureText(chr)
  const probeCells = Math.max(1, Math.round((probe.actualBoundingBoxLeft + probe.actualBoundingBoxRight) / cell))
  const scale = probeCells * 2 <= DOT_GRID ? 2 : 1
  ctx.font = font(cell * 8 * scale)
  const m = ctx.measureText(chr)
  const wCells = Math.max(1, Math.round((m.actualBoundingBoxLeft + m.actualBoundingBoxRight) / cell))
  const startCol = Math.max(0, Math.floor((DOT_GRID - wCells) / 2))
  const baselineRow = scale === 2 ? 11 : 8
  ctx.fillText(chr, startCol * cell + m.actualBoundingBoxLeft, baselineRow * cell)

  const { data } = ctx.getImageData(0, 0, size, size)
  const dots: boolean[] = []
  for (let gy = 0; gy < DOT_GRID; gy++) {
    for (let gx = 0; gx < DOT_GRID; gx++) {
      let lit = 0
      for (let y = gy * cell; y < (gy + 1) * cell; y++) {
        for (let x = gx * cell; x < (gx + 1) * cell; x++) {
          if (data[(y * size + x) * 4 + 3] > 128) lit++
        }
      }
      dots.push(lit / (cell * cell) > 0.5)
    }
  }
  if (silkReady) glyphCache.set(chr, dots)
  return dots
}

if (import.meta.env.DEV) {
  // debug hook so tooling can inspect exactly what the wall renders
  ;(window as unknown as Record<string, unknown>).__sampleGlyph = sampleGlyph
}

function GlyphDisplay({ code }: { code: number }) {
  const [fontReady, setFontReady] = useState(false)

  useEffect(() => {
    let alive = true
    let raf = 0
    const ctx = document.createElement('canvas').getContext('2d')
    /* canvas can lag document.fonts by a few frames — poll the
       fingerprint until the face is really drawable, then resample */
    const tick = () => {
      if (!alive || !ctx) return
      if (silkscreenLive(ctx)) setFontReady(true)
      else raf = requestAnimationFrame(tick)
    }
    document.fonts
      .load('400 80px Silkscreen')
      .then(tick)
      .catch(() => {})
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [])

  const chr = code === 32 ? '' : code > 32 && code < 127 ? String.fromCharCode(code) : '·'
  const dots = useMemo(() => sampleGlyph(chr), [chr, fontReady]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <figure className="glyph-display h-in h-in-5" aria-hidden="true">
      <div className="glyph-grid">
        {dots.map((on, i) => (
          <span
            key={i}
            className={`glyph-dot${on ? ' on' : ''}`}
            style={{ '--d': `${((i % DOT_GRID) + Math.floor(i / DOT_GRID)) * 16}ms` } as CSSProperties}
          />
        ))}
      </div>
      <figcaption className="pix glyph-label">chr out — dot matrix</figcaption>
    </figure>
  )
}

/* ------------------------------------------------------------------ */

const CAPS = [
  {
    tag: 'neural',
    title: 'Neural systems',
    body: 'Model-backed features, inference pipelines, and evaluation loops built to run inside real products — not demos.',
    meta: ['inference', 'pipelines', 'evals'],
    sprite: SPRITE_NEURAL,
  },
  {
    tag: 'web',
    title: 'Web engineering',
    body: 'Fast interfaces, API-connected apps, and developer tooling that stays clear and maintainable as it grows.',
    meta: ['interfaces', 'apis', 'tooling'],
    sprite: SPRITE_WEB,
  },
]

const TEAM = [
  { name: 'Cookiemonster', role: 'head developer', href: 'https://github.com/btfcookies', handle: 'btfcookies' },
  { name: 'denial_guzheng', role: 'head engineer', href: 'https://github.com/Eightbit-Labs', handle: 'denial_guzheng' },
  { name: 'WerterTheBug', role: 'senior developer', href: 'https://github.com/WerterTheBug', handle: 'WerterTheBug' },
  { name: 'gir0fa', role: 'senior developer', href: 'https://github.com/wbrous', handle: 'wbrous' },
  { name: 'Mr_Dragon0011', role: 'developer', href: 'https://github.com/MrDragon0011', handle: 'MrDragon0011' },
]

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  const rows = useMemo(() => identiconRows(member.handle), [member.handle])
  return (
    <a
      className="team-card card rz"
      href={member.href}
      target="_blank"
      rel="noreferrer"
    >
      <PixelSprite rows={rows} className="team-sprite" />
      <span className="team-name">{member.name}</span>
      <span className="pix team-role">{member.role}</span>
      <span className="team-handle">
        <GithubIcon />
        {member.handle}
      </span>
    </a>
  )
}

function App() {
  const heroRef = useRef<HTMLElement>(null)
  const [heroCode, setHeroCode] = useState(() => MESSAGE.charCodeAt(0))

  /* Rasterize — the page-wide scroll animation. Every .rz element's
     visibility is scrubbed directly by scroll position: it materializes
     through a growing-dot halftone mask as it rises from the fold, and
     de-rezzes again if you scroll back. Progress is quantized to 8
     discrete steps, so the whole page snaps in and out like an 8-bit
     sprite loading. The fixed dot raster behind the page ticks along
     in half-cell steps via --raster-y. */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rz'))
    const root = document.documentElement

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => {
        el.style.setProperty('--p', '1')
        el.classList.add('rz-done')
      })
      return
    }

    const STEPS = 8
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      root.style.setProperty('--raster-y', `${Math.round(window.scrollY / 26) * 13}px`)
      for (const el of els) {
        const top = el.getBoundingClientRect().top
        // materialize across the bottom 38% of the viewport
        const p = Math.max(0, Math.min(1, (vh - top) / (vh * 0.38)))
        const q = Math.round(p * STEPS) / STEPS
        el.style.setProperty('--p', q.toFixed(3))
        el.classList.toggle('rz-done', q === 1)
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const onHeroPointer = (e: ReactPointerEvent<HTMLElement>) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top" aria-label="Eightbit Labs home">
          <LogoMark className="nav-mark" />
          <span>eightbit labs</span>
        </a>
        <nav className="nav-links">
          <a href="#work">work</a>
          <a href="#team">team</a>
          <a className="nav-gh" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
            <GithubIcon />
            <span>github</span>
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ----------------------------- HERO ----------------------------- */}
        <section className="hero" ref={heroRef} onPointerMove={onHeroPointer}>
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="pix eyebrow h-in h-in-1">8 bits · 1 byte · 5 engineers</p>
              <h1 className="hero-title h-in h-in-2">
                Every bit<br />engineered<span className="volt-txt">.</span>
              </h1>
              <p className="lead hero-lead h-in h-in-3">
                Eightbit Labs is a five-person studio building neural systems and the
                web platforms that carry them — precise from the first byte to production.
              </p>
              <div className="cta-row h-in h-in-4">
                <a className="btn btn-primary" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
                  Explore our GitHub
                  <ArrowIcon />
                </a>
                <a className="btn btn-ghost" href="#work">See the work</a>
              </div>

              <ByteRegister onCode={setHeroCode} />
            </div>

            <GlyphDisplay code={heroCode} />
          </div>
        </section>

        {/* -------------------------- CAPABILITIES ------------------------ */}
        <section className="band" id="work">
          <div className="wrap">
            <div className="section-head rz">
              <p className="pix eyebrow">what we build</p>
              <h2>Two crafts, one stack.</h2>
            </div>

            <div className="caps-grid">
              {CAPS.map((c) => (
                <article key={c.tag} className="cap-card card rz">
                  <PixelSprite rows={c.sprite} className="cap-sprite" />
                  <p className="pix cap-tag">{c.tag}</p>
                  <h3>{c.title}</h3>
                  <p className="cap-body">{c.body}</p>
                  <ul className="cap-meta pix">
                    {c.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <article className="cap-card cap-wide card rz">
                <PixelSprite rows={SPRITE_SHIP} className="cap-sprite" />
                <div className="cap-wide-copy">
                  <p className="pix cap-tag">neural + web</p>
                  <h3>Integrated delivery</h3>
                  <p className="cap-body">
                    Most products need both. We design the model and the interface as one
                    system, so machine intelligence ships with the UX it deserves —
                    deliberate from architecture down to the last interaction.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ------------------------------ TEAM ---------------------------- */}
        <section className="team" id="team">
          <div className="wrap">
            <div className="section-head team-head rz">
              <div>
                <p className="pix eyebrow">the team</p>
                <h2>Five people. Full stack.</h2>
              </div>
              <p className="pix team-count">sprites generated from each handle</p>
            </div>

            <div className="team-grid">
              {TEAM.map((m) => (
                <TeamCard key={m.handle} member={m} />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------ CTA ----------------------------- */}
        <section className="cta">
          <div className="wrap cta-inner rz">
            <LogoMark className="cta-mark" />
            <h2>Read the source.</h2>
            <p className="lead cta-lead">
              Active work and technical direction live on GitHub — the fastest way to
              see where Eightbit Labs is headed.
            </p>
            <a className="btn btn-primary btn-lg" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
              <GithubIcon />
              github.com/Eightbit-Labs
              <ArrowIcon />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <a className="nav-brand" href="#top" aria-label="Eightbit Labs home">
            <LogoMark className="nav-mark" />
            <span>eightbit labs</span>
          </a>
          <p className="pix footer-meta">neural systems + web engineering · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
