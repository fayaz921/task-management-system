import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Bell, CircleCheck } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const tasks = [
  { title: 'Finalize Q3 product roadmap', done: true, priority: 'High' },
  { title: 'Design review with the brand team', done: false, priority: 'Med' },
  { title: 'Ship onboarding email sequence', done: false, priority: 'High' },
  { title: '1:1 with Priya', done: false, priority: 'Low' },
]

export default function Hero() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-glow" aria-hidden="true" />
      <div className="landing-grid-bg" aria-hidden="true" />

      <div className="landing-container landing-hero-grid">
        <motion.div variants={stagger} initial="hidden" animate="show" className="landing-hero-copy">
          <motion.div variants={fadeUp} className="landing-pill">
            <span />
            New · Team workspaces are here
          </motion.div>

          <motion.h1 variants={fadeUp} className="landing-title">
            Organize work, <span>ship faster.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="landing-subtitle">
            TaskFlow is the calm, focused task manager for people who get things done. Capture ideas in a second,
            prioritize what matters, and watch your team move in lockstep.
          </motion.p>

          <motion.div variants={fadeUp} className="landing-hero-actions">
            <Link to="/register" className="landing-primary-btn">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="landing-secondary-btn">
              Sign In
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="landing-checks">
            <span>
              <CircleCheck size={16} />
              Free forever plan
            </span>
            <span>
              <CircleCheck size={16} />
              No credit card
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="landing-preview-wrap"
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          transition={{ duration: 0.7, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="landing-task-window">
            <div className="landing-window-top">
              <div className="landing-window-dots">
                <span />
                <span />
                <span />
              </div>
              <span>Today · 6 tasks</span>
            </div>

            <div className="landing-task-list">
              {tasks.map((task, index) => (
                <motion.div
                  key={task.title}
                  className="landing-task-row"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + index * 0.08, ease: 'easeOut' }}
                >
                  <div className="landing-task-main">
                    <span className={`landing-task-check ${task.done ? 'done' : ''}`}>
                      {task.done && <CircleCheck size={14} />}
                    </span>
                    <span className={task.done ? 'done-text' : ''}>{task.title}</span>
                  </div>
                  <span className="landing-task-priority">{task.priority}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="landing-streak-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75, ease: 'easeOut' }}
          >
            <span>
              <Bell size={20} />
            </span>
            <div>
              <p>Streak: 12 days</p>
              <small>Keep it going!</small>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
