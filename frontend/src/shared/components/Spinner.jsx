import { motion } from 'framer-motion'

export default function Spinner({ size = 24 }) {
  return (
    <motion.div
      className="spinner-border text-primary"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}