import { motion } from 'framer-motion'

export default function Spinner() {
  return (
    <motion.div
      className="spinner-border text-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}