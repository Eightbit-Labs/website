import { useEffect, useMemo, useRef } from 'react'
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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

const CAPS = [
  {
    title: 'Neural systems',
    body: 'Model-backed features, inference pipelines, and evaluation loops built to run inside real products — not demos.',
    meta: ['Inference', 'Pipelines', 'Evals'],
    Icon: NeuralIcon,
  },
  {
    title: 'Web engineering',
    body: 'Fast interfaces, API-connected apps, and developer tooling that stays clear and maintainable as it grows.',
    meta: ['Interfaces', 'APIs', 'Tooling'],
    Icon: WebIcon,
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

function App() {
  const heroRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  useReveal()

  /* one scroll listener drives three quiet, related effects: the hero      */
  /* photo's parallax drift, the nav pill firming up once you leave the     */
  /* hero, and a thin scroll-progress fill inset in the pill. */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hero = heroRef.current
    const nav = navRef.current
    const progress = progressRef.current
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

      <header className="nav" ref={navRef}>
        <a className="nav-brand" href="#top" aria-label="Eightbit Labs home">
          <LogoMark className="nav-mark" />
          <span>eightbit labs</span>
        </a>
        <nav className="nav-links">
          <a href="#work">Work</a>
          <a href="#team">Team</a>
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
                web platforms that carry them — precise from the first byte to production.
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
              {CAPS.map((c) => (
                <article key={c.title} className="cap-card card reveal">
                  <c.Icon />
                  <h3>{c.title}</h3>
                  <p className="cap-body">{c.body}</p>
                  <ul className="cap-meta">
                    {c.meta.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <article className="cap-card cap-wide reveal">
                <ShipIcon />
                <div className="cap-wide-copy">
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
              Active work and technical direction live on GitHub — the fastest way to
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
    </div>
  )
}

export default App
