import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const floatTransition = {
  duration: 8,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
}

const features = [
  {
    icon: 'bi-diagram-3-fill',
    title: 'Smart Organization',
    description: 'Keep every project, priority, and deadline clear with focused task views built for momentum.',
  },
  {
    icon: 'bi-activity',
    title: 'Real-time Tracking',
    description: 'See progress unfold instantly with live status signals, clean filters, and actionable summaries.',
  },
  {
    icon: 'bi-people-fill',
    title: 'Team Collaboration',
    description: 'Assign work, align responsibilities, and keep teams moving without losing context.',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'Users' },
  { value: 10, suffix: 'K+', label: 'Tasks' },
  { value: 99, suffix: '%', label: 'Uptime' },
  { value: 24, suffix: '/7', label: 'Support' },
]

function AnimatedStat({ value, suffix, label }) {
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)
  const statRef = useRef(null)
  const isInView = useInView(statRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const unsubscribe = count.on('change', (latest) => {
      setDisplay(Math.round(latest))
    })

    return unsubscribe
  }, [count])

  useEffect(() => {
    if (!isInView) {
      return undefined
    }

    const controls = animate(count, value, { duration: 1.6, ease: 'easeOut' })
    return controls.stop
  }, [count, isInView, value])

  return (
    <motion.div ref={statRef} variants={fadeUp} className="col-6 col-lg-3 text-center">
      <div className="display-5 fw-black text-white">
        {display}
        {suffix}
      </div>
      <div className="text-white-50 fw-semibold">{label}</div>
    </motion.div>
  )
}

function FloatingShape({ className, style, delay = 0 }) {
  return (
    <motion.div
      className={`geo-shape ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: [0.26, 0.48, 0.26],
        y: [0, -26, 18],
        rotate: [0, 18, -10],
        scale: [0.9, 1.08, 0.96],
      }}
      transition={{ ...floatTransition, delay }}
    />
  )
}

export default function LandingPage() {
  return (
    <div className="landing-page gradient-bg">
      <FloatingShape
        className="rounded-circle"
        delay={0.2}
        style={{
          width: 130,
          height: 130,
          top: '14%',
          left: '8%',
          background: 'rgba(99, 102, 241, 0.2)',
        }}
      />
      <FloatingShape
        className="rounded-4"
        delay={1.1}
        style={{
          width: 96,
          height: 96,
          top: '21%',
          right: '10%',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          background: 'rgba(139, 92, 246, 0.16)',
        }}
      />
      <FloatingShape
        className="rounded-circle"
        delay={0.8}
        style={{
          width: 72,
          height: 72,
          bottom: '22%',
          left: '18%',
          border: '1px solid rgba(99, 102, 241, 0.35)',
        }}
      />

      <section className="landing-hero text-center">
        <div className="container position-relative">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="d-inline-flex align-items-center gap-2 glass-card px-3 py-2 mb-4">
              <i className="bi bi-lightning-charge-fill gradient-text" />
              <span className="small fw-bold text-secondary-custom">TaskFlow for focused teams</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="hero-title mb-4">
              Manage Tasks.
              <br />
              <span className="gradient-text">Achieve More.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="hero-copy mb-5">
              A modern task management workspace for planning priorities, tracking progress, and helping every team member do their best work.
            </motion.p>
            <motion.div variants={fadeUp} className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <motion.a href="/register" className="btn btn-gradient btn-lg" whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Get Started Free
              </motion.a>
              <motion.a href="/login" className="btn btn-outline-light btn-lg" whileHover={{ y: -5, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Sign In
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.a
            href="#features"
            className="position-absolute start-50 translate-middle-x text-secondary-custom"
            style={{ bottom: '-12vh' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <i className="bi bi-chevron-down fs-3" />
          </motion.a>
        </div>
      </section>

      <section id="features" className="section-pad">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            <h2 className="section-title">Everything your workflow needs</h2>
            <motion.div
              className="section-underline"
              initial={{ width: 0 }}
              whileInView={{ width: 92 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          </motion.div>
          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature) => (
              <motion.div key={feature.title} className="col-md-4" variants={fadeUp}>
                <motion.article className="glass-card h-100 p-4 p-lg-5" whileHover={{ y: -10, boxShadow: '0 26px 70px rgba(99, 102, 241, 0.28)' }}>
                  <motion.div className="feature-icon mb-4" whileHover={{ scale: 1.12, rotate: -4 }}>
                    <i className={`bi ${feature.icon}`} />
                  </motion.div>
                  <h3 className="h4 fw-bold mb-3">{feature.title}</h3>
                  <p className="text-secondary-custom mb-0">{feature.description}</p>
                </motion.article>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="stats-band section-pad">
        <div className="container">
          <motion.div
            className="row g-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-pad position-relative overflow-hidden">
        <motion.div
          className="background-orb"
          style={{ right: '16%', top: '18%', background: 'rgba(139, 92, 246, 0.12)' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="container position-relative text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              Ready to boost your productivity?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-secondary-custom fs-5 mb-5">
              Bring clarity to your day with a task system that feels fast, polished, and calm.
            </motion.p>
            <motion.a href="/register" className="btn btn-gradient btn-lg px-5" variants={fadeUp} whileHover={{ y: -5, scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              Start For Free
            </motion.a>
          </motion.div>
        </div>
      </section>

      <footer className="footer py-4">
        <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2 fw-black fs-4">
            <i className="bi bi-lightning-charge-fill gradient-text" />
            <span className="gradient-text">TaskFlow</span>
          </div>
          <div className="text-secondary-custom small">Copyright 2026 TaskFlow. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
