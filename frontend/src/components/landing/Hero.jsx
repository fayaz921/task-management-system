import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Bell } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const mockTasks = [
  { title: 'Finalize Q3 product roadmap', checked: true, tag: 'HIGH', bg: 'rgba(109, 76, 255, 0.08)', color: 'var(--primary)' },
  { title: 'Design review with the brand team', checked: false, tag: 'MED', bg: 'rgba(56, 189, 248, 0.08)', color: 'var(--accent)' },
  { title: 'Ship onboarding email sequence', checked: false, tag: 'HIGH', bg: 'rgba(109, 76, 255, 0.08)', color: 'var(--primary)' },
  { title: '1:1 with Priya', checked: false, tag: 'LOW', bg: 'rgba(107, 114, 128, 0.08)', color: 'var(--muted-foreground)' },
]

export default function Hero() {
  return (
    <section
      className="position-relative overflow-hidden d-flex align-items-center"
      style={{
        background: 'linear-gradient(180deg, #f0f4ff 0%, #fafbff 100%)',
        padding: '8.5rem 0 6rem',
        minHeight: '94vh',
      }}
    >
      {/* Background ambient radial glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109, 76, 255, 0.09), transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08), transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)',
        }}
      />

      <div className="container position-relative">
        <div className="row align-items-center g-5">
          {/* Left Column */}
          <div className="col-lg-6">
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-start">
              {/* Feature Pill */}
              <motion.div variants={fadeUp} className="mb-4">
                <span
                  className="d-inline-flex align-items-center gap-2"
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    background: '#fff',
                    border: '1.5px solid var(--border)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      display: 'inline-block',
                    }}
                  />
                  New · Team workspaces are here
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeUp}
                className="fw-black mb-4"
                style={{
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  color: 'var(--foreground)',
                }}
              >
                Plan your day.<br />
                <span className="gradient-text">Ship your week.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUp}
                className="mb-4"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: 'clamp(0.98rem, 1.5vw, 1.12rem)',
                  lineHeight: 1.6,
                  maxWidth: '520px',
                }}
              >
                TaskFlow brings calm focus to chaotic workdays. Organize tasks, track priorities, and ship together — all in one place.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={fadeUp} className="d-flex flex-wrap gap-3 mb-4">
                <Link to="/register">
                  <motion.button
                    className="btn btn-gradient d-flex align-items-center gap-2 px-4 py-3"
                    style={{
                      fontSize: '0.96rem',
                      borderRadius: '12px',
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started Free <ArrowRight size={16} />
                  </motion.button>
                </Link>

                <Link to="/login">
                  <motion.button
                    className="btn px-4 py-3"
                    style={{
                      background: '#fff',
                      border: '1.5px solid var(--border)',
                      borderRadius: '12px',
                      color: 'var(--foreground)',
                      fontWeight: 600,
                      fontSize: '0.96rem',
                      boxShadow: 'var(--shadow-soft)',
                    }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>
                </Link>
              </motion.div>

              {/* Checklist Row */}
              <motion.div variants={fadeUp} className="d-flex align-items-center gap-4">
                <span className="d-flex align-items-center gap-1.5" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--accent)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  Free forever plan
                </span>

                <span className="d-flex align-items-center gap-1.5" style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--muted-foreground)' }}>
                  <span
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--accent)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  No credit card
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column — Beautiful MacOS Dashboard Mockup */}
          <div className="col-lg-6 d-none d-lg-block">
            <div className="position-relative">
              {/* Window Card */}
              <motion.div
                className="glass p-4"
                style={{
                  borderRadius: '24px',
                  boxShadow: '0 20px 50px -12px rgba(20, 19, 43, 0.08)',
                  border: '1.5px solid rgba(255, 255, 255, 0.8)',
                  background: 'rgba(255, 255, 255, 0.72)',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              >
                {/* Window Controls */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-center gap-1.5">
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>Today · 6 tasks</span>
                </div>

                {/* Task Items */}
                <div className="d-flex flex-column gap-3">
                  {mockTasks.map((task, i) => (
                    <motion.div
                      key={task.title}
                      className="d-flex align-items-center justify-content-between p-3"
                      style={{
                        background: '#fff',
                        border: '1px solid var(--border)',
                        borderRadius: '14px',
                        boxShadow: '0 4px 12px -4px rgba(20,19,43,0.02)',
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: task.checked ? 'none' : '2px solid var(--border)',
                            background: task.checked ? 'var(--primary)' : 'transparent',
                            display: 'grid',
                            placeItems: 'center',
                            color: '#fff',
                          }}
                        >
                          {task.checked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span
                          style={{
                            fontWeight: 500,
                            fontSize: '0.88rem',
                            color: task.checked ? 'var(--muted-foreground)' : 'var(--foreground)',
                            textDecoration: task.checked ? 'line-through' : 'none',
                          }}
                        >
                          {task.title}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                          background: task.bg,
                          color: task.color,
                        }}
                      >
                        {task.tag}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Streak Badge overlay */}
              <motion.div
                className="d-flex align-items-center gap-3 px-3 py-2.5"
                style={{
                  position: 'absolute',
                  bottom: '-24px',
                  left: '-24px',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(109, 76, 255, 0.12)',
                  zIndex: 2,
                }}
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'rgba(109, 76, 255, 0.08)',
                    color: 'var(--primary)',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Bell size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--foreground)', lineHeight: 1.2 }}>Streak: 12 days</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted-foreground)' }}>Keep it going!</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
