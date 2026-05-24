import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals getting started',
    features: ['Up to 10 tasks', 'Basic task organization', 'Due dates', 'Email support'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    description: 'For professionals and growing teams',
    features: ['Unlimited tasks', 'Advanced filtering', 'Team collaboration', 'Priority support', 'AI suggestions', 'Custom workflows'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$29',
    description: 'For large organizations with advanced needs',
    features: ['Everything in Pro', 'SSO & advanced security', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'],
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <>
      <section className="landing-hero">
        <div className="landing-hero-glow" aria-hidden="true" />
        <div className="landing-container landing-hero-grid">
          <motion.div variants={stagger} initial="hidden" animate="show" className="landing-hero-copy">
            <motion.div variants={fadeUp} className="landing-pill">
              <span />
              Simple, transparent pricing
            </motion.div>
            <motion.h1 variants={fadeUp} className="landing-title">
              Choose your <span>perfect plan</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="landing-subtitle">
              Start free forever. Upgrade anytime. All plans include our core features.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-container">
          <motion.div className="landing-section-heading" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp}>Pricing</motion.p>
            <motion.h2 variants={fadeUp}>Plans for every team size</motion.h2>
            <motion.span variants={fadeUp}>
              All plans come with a 14-day free trial. No credit card required.
            </motion.span>
          </motion.div>

          <motion.div className="row g-4 justify-content-center" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {pricingPlans.map((plan) => (
              <motion.div key={plan.name} className="col-12 col-md-4" variants={fadeUp}>
                <div className={`tf-card h-100 p-4 d-flex flex-column ${plan.highlighted ? 'border-primary shadow-elegant' : ''}`}>
                  {plan.highlighted && (
                    <div className="text-center mb-3">
                      <span className="badge bg-primary d-inline-flex align-items-center gap-1">
                        <Star size={12} /> Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-center">{plan.name}</h3>
                  <div className="text-center my-3">
                    <strong className="display-4">{plan.price}</strong>
                    <span className="text-muted">/month</span>
                  </div>
                  <p className="text-muted text-center mb-4">{plan.description}</p>
                  <ul className="list-unstyled flex-grow-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="d-flex align-items-center gap-2 mb-2">
                        <Check size={16} className="text-success" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`btn ${plan.highlighted ? 'btn-primary btn-gradient' : 'btn-outline-primary'} w-100 mt-3`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="cta" className="landing-cta-section">
        <div className="landing-container">
          <motion.div className="landing-cta-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="landing-cta-pattern" aria-hidden="true" />
            <div className="landing-cta-content">
              <h2>Ready to boost your productivity?</h2>
              <p>Join thousands of teams using TaskFlow to plan, execute, and celebrate the work that matters.</p>
              <Link to="/register" className="landing-cta-button">
                Start your free trial
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}