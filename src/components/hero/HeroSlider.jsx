import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import Button from '@/components/ui/Button'
import { heroSlides, site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import s from './HeroSlider.module.css'

const EASE = [0.76, 0, 0.24, 1]
const INTERVAL = 6200
const DURATION = 1.15

/* Parent layer — carries the horizontal slide + speed */
const slideVariants = {
  enter: (dir) => ({ x: dir >= 0 ? '100%' : '-100%' }),
  center: {
    x: '0%',
    transition: { x: { duration: DURATION, ease: EASE } },
  },
  exit: (dir) => ({
    x: dir >= 0 ? '-100%' : '100%',
    transition: { x: { duration: DURATION, ease: EASE } },
  }),
}

export default function HeroSlider() {
  const reduced = usePrefersReducedMotion()
  const [[index, direction], setPage] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const count = heroSlides.length
  const touch = useRef(null)

  const paginate = useCallback(
    (dir) => setPage(([i]) => [(i + dir + count) % count, dir]),
    [count],
  )
  const goTo = useCallback((target) => setPage(([i]) => [target, target >= i ? 1 : -1]), [])

  // autoplay
  useEffect(() => {
    if (paused || count < 2) return undefined
    const id = setTimeout(() => paginate(1), reduced ? INTERVAL * 1.4 : INTERVAL)
    return () => clearTimeout(id)
  }, [index, paused, reduced, paginate, count])

  // pause when the tab is hidden
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const dx = e.changedTouches[0].clientX - touch.current.x
    const dy = e.changedTouches[0].clientY - touch.current.y
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) paginate(dx < 0 ? 1 : -1)
    touch.current = null
  }

  const active = heroSlides[index]

  return (
    <section
      className={s.hero}
      data-paused={paused || reduced}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carrossel"
      aria-label="Campanha DECALQ"
    >
      <div className={s.viewport}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active.id}
            className={s.slide}
            custom={direction}
            variants={reduced ? undefined : slideVariants}
            initial={reduced ? { opacity: 0 } : 'enter'}
            animate={reduced ? { opacity: 1 } : 'center'}
            exit={reduced ? { opacity: 0 } : 'exit'}
            transition={reduced ? { duration: 0.4 } : undefined}
          >
            <motion.img
              src={active.src}
              alt={active.alt}
              className={s.img}
              draggable="false"
              loading={index === 0 ? 'eager' : 'lazy'}
              initial={reduced ? false : { filter: 'blur(14px)', scale: 1.06 }}
              animate={
                reduced
                  ? {}
                  : {
                      filter: 'blur(0px)',
                      scale: 1,
                      transition: { duration: DURATION, ease: EASE },
                    }
              }
              exit={
                reduced
                  ? {}
                  : {
                      filter: 'blur(16px)',
                      scale: 1.03,
                      transition: { duration: DURATION, ease: EASE },
                    }
              }
            />
          </motion.div>
        </AnimatePresence>

        <div className={s.scrim} aria-hidden="true" />
      </div>

      <div className={s.content}>
        <p className={s.kicker}>
          <span>{site.wordmark}</span>
          <span className={s.dot} aria-hidden="true" />
          <span>New Drop</span>
        </p>
        <h1 className={s.headline}>{site.claim}</h1>
        <Button to="/shop" size="lg" className={s.cta}>
          Shop now
        </Button>
      </div>

      <div className={s.indicators} role="tablist" aria-label="Selecionar imagem">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Imagem ${i + 1} de ${count}`}
            className={`${s.indicator} ${i === index ? s.indicatorActive : ''}`}
            onClick={() => goTo(i)}
          >
            <span className="u-tabular">{String(i + 1).padStart(2, '0')}</span>
            <span className={s.track} aria-hidden="true">
              <span className={s.fill} data-run={i === index} />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
