import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const stats = [
  { number: '50k+', label: 'Active users' },
  { number: '12M+', label: 'Tasks completed' },
  { number: '99.99%', label: 'Uptime' },
  { number: '24/7', label: 'Support' },
]

export default function Stats() {
  return (
    <section id="stats" className="landing-stats">
      <motion.div
        className="landing-container landing-stats-grid"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} className="landing-stat" variants={fadeUp}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
