import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { editorial } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import s from './EditorialBanner.module.css'

export default function EditorialBanner() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section className={s.banner} ref={ref} aria-label="Campanha">
      <div className={s.frame}>
        <motion.img
          src={editorial.image}
          alt={editorial.alt}
          className={s.img}
          style={reduced ? undefined : { y }}
          loading="lazy"
          decoding="async"
        />
        <div className={s.scrim} aria-hidden="true" />
      </div>

      <div className={s.content}>
        <motion.p
          className={s.overline}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {editorial.overline}
        </motion.p>
        <motion.h2
          className={s.headline}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
        >
          {editorial.headline}
        </motion.h2>
        <p className={s.caption}>{editorial.caption}</p>
      </div>
    </section>
  )
}
