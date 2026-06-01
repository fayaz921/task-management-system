import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Shield, Zap, Award, Quote } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const benefits = [
  { icon: Zap, title: 'Lightning Fast', description: 'Built for speed. Real-time sync across all devices keeps your team moving at full velocity.' },
  { icon: Shield, title: 'Enterprise Security', description: 'Bank-level encryption, SOC 2 compliance, and granular permissions protect your data.' },
  { icon: Users, title: 'Team Collaboration', description: 'Shared workspaces, comments, and @mentions keep everyone aligned and accountable.' },
  { icon: Award, title: 'Proven Track Record', description: 'Trusted by over 50,000 teams worldwide with 99.99% uptime over the last year.' },
]

const comparison = [
  { feature: 'Real-time sync', taskflow: true, others: false },
  { feature: 'Offline access', taskflow: true, others: true },
  { feature: 'Advanced permissions', taskflow: true, others: false },
  { feature: 'AI task suggestions', taskflow: true, others: false },
  { feature: 'Custom workflows', taskflow: true, others: true },
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Product Lead, Acme Corp', text: 'TaskFlow transformed how our team works. We ship features 40% faster.' },
  { name: 'David Kim', role: 'Engineering Manager, TechStart', text: 'The best task management tool we have used. Clean, fast, and reliable.' },
  { name: 'Maria Rodriguez', role: 'Design Director, CreativeCo', text: 'Finally a tool that our whole team actually enjoys using every day.' },
]

export default function WhyUsPage() {
  return (
    <>
      <section className="landing-hero">
        <div className="landing-hero-glow" aria-hidden="true" />
        <div className="landing-container landing-hero-grid">
          <motion.div variants={stagger} initial="hidden" animate="show" className="landing-hero-copy">
            <motion.div variants={fadeUp} className="landing-pill">
              <span />
              Why choose TaskFlow
            </motion.div>
            <motion.h1 variants={fadeUp} className="landing-title">
              Built for <span>modern teams</span> who move fast
            </motion.h1>
            <motion.p variants={fadeUp} className="landing-subtitle">
              TaskFlow combines elegant design with powerful features to help your team stay organized, aligned, and productive.
            </motion.p>
            <motion.div variants={fadeUp} className="landing-hero-actions">
              <Link to="/register" className="landing-primary-btn">
                Get Started Free
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-container">
          <motion.div className="landing-section-heading" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp}>Benefits</motion.p>
            <motion.h2 variants={fadeUp}>Everything you need to succeed</motion.h2>
          </motion.div>
          <motion.div className="landing-feature-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <motion.article key={benefit.title} className="landing-feature-card" variants={fadeUp} whileHover={{ y: -4 }}>
                  <div className="landing-feature-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="landing-stats pt-5 pb-5">
        <div className="landing-container">
          <motion.div className="landing-section-heading" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp}>Comparison</motion.p>
            <motion.h2 variants={fadeUp}>TaskFlow vs. the rest</motion.h2>
            <motion.p variants={fadeUp}>See why teams prefer TaskFlow</motion.p>
          </motion.div>
          <motion.div className="p-4" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <table className="table" style={{ background: 'var(--card)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-center">TaskFlow</th>
                  <th className="text-center">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item) => (
                  <tr key={item.feature}>
                    <td>{item.feature}</td>
                    <td className="text-center">
                      {item.taskflow ? <CheckCircle size={20} className="text-success" /> : <span className="text-muted">—</span>}
                    </td>
                    <td className="text-center">
                      {item.others ? <CheckCircle size={20} className="text-success" /> : <span className="text-muted">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="landing-features">
        <div className="landing-container">
          <motion.div className="landing-section-heading" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp}>Testimonials</motion.p>
            <motion.h2 variants={fadeUp}>Loved by teams worldwide</motion.h2>
          </motion.div>
          <motion.div className="landing-feature-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {testimonials.map((testimonial) => (
              <motion.article key={testimonial.name} className="landing-feature-card" variants={fadeUp}>
                <Quote size={24} className="text-primary mb-3" />
                <p className="mb-3">"{testimonial.text}"</p>
                <div>
                  <strong>{testimonial.name}</strong>
                  <br />
                  <small className="text-muted">{testimonial.role}</small>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="cta" className="landing-cta-section">
        <div className="landing-container">
          <motion.div className="landing-cta-card" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="landing-cta-pattern" aria-hidden="true" />
            <div className="landing-cta-content">
              <Users size={40} />
              <h2>Join thousands of productive teams</h2>
              <p>Start your free trial today. No credit card required.</p>
              <Link to="/register" className="landing-cta-button">
                Create your free account
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
