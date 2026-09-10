import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Fast page-level micro-transition: fade + a few px of vertical travel.
 * Kept short so navigation still feels instant.
 */
export default function PageTransition({ children }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.main
      className="app-main"
      id="conteudo"
      initial={{ opacity: 0, y: reduced ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -6 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  )
}
