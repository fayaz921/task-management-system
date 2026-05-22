import { motion } from 'framer-motion'
import { CheckSquare, Sparkles, Shield } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const features = [
  {
    icon: CheckSquare,
    title: 'Smart Task Organization',
    description: 'Group tasks into projects, add labels and let TaskFlow surface what to do next based on context.',
  },
  {
    icon: Sparkles,
    title: 'Priority & Status Tracking',
    description: 'Drag-and-drop boards, due dates and priority levels keep your most important work front and center.',
  },
  {
    icon: Shield,
    title: 'Team & Admin Management',
    description: 'Granular roles for admins and members, with full visibility into team workload and progress.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-pad" style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="section-title mb-3">Everything you need to stay focused</h2>
          <p className="section-subtitle" style={{ maxWidth: '540px', marginInline: 'auto' }}>
            Powerful features designed to help you organize, prioritize, and collaborate with ease.
          </p>
        </motion.div>

        <motion.div
          className="row g-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div key={feature.title} className="col-md-4" variants={fadeUp}>
                <motion.div
                  className="tf-card h-100 p-4 p-lg-5"
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '24px',
                    background: '#fff',
                    boxShadow: 'var(--shadow-soft)',
                  }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="feature-icon-box mb-4"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'var(--gradient-hero)',
                      color: '#fff',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.12rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--foreground)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 0 }}>
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
