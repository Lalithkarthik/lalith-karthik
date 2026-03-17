import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'

const ROLES = [
  'Applied ML Engineer',
  'AI Systems Designer',
  'Team Lead & Builder',
  'Computer Science Undergrad',
]

// ─────────────────────────────────────────────
//  SKILLS — add or remove categories/tags here
// ─────────────────────────────────────────────
const SKILLS = [
  {
    icon: '⌨️',
    title: 'Programming',
    tags: ['Python', 'C', 'C++', 'Java', 'SQL', 'R', 'MATLAB'],
  },
  {
    icon: '🧠',
    title: 'Machine Learning',
    tags: [
      'PyTorch', 'TensorFlow', 'Scikit-learn',
      'GNNs', 'Reinforcement Learning', 'FAISS',
      'Feature Engineering', 'Model Evaluation', 'Optimization',
    ],
  },
  {
    icon: '⚡',
    title: 'Backend & APIs',
    tags: ['FastAPI', 'Flask', 'React.js', 'Express.js', 'REST APIs'],
  },
  {
    icon: '🗄️',
    title: 'Databases & Tools',
    tags: ['MongoDB', 'MySQL', 'Linux', 'Git / GitHub', 'Postman', 'CI/CD'],
  },
]
// ─────────────────────────────────────────────

export default function Home() {
  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const cursorDot = useRef(null)
  const cursorRing = useRef(null)

  // Theme — default light
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDarkMode(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  // Cursor
  useEffect(() => {
    const move = (e) => {
      if (cursorDot.current) {
        cursorDot.current.style.left = e.clientX + 'px'
        cursorDot.current.style.top = e.clientY + 'px'
      }
      if (cursorRing.current) {
        cursorRing.current.style.left = e.clientX + 'px'
        cursorRing.current.style.top = e.clientY + 'px'
      }
    }
    const over = () => cursorRing.current?.classList.add('hovering')
    const out = () => cursorRing.current?.classList.remove('hovering')
    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, .skill-tag, .project-card, .contact-link').forEach(el => {
      el.addEventListener('mouseenter', over)
      el.addEventListener('mouseleave', out)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx]
    const speed = isDeleting ? 40 : 80
    const pause = isDeleting ? 0 : 1800
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typed.length < current.length) {
          setTyped(current.slice(0, typed.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        if (typed.length > 0) {
          setTyped(current.slice(0, typed.length - 1))
        } else {
          setIsDeleting(false)
          setRoleIdx((roleIdx + 1) % ROLES.length)
        }
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [typed, isDeleting, roleIdx])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal, .timeline-item, .project-card, .edu-card, .ach-card').forEach(el => {
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navLinks = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact']

  return (
    <>
      <Head>
        <title>L Sree Lalith Karthik — ML Engineer & AI Systems Designer</title>
        <meta name="description" content="Portfolio of L Sree Lalith Karthik — Applied ML Engineer, AI Systems Designer, and CS undergrad at IIIT Raichur & IIT Guwahati." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      {/* NAV */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <a href="#hero" className="nav-logo">lslk.dev</a>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-icon">{darkMode ? '☀︎' : '◑'}</span>
          </button>
          <a href="mailto:lalithkarthik.lslk@gmail.com" className="nav-cta">Hire Me</a>
        </div>
        <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
        <button className="theme-toggle mobile-theme" onClick={toggleTheme}>
          {darkMode ? '☀︎ Light Mode' : '◑ Dark Mode'}
        </button>
      </div>

      {/* ─── HERO ─── */}
      <section id="hero">
        <div className="hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        <div className="hero-layout">
          {/* Left */}
          <div className="hero-content">
            <p className="hero-label"></p>
            <h1 className="hero-name">
              <span className="first">L Sree Lalith</span>
              <span className="last">Karthik</span>
            </h1>
            <p className="hero-typewriter">
              <span className="typed">{typed}</span>
              <span className="cursor-blink">_</span>
            </p>
            <p className="hero-desc">
              CS and AI/ML undergrad at <strong>IIIT Raichur</strong> &amp; <strong>IIT Guwahati</strong> designing
              end-to-end ML systems, improving model performance, and deploying scalable AI solutions that move the needle.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <span>→</span>
              </a>
              <a href="#contact" className="btn-secondary">Get in Touch ↗</a>
            </div>
          </div>

          {/* Right — floating JSON card */}
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="hero-card-dots">
                <span className="hcd red" />
                <span className="hcd yellow" />
                <span className="hcd green" />
              </div>
              <span className="hero-card-filename">profile.json</span>
            </div>
            <div className="hero-card-body">
              <p className="jl"><span className="jb">{'{'}</span></p>
              <p className="jl i1"><span className="jk">"name"</span><span className="jc">: </span><span className="js">"L Sree Lalith Karthik"</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"role"</span><span className="jc">: </span><span className="js">"Applied ML Engineer"</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"degrees"</span><span className="jc">: </span><span className="jbr">[</span></p>
              <p className="jl i2"><span className="js">"B.Tech CSE — IIIT Raichur"</span><span className="jp">,</span></p>
              <p className="jl i2"><span className="js">"B.S. AI &amp; DS — IIT Guwahati"</span></p>
              <p className="jl i1"><span className="jbr">]</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"cgpa"</span><span className="jc">: </span><span className="jn">9.12</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"status"</span><span className="jc">: </span><span className="js jgreen">"open_to_work"</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"stack"</span><span className="jc">: </span><span className="jbr">[</span><span className="js">"PyTorch"</span><span className="jp">, </span><span className="js">"LangChain"</span><span className="jp">, </span><span className="js">"FastAPI"</span><span className="jbr">]</span><span className="jp">,</span></p>
              <p className="jl i1"><span className="jk">"scholar"</span><span className="jc">: </span><span className="js">"Reliance Foundation 2023"</span></p>
              <p className="jl"><span className="jb">{'}'}</span></p>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about">
        <p className="section-tag reveal">01 — About</p>
        <h2 className="section-title reveal">Turning <em>data</em> into<br />real-world impact.</h2>
        <div className="section-line reveal" />
        <div className="about-grid">
          <div>
            <div className="about-text">
              <p className="reveal">
                I'm an <strong>Applied ML-focused Computer Science undergraduate</strong> with a dual degree — B.Tech in CSE from IIIT Raichur and a B.S. in AI & Data Science from IIT Guwahati (Online).
              </p>
              <p className="reveal">
                My work spans the full ML pipeline: from <strong>data preprocessing and feature engineering</strong> to model training, evaluation, and production deployment. I've led cross-functional teams and delivered measurable gains in accuracy, inference efficiency, and workflow automation.
              </p>
              <p className="reveal">
                Beyond the code, I'm the <strong>CodeSoc Coordinator</strong> at IIIT Raichur and a proud <strong>Reliance Foundation Scholar 2023</strong> — one of just 5000 selected nationwide.
              </p>
            </div>
            <div className="about-stats">
              {[
                { num: '9.12', label: 'B.Tech CGPA' },
                { num: '8.99', label: 'B.Sc. CGPA' },
                { num: '2+', label: 'Internships' },
                { num: 'One of 5k', label: 'RF Scholars 2023' },
              ].map(s => (
                <div className="stat-card reveal" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-info reveal">
            {[
              { key: 'Name', val: 'L Sree Lalith Karthik' },
              { key: 'Phone', val: '+91 70933 46348' },
              { key: 'Email', val: 'lalithkarthik.lslk@gmail.com', link: 'mailto:lalithkarthik.lslk@gmail.com' },
              { key: 'LinkedIn', val: 'lalith-karthik', link: 'https://www.linkedin.com/in/lalith-karthik-535251322/' },
              { key: 'GitHub', val: 'Lalithkarthik', link: 'https://github.com/Lalithkarthik' },
              { key: 'Location', val: 'Raichur, Karnataka, India' },
              { key: 'Status', val: '🟢 Open to Opportunities' },
            ].map(({ key, val, link }) => (
              <div className="info-row" key={key}>
                <span className="info-key">{key}</span>
                <span className="info-val">
                  {link ? <a href={link} target="_blank" rel="noreferrer">{val}</a> : val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SKILLS ─── */}
      <section id="skills" className="alt-section">
        <div className="inner">
          <p className="section-tag reveal">02 — Skills</p>
          <h2 className="section-title reveal">Tools of the <em>trade</em>.</h2>
          <div className="section-line reveal" />
          <div className="skills-grid">
            {SKILLS.map(cat => (
              <div className="skill-category reveal" key={cat.title}>
                <div className="skill-cat-icon">{cat.icon}</div>
                <div className="skill-cat-title">{cat.title}</div>
                <div className="skill-tags">
                  {cat.tags.map(tag => (
                    <span className="skill-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience">
        <p className="section-tag reveal">03 — Experience</p>
        <h2 className="section-title reveal">Where I've <em>built</em>.</h2>
        <div className="section-line reveal" />
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-meta">
              <span className="timeline-company">Long Term Industrial Development Co.</span>
              <span className="timeline-date">Dec 2025 — Present</span>
              <span className="timeline-badge">Active</span>
            </div>
            <h3 className="timeline-role">AI/ML Intern — Team Lead</h3>
            <ul className="timeline-bullets">
              <li>Led a <strong>5-member team</strong> building a production-oriented ML pipeline covering preprocessing, feature engineering, model training, evaluation, and deployment.</li>
              <li>Improved model accuracy from <strong>68% → 82%</strong> through dataset restructuring, feature refinement, and comparative experimentation across multiple algorithms.</li>
              <li>Developed a <strong>Tkinter-based GUI</strong> integrated with SQL-backed data retrieval, reducing manual workflow steps and improving system usability.</li>
            </ul>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-meta">
              <span className="timeline-company">Bosch Global Software Technologies</span>
              <span className="timeline-date">May 2024 — Nov 2024</span>
              <span className="timeline-badge">Completed</span>
            </div>
            <h3 className="timeline-role">Industry Immersion Research Student</h3>
            <ul className="timeline-bullets">
              <li>Engineered an <strong>AI-powered chatbot</strong> using FastAPI, React.js, Express.js, MongoDB, and open-source LLMs.</li>
              <li>Reduced redundant memory retrieval operations by <strong>20%</strong> and improved average response latency by <strong>15%</strong> through backend optimization.</li>
              <li>Designed scalable <strong>RESTful APIs</strong> and deployed the system in a cloud environment ensuring stable multi-user performance.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="alt-section">
        <div className="inner">
          <p className="section-tag reveal">04 — Projects</p>
          <h2 className="section-title reveal">Things I've <em>shipped</em>.</h2>
          <div className="section-line reveal" />
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-num">01</div>
              <h3 className="project-title">General Local AI Agent</h3>
              <p className="project-desc">
                A modular local AI agent supporting reasoning and several local tasks with FAISS-based document indexing. Built with an orchestration layer for automated code execution and intelligent memory management.
              </p>
              <div className="project-highlights">
                <span className="project-highlight">17% reduction in redundant context retrieval</span>
                <span className="project-highlight">~25% fewer manual task handling steps</span>
                <span className="project-highlight">Optimized memory handling &amp; response consistency</span>
              </div>
              <div className="project-stack">
                {['Python', 'FastAPI', 'LangChain', 'FAISS'].map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
              <a href="https://github.com/Lalithkarthik" target="_blank" rel="noreferrer" className="project-link">View on GitHub →</a>
            </div>
            <div className="project-card">
              <div className="project-num">02</div>
              <h3 className="project-title">Adaptive Power Grid Optimization using GNNs &amp; RL</h3>
              <p className="project-desc">
                A hybrid GNN and swarm-based optimization framework for adaptive grid control in nonlinear environments. Addresses stability challenges of PSO-based approaches under dynamic load variations.
              </p>
              <div className="project-highlights">
                <span className="project-highlight">~14% faster convergence vs baseline PSO</span>
                <span className="project-highlight">~18% decrease in performance variance</span>
                <span className="project-highlight">Robust under dynamic load variations</span>
              </div>
              <div className="project-stack">
                {['Python', 'GNNs', 'Reinforcement Learning', 'PyTorch'].map(t => (
                  <span className="stack-tag" key={t}>{t}</span>
                ))}
              </div>
              <a href="https://github.com/Lalithkarthik" target="_blank" rel="noreferrer" className="project-link">View on GitHub →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section id="education">
        <p className="section-tag reveal">05 — Education</p>
        <h2 className="section-title reveal">Where I've <em>learned</em>.</h2>
        <div className="section-line reveal" />
        <div className="edu-grid">
          <div className="edu-card">
            <div className="edu-icon">🎓</div>
            <h3 className="edu-degree">Bachelor of Technology</h3>
            <div className="edu-major">Computer Science &amp; Engineering</div>
            <p className="edu-institute">Indian Institute of Information Technology, Raichur</p>
            <p className="edu-location">Raichur, Karnataka</p>
            <div className="edu-meta">
              <span className="edu-badge">Aug 2023 – May 2027</span>
              <span className="edu-cgpa">CGPA: 9.12 / 10</span>
            </div>
          </div>
          <div className="edu-card">
            <div className="edu-icon">🤖</div>
            <h3 className="edu-degree">Bachelor of Science</h3>
            <div className="edu-major">Artificial Intelligence &amp; Data Science</div>
            <p className="edu-institute">Indian Institute of Technology, Guwahati (Online)</p>
            <p className="edu-location">Guwahati, Assam</p>
            <div className="edu-meta">
              <span className="edu-badge">Sept 2023 – May 2027</span>
              <span className="edu-cgpa">CGPA: 8.99 / 10</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '5rem' }}>
          <p className="section-tag reveal" style={{ marginBottom: '2rem' }}>Achievements &amp; Leadership</p>
          <div className="ach-grid">
            {[
              { emoji: '🏆', title: 'Reliance Foundation Scholar 2023', sub: '1 of 5,000 nationwide' },
              { emoji: '👨‍💻', title: 'CodeSoc Coordinator', sub: 'Coding Club, IIIT Raichur' },
              { emoji: '🥇', title: 'Top 4 Teams', sub: 'BGSW Marketplace 2024' },
              { emoji: '☁️', title: 'Oracle OCI AI Foundations', sub: 'Associate Certified' },
            ].map(a => (
              <div className="ach-card" key={a.title}>
                <div className="ach-emoji">{a.emoji}</div>
                <div className="ach-title">{a.title}</div>
                <div className="ach-sub">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="alt-section">
        <div className="inner">
          <p className="section-tag reveal">06 — Contact</p>
          <h2 className="section-title reveal">Let's <em>connect</em>.</h2>
          <div className="section-line reveal" />
          <div className="contact-layout">
            <div>
              <p className="contact-text reveal">
                I'm actively looking for exciting ML and AI engineering opportunities — internships, research collaborations, or full-time roles. If you have an interesting problem to solve, let's talk.
              </p>
              <div className="contact-links">
                {[
                  { icon: '✉️', label: 'Email', value: 'lalithkarthik.lslk@gmail.com', href: 'mailto:lalithkarthik.lslk@gmail.com' },
                  { icon: '📞', label: 'Phone', value: '+91 70933 46348', href: 'tel:+917093346348' },
                  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/lalith-karthik', href: 'https://www.linkedin.com/in/lalith-karthik-535251322/' },
                  { icon: '🐙', label: 'GitHub', value: 'github.com/Lalithkarthik', href: 'https://github.com/Lalithkarthik' },
                ].map(c => (
                  <a href={c.href} target="_blank" rel="noreferrer" className="contact-link reveal" key={c.label}>
                    <span className="contact-link-icon">{c.icon}</span>
                    <span className="contact-link-text">
                      <span className="contact-link-label">{c.label}</span>
                      <span className="contact-link-value">{c.value}</span>
                    </span>
                    <span className="contact-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-cta reveal">
              <p className="contact-cta-label">// Currently open to</p>
              <h3 className="contact-cta-title">ML Engineering Roles &amp; Research Collaborations</h3>
              <p className="contact-cta-text">
                Whether it's building production ML pipelines, designing AI systems, or exploring novel research directions — I'm all ears. Dual degrees, strong academics, proven industry experience.
              </p>
              <a href="mailto:lalithkarthik.lslk@gmail.com" className="btn-primary">
                <span>Send a Message</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="footer-left">
          © {new Date().getFullYear()} L Sree Lalith Karthik — Designed &amp; Built with precision.
        </div>
        <div className="footer-right">
          <a href="https://github.com/Lalithkarthik" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href="https://www.linkedin.com/in/lalith-karthik-535251322/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </>
  )
}
