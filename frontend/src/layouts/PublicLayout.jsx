import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const orbVariants = {
  float: (delay) => ({
    x: [0, 28, -18, 0],
    y: [0, -22, 24, 0],
    scale: [1, 1.08, 0.96, 1],
    transition: {
      duration: 12,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

export default function PublicLayout({ children }) {
  return (
    <main className="public-layout gradient-bg">
      <motion.div
        className="background-orb"
        custom={0}
        variants={orbVariants}
        animate="float"
        style={{ top: '8%', left: '8%' }}
      />
      <motion.div
        className="background-orb"
        custom={1.2}
        variants={orbVariants}
        animate="float"
        style={{ right: '6%', bottom: '10%', background: 'rgba(139, 92, 246, 0.18)' }}
      />
      <motion.div
        className="position-relative w-100"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children || <Outlet />}
      </motion.div>
    </main>
  )
}
