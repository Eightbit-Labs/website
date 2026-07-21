import { useEffect, useMemo, useRef, useState } from 'react'
import logoMark from '../el logo (1).png'
import heroSkyline from '../The-Dallas-City-Skyline-01.jpg'
import './App.css'

/* ------------------------------------------------------------------ */
/* Brand mark — the hourglass logo in a rounded dusk tile so the        */
/* white mark reads on the parchment canvas.                            */
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
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/* line-art capability icons — thin single-weight strokes, no fill,       */
/* matching the reference's "simple line arrows / minimal icons" rule.   */
function NeuralIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <circle cx="16" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="26" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="6" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="26" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M8 9.6 13.6 14M23.9 9.6 18.4 14M8 22.4l5.6-4.4M23.9 22.4l-5.6-4.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 12h24" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="8" cy="9" r="0.9" fill="currentColor" />
      <circle cx="11.2" cy="9" r="0.9" fill="currentColor" />
      <path d="M9 17h9M9 21h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function ShipIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="none">
      <rect x="5" y="5" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11" y="11" width="16" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/* line-art diagrams — the larger, explanatory cousins of the capability   */
/* icons above. Same single-weight stroke language, just given room to     */
/* show structure rather than stand in as a glyph.                         */
function NeuralDiagram() {
  const inputs = [30, 70, 110]
  const hidden = [16, 52, 88, 124]
  const outputs = [52, 88]
  return (
    <svg viewBox="0 0 260 140" aria-hidden="true" fill="none" className="diagram-svg">
      {inputs.flatMap((y1, i) =>
        hidden.map((y2, j) => (
          <line key={`ih-${i}-${j}`} x1="26" y1={y1} x2="128" y2={y2} stroke="currentColor" strokeWidth="0.6" opacity="0.32" />
        )),
      )}
      {hidden.flatMap((y1, i) =>
        outputs.map((y2, j) => (
          <line key={`ho-${i}-${j}`} x1="132" y1={y1} x2="234" y2={y2} stroke="currentColor" strokeWidth="0.6" opacity="0.32" />
        )),
      )}
      {inputs.map((y, i) => (
        <circle key={`in-${i}`} cx="24" cy={y} r="5" stroke="currentColor" strokeWidth="1.4" />
      ))}
      {hidden.map((y, i) => (
        <circle key={`hid-${i}`} cx="130" cy={y} r="5" stroke="currentColor" strokeWidth="1.4" />
      ))}
      {outputs.map((y, i) => (
        <circle key={`out-${i}`} cx="236" cy={y} r="5" stroke="currentColor" strokeWidth="1.4" />
      ))}
    </svg>
  )
}

function WebDiagram() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden="true" fill="none" className="diagram-svg">
      <rect x="10" y="20" width="80" height="56" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 34h80" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="19" cy="27" r="1.6" fill="currentColor" />
      <circle cx="26" cy="27" r="1.6" fill="currentColor" />
      <path d="M22 46h46M22 58h30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      <path d="M96 48h28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M118 42l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="132" y="24" width="66" height="48" rx="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M146 40h38M146 50h38M146 60h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />

      <path d="M204 48h26" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M224 42l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <ellipse cx="264" cy="34" rx="24" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M240 34v30c0 5 10.7 9 24 9s24-4 24-9V34" stroke="currentColor" strokeWidth="1.4" />
      <path d="M240 49c0 5 10.7 9 24 9s24-4 24-9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function IntegratedDiagram() {
  return (
    <svg viewBox="0 0 200 130" aria-hidden="true" fill="none" className="diagram-svg">
      <rect x="14" y="20" width="90" height="90" rx="10" stroke="currentColor" strokeWidth="1.4" />
      <rect x="96" y="20" width="90" height="90" rx="10" stroke="currentColor" strokeWidth="1.4" />
      <path d="M46 52 100 40M46 80 100 90M154 52 100 40M154 80 100 90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="46" cy="52" r="3" fill="currentColor" />
      <circle cx="46" cy="80" r="3" fill="currentColor" />
      <circle cx="154" cy="52" r="3" fill="currentColor" />
      <circle cx="154" cy="80" r="3" fill="currentColor" />
      <circle cx="100" cy="65" r="4.5" fill="currentColor" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* AvatarRing — a quiet nod to the studio's name without the old pixel   */
/* voice: eight tick marks around a circle, on/off per bit, deterministic */
/* from each teammate's real handle (FNV-1a hash → low 8 bits).          */
/* ------------------------------------------------------------------ */
function ringBits(seed: string): boolean[] {
  let h = 2166136261
  for (const ch of seed) {
    h ^= ch.charCodeAt(0)
    h = Math.imul(h, 16777619) >>> 0
  }
  return Array.from({ length: 8 }, (_, i) => ((h >>> i) & 1) === 1)
}

function AvatarRing({ seed }: { seed: string }) {
  const bits = useMemo(() => ringBits(seed), [seed])
  const cx = 28
  const cy = 28
  const rOuter = 25
  const rInner = 19

  return (
    <svg className="avatar-ring" viewBox="0 0 56 56" aria-hidden="true">
      <circle cx={cx} cy={cy} r={14} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      {bits.map((on, i) => {
        const angle = (i * 45 - 90) * (Math.PI / 180)
        const x1 = cx + rInner * Math.cos(angle)
        const y1 = cy + rInner * Math.sin(angle)
        const x2 = cx + rOuter * Math.cos(angle)
        const y2 = cy + rOuter * Math.sin(angle)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth={on ? 2.2 : 1.3}
            strokeLinecap="round"
            opacity={on ? 1 : 0.3}
          />
        )
      })}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Reveal — a quiet fade + rise as sections enter view. Restrained on     */
/* purpose: one ambient effect, no scroll-scrubbed gimmicks.              */
/* ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      /* threshold must stay 0 — these targets carry their own clip-path,
         which Chromium factors into the intersection area, so any nonzero
         threshold can never be met (the box is clipped to zero area until
         it's already revealed). Position-only overlap is what we want
         anyway: rootMargin still gates how far into the viewport it must
         sit before firing. */
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const CAPS = [
  {
    title: 'Neural systems',
    body: 'Model-backed features, inference pipelines, and evaluation loops built to run inside real products: not demos.',
    meta: ['Inference', 'Pipelines', 'Evals'],
    Icon: NeuralIcon,
    Diagram: NeuralDiagram,
    detail: {
      summary:
        'We build the layer between a trained model and the product a person actually uses: request routing, prompt and context assembly, and the guardrails that keep output reliable under real traffic.',
      points: [
        'Inference APIs wired into production paths, not left in a notebook',
        'Evaluation loops that catch regressions before a user does',
        'Latency and cost budgets treated as product requirements, not afterthoughts',
      ],
    },
  },
  {
    title: 'Web engineering',
    body: 'Fast interfaces, API-connected apps, and developer tooling that stays clear and maintainable as it grows.',
    meta: ['Interfaces', 'APIs', 'Tooling'],
    Icon: WebIcon,
    Diagram: WebDiagram,
    detail: {
      summary:
        'The other half of every model-backed feature is the interface someone trusts. We build the browser-to-API-to-data path with the same rigor as the model behind it: typed, tested, and legible a year later.',
      points: [
        'Type-safe APIs shared end to end between client and server',
        'Interfaces that stay fast as data volume and feature count grow',
        'Internal tooling built for the next engineer who touches the code',
      ],
    },
  },
]

const TEAM = [
  { name: 'Cookiemonster', role: 'Head developer', href: 'https://github.com/btfcookies', handle: 'btfcookies' },
  { name: 'denial_guzheng', role: 'Head engineer', href: 'https://github.com/Eightbit-Labs', handle: 'denial_guzheng' },
  { name: 'WerterTheBug', role: 'Senior developer', href: 'https://github.com/WerterTheBug', handle: 'WerterTheBug' },
  { name: 'gir0fa', role: 'Senior developer', href: 'https://github.com/wbrous', handle: 'wbrous' },
  { name: 'Mr_Dragon0011', role: 'Developer', href: 'https://github.com/MrDragon0011', handle: 'MrDragon0011' },
]

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  return (
    <a className="team-card card reveal" href={member.href} target="_blank" rel="noreferrer">
      <AvatarRing seed={member.handle} />
      <span className="team-name">{member.name}</span>
      <span className="team-role">{member.role}</span>
      <span className="team-handle">
        <GithubIcon />
        {member.handle}
      </span>
    </a>
  )
}

function CapModal({ cap, onClose }: { cap: (typeof CAPS)[number]; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="cap-modal-title" ref={dialogRef} tabIndex={-1}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        <cap.Icon />
        <h3 id="cap-modal-title">{cap.title}</h3>
        <p className="modal-summary">{cap.detail.summary}</p>
        <ul className="modal-points">
          {cap.detail.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className="diagram-card">
          <cap.Diagram />
        </div>
      </div>
    </div>
  )
}

function App() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const navLinksRef = useRef<HTMLElement>(null)
  const navPillRef = useRef<HTMLSpanElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [activeCap, setActiveCap] = useState<number | null>(null)
  useReveal()

  /* one scroll listener drives four quiet, related effects: the hero       */
  /* photo's parallax drift, the nav pill firming up once you leave the     */
  /* hero, a thin scroll-progress fill inset in the pill, and the liquid-   */
  /* glass active-section pill sliding under whichever nav link is in view. */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = heroRef.current
    const nav = navRef.current
    const navLinks = navLinksRef.current
    const navPill = navPillRef.current
    const progress = progressRef.current
    const sections = [
      { id: 'work', el: document.getElementById('work') },
      { id: 'team', el: document.getElementById('team') },
    ]
    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY
      if (hero && !reduceMotion) {
        hero.style.setProperty('--drift', `${Math.min(y, window.innerHeight) * 0.08}px`)
      }
      if (nav) {
        nav.classList.toggle('is-scrolled', y > 40)
      }
      if (progress) {
        const max = document.documentElement.scrollHeight - window.innerHeight
        progress.style.setProperty('--scroll-progress', String(max > 0 ? Math.min(1, y / max) : 0))
      }
      if (navLinks && navPill) {
        /* classic scrollspy: the active section is the last one (in document */
        /* order) whose top has crossed the line just below the floating nav. */
        const threshold = 140
        let activeId: string | null = null
        for (const { id, el } of sections) {
          if (el && el.getBoundingClientRect().top <= threshold) activeId = id
        }

        navLinks.querySelectorAll<HTMLElement>('[data-nav]').forEach((link) => {
          link.classList.toggle('is-active', link.dataset.nav === activeId)
        })

        const target = activeId ? navLinks.querySelector<HTMLElement>(`[data-nav="${activeId}"]`) : null
        if (target) {
          const containerRect = navLinks.getBoundingClientRect()
          const targetRect = target.getBoundingClientRect()
          const pad = 10 // extra cushion on each side so the pill wraps the full label
          navPill.style.opacity = '1'
          navPill.style.width = `${targetRect.width + pad * 2}px`
          navPill.style.transform = `translateX(${targetRect.left - containerRect.left - pad}px)`
        } else {
          navPill.style.opacity = '0'
        }
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

  return (
    <div className="page">
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <header
        className="nav"
        ref={navRef}
        onPointerMove={(e) => {
          const el = e.currentTarget
          const rect = el.getBoundingClientRect()
          el.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
          el.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
        }}
      >
        <span className="nav-glare" aria-hidden="true" />
        <a className="nav-brand" href="#top" aria-label="Eightbit Labs home">
          <LogoMark className="nav-mark" />
          <span>eightbit labs</span>
        </a>
        <nav className="nav-links" ref={navLinksRef}>
          <span className="nav-pill" ref={navPillRef} aria-hidden="true" />
          <a href="#work" data-nav="work">Work</a>
          <a href="#team" data-nav="team">Team</a>
          <a className="nav-gh" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ----------------------------- HERO ----------------------------- */}
        <section className="hero" ref={heroRef}>
          <div className="hero-photo-parallax">
            <div className="hero-photo" style={{ backgroundImage: `url(${heroSkyline})` }} aria-hidden="true" />
          </div>
          <div className="hero-grade" aria-hidden="true" />

          <div className="hero-overlay-wrap">
            <div className="hero-card">
              <p className="eyebrow">5 engineers · neural systems + web</p>
              <h1 className="hero-title">Every bit engineered.</h1>
              <p className="lead hero-lead">
                Eightbit Labs is a five-person studio building neural systems and the
                web platforms that carry them: precise from the first byte to production.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
                  Explore our GitHub
                  <span className="btn-arrow">
                    <ArrowIcon />
                  </span>
                </a>
                <a className="btn btn-secondary" href="#work">
                  See the work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------- CAPABILITIES ------------------------ */}
        <section className="band" id="work">
          <div className="wrap">
            <div className="section-head reveal">
              <p className="eyebrow">What we build</p>
              <h2>Two crafts, one stack.</h2>
            </div>

            <div className="caps-grid">
              {CAPS.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  className="cap-card cap-trigger card reveal"
                  onClick={() => setActiveCap(i)}
                  aria-haspopup="dialog"
                >
                  <c.Icon />
                  <h3>{c.title}</h3>
                  <p className="cap-body">{c.body}</p>
                  <ul className="cap-meta">
                    {c.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  <span className="cap-more">
                    Learn more
                    <ArrowIcon />
                  </span>
                </button>
              ))}

              <article className="cap-card cap-wide card reveal">
                <div className="cap-wide-copy">
                  <ShipIcon />
                  <h3>Integrated delivery</h3>
                  <p className="cap-body">
                    Most products need both. We design the model and the interface as one
                    system, so machine intelligence ships with the UX it deserves:
                    deliberate from architecture down to the last interaction.
                  </p>
                </div>
                <div className="diagram-card">
                  <IntegratedDiagram />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ------------------------------ TEAM ---------------------------- */}
        <section className="team" id="team">
          <div className="wrap">
            <div className="section-head team-head reveal">
              <div>
                <p className="eyebrow">The team</p>
                <h2>Five people. Full stack.</h2>
              </div>
              <p className="team-count">Each mark is drawn from a real handle</p>
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
          <div className="wrap cta-inner reveal">
            <h2>Read the source.</h2>
            <p className="lead cta-lead">
              Active work and technical direction live on GitHub: the fastest way to
              see where Eightbit Labs is headed.
            </p>
            <a className="btn btn-filled" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
              <GithubIcon />
              github.com/Eightbit-Labs
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
          <p className="footer-meta">Neural systems + web engineering · {new Date().getFullYear()}</p>
        </div>
      </footer>

      {activeCap !== null && <CapModal cap={CAPS[activeCap]} onClose={() => setActiveCap(null)} />}
    </div>
  )
}

export default App
