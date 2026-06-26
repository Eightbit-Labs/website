import { useEffect, useRef } from 'react'
import logoMark from '../el logo (1).png'
import './App.css'

/* ------------------------------------------------------------------ */
/* Brand mark — the original Eightbit Labs hourglass logo, set in a     */
/* rounded black tile so the white mark reads on the light theme.       */
/* ------------------------------------------------------------------ */
function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`logo-tile ${className ?? ''}`} aria-hidden="true">
      <img src={logoMark} alt="" />
    </span>
  )
}

function PinchDivider() {
  return (
    <div className="pinch-divider" aria-hidden="true">
      <svg viewBox="0 0 120 24" fill="none" preserveAspectRatio="xMidYMid meet">
        <path d="M2 2 L58 12 L2 22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M118 2 L62 12 L118 22" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="60" cy="12" r="1.8" fill="var(--flux)" />
      </svg>
    </div>
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
/* Bit-stream — squares drift down, converge at the pinch, disperse     */
/* below: the "eightbit through the glass." Fall speed kept very slow    */
/* for a calm, gently settling drift.                                    */
/* ------------------------------------------------------------------ */
function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const COUNT = 78
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0

    type Bit = { lane: number; y: number; size: number; speed: number; flux: boolean; rot: number; rotV: number }
    const bits: Bit[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const spawn = (initial: boolean): Bit => ({
      lane: rand(-1, 1),
      y: initial ? rand(0, 1) : -0.04,
      size: rand(2.2, 4.6),
      speed: rand(0.0005, 0.0014), // very slow drift
      flux: Math.random() < 0.22,
      rot: rand(0, Math.PI),
      rotV: rand(-0.0025, 0.0025),
    })

    for (let i = 0; i < COUNT; i++) bits.push(spawn(true))

    // funnel: half-width of the channel at a given normalized y (0..1)
    const halfWidth = (ny: number) => {
      const topHalf = 0.46
      const pinchHalf = 0.015
      const botHalf = 0.42
      if (ny < 0.5) {
        const t = ny / 0.5
        return (topHalf + (pinchHalf - topHalf) * t) * w
      }
      const t = (ny - 0.5) / 0.5
      return (pinchHalf + (botHalf - pinchHalf) * t) * w
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const pinchY = h * 0.5

      // soft pinch glow
      const glow = ctx.createRadialGradient(cx, pinchY, 0, cx, pinchY, Math.max(60, w * 0.08))
      glow.addColorStop(0, 'rgba(240,83,28,0.14)')
      glow.addColorStop(1, 'rgba(240,83,28,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      for (const b of bits) {
        const ny = Math.min(Math.max(b.y, 0), 1)
        const x = cx + b.lane * halfWidth(ny)
        const y = b.y * h

        // brightest near the pinch, fade at top/bottom edges
        const edge = Math.min(1, b.y / 0.12, (1 - b.y) / 0.16)
        const pinchBoost = 1 - Math.min(1, Math.abs(b.y - 0.5) / 0.5)
        const alpha = Math.max(0, edge) * (0.18 + pinchBoost * 0.5)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(b.rot)
        if (b.flux) {
          ctx.fillStyle = `rgba(240,83,28,${(alpha * 1.1).toFixed(3)})`
        } else {
          ctx.fillStyle = `rgba(12,13,14,${(alpha * 0.85).toFixed(3)})`
        }
        const s = b.size
        ctx.fillRect(-s / 2, -s / 2, s, s)
        ctx.restore()
      }
    }

    const step = () => {
      for (const b of bits) {
        b.y += b.speed
        b.rot += b.rotV
        if (b.y > 1.05) Object.assign(b, spawn(false))
      }
      draw()
      raf = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)

    if (reduce) {
      draw()
    } else {
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-field" aria-hidden="true" />
}

/* ------------------------------------------------------------------ */

const TEAM = [
  { name: 'Cookiemonster', role: 'head developer', href: 'https://github.com/btfcookies', handle: 'btfcookies' },
  { name: 'denial_guzheng', role: 'head engineer', href: 'https://github.com/Eightbit-Labs', handle: 'denial_guzheng' },
  { name: 'WerterTheBug', role: 'senior developer', href: 'https://github.com/WerterTheBug', handle: 'WerterTheBug' },
  { name: 'gir0fa', role: 'senior developer', href: 'https://github.com/wbrous', handle: 'wbrous' },
  { name: 'Mr_Dragon0011', role: 'developer', href: 'https://github.com/MrDragon0011', handle: 'MrDragon0011' },
]

function App() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal')
    if (items.length === 0) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((i) => i.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

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
            <ArrowIcon />
          </a>
        </nav>
      </header>

      <main id="top">
        {/* ----------------------------- HERO ----------------------------- */}
        <section className="hero">
          <HeroField />
          <div className="hero-inner">
            <p className="eyebrow hero-eyebrow">// neural systems + web engineering</p>
            <h1 className="hero-title">
              <span className="line"><span>We build</span></span>
              <span className="line"><span>software that</span></span>
              <span className="line line-accent"><span>thinks.</span></span>
            </h1>
            <p className="lead hero-lead">
              Eightbit Labs ships neural systems and the web platforms that carry them —
              engineered for speed, clarity, and production from day one.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
                Explore our GitHub
                <ArrowIcon />
              </a>
              <a className="btn btn-ghost" href="#work">See the work</a>
            </div>
          </div>
          <dl className="hero-meta">
            <div><dt>focus</dt><dd>neural systems</dd></div>
            <div><dt>delivery</dt><dd>web platforms</dd></div>
            <div><dt>method</dt><dd>minimal · fast · precise</dd></div>
          </dl>
        </section>

        <PinchDivider />

        {/* -------------------------- CAPABILITIES ------------------------ */}
        <section className="work" id="work">
          <div className="section-head reveal">
            <p className="eyebrow">// what we build</p>
            <h2>Two disciplines,<br />one point of convergence.</h2>
          </div>

          <div className="streams">
            <article className="stream-card stream-left reveal">
              <span className="stream-glyph" aria-hidden="true">▽</span>
              <p className="stream-tag">neural</p>
              <h3>Neural systems</h3>
              <p className="stream-body">
                Model-backed features, inference workflows, and experimentation
                pipelines built to run inside real products — not demos.
              </p>
            </article>

            <article className="stream-card stream-right reveal">
              <span className="stream-glyph" aria-hidden="true">△</span>
              <p className="stream-tag">web</p>
              <h3>Web engineering</h3>
              <p className="stream-body">
                High-performance interfaces, API-connected apps, and developer
                tooling that stays clear and maintainable as it grows.
              </p>
            </article>
          </div>

          <article className="pinch-panel reveal">
            <p className="stream-tag pinch-tag">where they meet</p>
            <h3 className="pinch-title">Integrated delivery</h3>
            <p className="pinch-body">
              The two streams resolve into one product: machine intelligence wired to
              strong UX, deliberate from architecture down to the last interaction.
            </p>
          </article>
        </section>

        <PinchDivider />

        {/* ------------------------------ TEAM ---------------------------- */}
        <section className="team" id="team">
          <div className="section-head team-head reveal">
            <div>
              <p className="eyebrow">// the team</p>
              <h2>The people who ship it.</h2>
            </div>
            <p className="team-count">05 — engineers</p>
          </div>

          <div className="team-grid">
            {TEAM.map((m, i) => (
              <a
                key={m.name}
                className={`team-card reveal stagger-${(i % 4) + 1}`}
                href={m.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="team-notch" aria-hidden="true" />
                <span className="team-role">{m.role}</span>
                <span className="team-name">{m.name}</span>
                <span className="team-handle">
                  <GithubIcon />
                  {m.handle}
                </span>
              </a>
            ))}
          </div>
        </section>

        <PinchDivider />

        {/* ------------------------------ CTA ----------------------------- */}
        <section className="cta">
          <div className="cta-inner reveal">
            <LogoMark className="cta-mark" />
            <h2>See what we're<br />building.</h2>
            <p className="lead cta-lead">
              Active work and technical direction live on GitHub. That's the fastest
              way to read where Eightbit Labs is headed.
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
        <a className="nav-brand" href="#top" aria-label="Eightbit Labs home">
          <LogoMark className="nav-mark" />
          <span>eightbit labs</span>
        </a>
        <p className="footer-meta">neural systems + web engineering · {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default App
