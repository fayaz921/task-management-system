import { motion } from 'framer-motion'
import { ListTodo, ShieldCheck, Sparkles } from 'lucide-react'

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
    icon: ListTodo,
    title: 'Smart Task Organization',
    description: 'Group tasks into projects, add labels and let TaskFlow surface what to do next based on context.',
  },
  {
    icon: Sparkles,
    title: 'Priority & Status Tracking',
    description: 'Drag-and-drop boards, due dates and priority levels keep your most important work front and center.',
  },
  {
    icon: ShieldCheck,
    title: 'Team & Admin Management',
    description: 'Granular roles for admins and members, with full visibility into team workload and progress.',
  },
]

export default function Features() {
  return (
    <section id="features" className="landing-features">
      <div className="landing-container">
        <motion.div
          className="landing-section-heading"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.p variants={fadeUp}>Features</motion.p>
          <motion.h2 variants={fadeUp}>Everything you need. Nothing you don't.</motion.h2>
          <motion.span variants={fadeUp}>
            Built for individuals and teams who value clarity, speed and a beautiful workspace.
          </motion.span>
        </motion.div>

        <motion.div
          className="landing-feature-grid"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <motion.article key={feature.title} className="landing-feature-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <div className="landing-feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
