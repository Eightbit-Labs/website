import { useEffect } from 'react'
import bannerLogo from '../eightbit labs (1).png'
import logoMark from '../el logo (1).png'
import './App.css'

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

function App() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('.reveal')

    if (revealItems.length === 0) {
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <header className="topbar">
          <a className="brand-lockup" href="#top" aria-label="Eightbit Labs home">
            <img src={logoMark} alt="Eightbit Labs logo mark" />
            <span>Eightbit Labs</span>
          </a>
          <a
            className="github-link btn-animated"
            href="https://github.com/Eightbit-Labs"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon />
            GitHub
          </a>
        </header>

        <section className="site-banner reveal" id="top" aria-label="Eightbit Labs banner">
          <img src={bannerLogo} alt="Eightbit Labs banner logo" />
        </section>

        <div className="banner-context reveal">
          <p className="eyebrow">Neural Systems + Web Engineering</p>
          <p className="banner-caption">
            From neural architecture to polished web delivery, Eightbit Labs ships
            software designed for real-world velocity.
          </p>
        </div>

        <div className="hero-grid">
          <div className="hero-copy reveal">
            <h1>Intelligent systems for the modern web.</h1>
            <p className="hero-text">
              Eightbit Labs builds neural-network products and web platforms with a
              focus on speed, clarity, and strong execution.
            </p>
            <div className="cta-row">
              <a className="primary-cta btn-animated" href="https://github.com/Eightbit-Labs" target="_blank" rel="noreferrer">
                Explore our GitHub
              </a>
              <a className="secondary-cta btn-animated" href="#capabilities">
                See capabilities
              </a>
            </div>
          </div>

          <aside className="hero-side reveal" aria-label="Hero section details">
            <h3>What we deliver</h3>
            <ul className="hero-points">
              <li>Neural-network features that move from prototype to production.</li>
              <li>Modern web platforms focused on speed and maintainability.</li>
              <li>Design and engineering that feel cohesive from day one.</li>
            </ul>
          </aside>
        </div>

        <dl className="signal-strip reveal" aria-label="Company focus areas">
          <div>
            <dt>Focus</dt>
            <dd>Neural networks</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>Web platforms</dd>
          </div>
          <div>
            <dt>Style</dt>
            <dd>Minimal. Fast. Precise.</dd>
          </div>
        </dl>
      </section>

      <section className="capabilities reveal" id="capabilities">
        <div className="section-heading reveal">
          <p className="eyebrow">Capabilities</p>
          <h2>Two disciplines, one product mindset.</h2>
        </div>

        <div className="capability-grid">
          <article className="capability-card reveal stagger-1">
            <span className="card-index">01</span>
            <h3>Neural Networks</h3>
            <p>
              Model-backed features, inference workflows, experimentation pipelines,
              and practical AI systems built to operate inside real products.
            </p>
          </article>

          <article className="capability-card reveal stagger-2">
            <span className="card-index">02</span>
            <h3>Web Development</h3>
            <p>
              High-performance frontend systems, polished interfaces, API-connected
              applications, and developer tooling that stays maintainable.
            </p>
          </article>

          <article className="capability-card emphasis reveal stagger-3">
            <span className="card-index">03</span>
            <h3>Integrated Delivery</h3>
            <p>
              We connect machine intelligence to strong UX, turning research and ideas
              into products that feel deliberate from architecture to interface.
            </p>
          </article>
        </div>
      </section>

      <section className="team-section reveal" id="team">
        <div className="section-heading reveal">
          <p className="eyebrow">Team</p>
          <h2>The developers behind Eightbit Labs.</h2>
        </div>

        <div className="team-grid">
          <article className="team-card reveal stagger-1">
            <span className="card-index">01</span>
            <h3>Cookiemonster</h3>
            <p className="team-role">Head Developer</p>
            <a
              className="team-link btn-animated"
              href="https://github.com/btfcookies"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
              View bio
            </a>
          </article>

          <article className="team-card reveal stagger-2">
            <span className="card-index">02</span>
            <h3>WerterTheBug</h3>
            <p className="team-role">Senior Developer</p>
            <a
              className="team-link btn-animated"
              href="https://github.com/WerterTheBug"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
              View bio
            </a>
          </article>
          <article className="team-card reveal stagger-3">
            <span className="card-index">03</span>
            <h3>gir0fa</h3>
            <p className="team-role">Senior Developer</p>
            <a
              className="team-link btn-animated"
              href="https://github.com/wbrous"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
              View bio
            </a>
          </article>
        </div>
      </section>

      <section className="contact-panel reveal" id="contact">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2>See what Eightbit Labs is building.</h2>
          <p className="contact-text">
            The fastest way to review active work and technical direction is through
            our GitHub presence.
          </p>
        </div>

        <a
          className="contact-link btn-animated reveal"
          href="https://github.com/Eightbit-Labs"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          github.com/Eightbit-Labs
        </a>
      </section>
    </main>
  )
}

export default App
