import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

export default function CTA() {
  return (
    <section className="section-pad">
      <div className="container">
        <motion.div
          className="cta-section text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: '1rem' }}>
            Ready to bring focus to your work?
          </motion.h2>
          <motion.p variants={fadeUp} style={{ opacity: 0.85, maxWidth: 480, margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Join thousands of teams already using TaskFlow to plan, track, and ship their best work.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/register">
              <motion.button className="btn btn-white btn-lg px-5" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                Create your free account
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
