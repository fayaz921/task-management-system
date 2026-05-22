import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const stats = [
  { number: '50K+', label: 'Active users' },
  { number: '12M+', label: 'Tasks completed' },
  { number: '99.99%', label: 'Uptime' },
  { number: '24/7', label: 'Support' },
]

export default function Stats() {
  return (
    <section className="section-pad stats-section">
      <div className="container">
        <motion.div
          className="row g-4 text-center"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="col-6 col-md-3" variants={fadeUp}>
              <div className="stat-number gradient-text mb-1">{stat.number}</div>
              <div style={{ color: 'var(--muted-foreground)', fontWeight: 500, fontSize: '0.9rem' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
