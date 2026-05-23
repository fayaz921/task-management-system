import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, LayoutDashboard } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function CTA() {
  return (
    <section id="cta" className="landing-cta-section">
      <div className="landing-container">
        <motion.div
          className="landing-cta-card"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="landing-cta-pattern" aria-hidden="true" />
          <div className="landing-cta-content">
            <LayoutDashboard size={40} />
            <h2>Take control of your day.</h2>
            <p>Join thousands of teams using TaskFlow to plan, execute and celebrate the work that matters.</p>
            <Link to="/register" className="landing-cta-button">
              Create your free account
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
