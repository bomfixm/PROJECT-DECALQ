import { useEffect } from 'react'
import Lenis from 'lenis'

import { setLenis } from '@/lib/lenis'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Professional smooth scrolling.
 *
 * The wheel input maps to scroll immediately, then a short ease trails it and
 * decelerates — responsive, never floaty. Disabled entirely when the user
 * asks for reduced motion (native scroll takes over).
 */
export default function SmoothScroll({ children }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.05,
      // expo-out: quick pickup, gentle settle
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: false,
    })

    setLenis(lenis)

    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return children
}
