import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

const modalMotion = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
}

export default function ConfirmModal({ title, message, onConfirm, onCancel, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />
          <motion.div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded-3 p-4"
            style={{ minWidth: '320px', maxWidth: '480px', zIndex: 1060, boxShadow: '0 20px 60px -20px rgba(20,19,43,0.3)' }}
            {...modalMotion}
          >
            <div className="d-flex align-items-start gap-3 mb-3">
              <AlertCircle size={24} className="text-warning flex-shrink-0" />
              <div>
                <h5 className="mb-1">{title}</h5>
                <p className="text-muted mb-0">{message}</p>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-end">
              <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
              <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}