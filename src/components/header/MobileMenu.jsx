import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

import { mobileNav, social } from '@/data/navigation'
import { site } from '@/data/site'
import { useUIStore } from '@/store/useUIStore'
import { useLockScroll } from '@/hooks/useLockScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import s from './MobileMenu.module.css'

const EASE = [0.76, 0, 0.24, 1]

export default function MobileMenu() {
  const open = useUIStore((st) => st.menuOpen)
  const close = useUIStore((st) => st.closeMenu)
  const reduced = usePrefersReducedMotion()

  useLockScroll(open)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const panel = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: 'inset(0 0 100% 0)' },
        animate: { clipPath: 'inset(0 0 0% 0)' },
        exit: { clipPath: 'inset(100% 0 0 0)' },
      }

  const list = {
    animate: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
  }
  const item = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : {
        initial: { y: '115%' },
        animate: { y: '0%', transition: { duration: 0.6, ease: EASE } },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={s.overlay}
          {...panel}
          transition={{ duration: 0.7, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className={s.top}>
            <Link to="/" className={s.brand} onClick={close}>
              {site.wordmark}
            </Link>
            <button type="button" className={s.close} onClick={close} aria-label="Fechar menu">
              <X size={22} strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>

          <motion.nav className={s.nav} variants={list} initial="initial" animate="animate">
            {mobileNav.map((link) => (
              <span key={link.label} className={s.lineMask}>
                <motion.span variants={item} className={s.lineInner}>
                  <Link to={link.to} className={s.link} onClick={close}>
                    {link.label}
                  </Link>
                </motion.span>
              </span>
            ))}
          </motion.nav>

          <motion.div
            className={s.social}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
          >
            {social.map((item2) => (
              <a
                key={item2.label}
                href={item2.href}
                target="_blank"
                rel="noreferrer"
                className={s.socialLink}
              >
                {item2.label}
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
            <p className={s.claim}>{site.claim}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
