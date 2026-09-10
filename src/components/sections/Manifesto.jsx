import { motion } from 'framer-motion'

import { manifesto } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import s from './Manifesto.module.css'

/**
 * Words in `statement` roll up line by line — the one place the site
 * lets the typography perform.
 */
export default function Manifesto() {
  const reduced = usePrefersReducedMotion()
  const lines = manifesto.statement.split('. ').map((l, i, arr) => (i < arr.length - 1 ? `${l}.` : l))

  return (
    <section className={`section section--dark ${s.section}`}>
      <div className="container">
        <p className={s.overline}>{manifesto.overline}</p>

        <h2 className={s.statement}>
          {lines.map((line, i) => (
            <span className={s.lineMask} key={i}>
              <motion.span
                className={s.line}
                initial={reduced ? { opacity: 0 } : { y: '110%' }}
                whileInView={reduced ? { opacity: 1 } : { y: '0%' }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className={s.body}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {manifesto.body}
        </motion.p>
      </div>
    </section>
  )
}
