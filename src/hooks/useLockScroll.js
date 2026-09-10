import { useEffect } from 'react'
import { getLenis } from '@/lib/lenis'

let lockCount = 0

/**
 * Lock page scrolling while `active` is true (menu / drawer / search open).
 * Pauses Lenis, freezes the body, and compensates for the scrollbar width so
 * the layout doesn't jump. Reference-counted for nested/overlapping overlays.
 */
export function useLockScroll(active) {
  useEffect(() => {
    if (!active) return undefined

    lockCount += 1
    const { body, documentElement: html } = document

    if (lockCount === 1) {
      const scrollbar = window.innerWidth - html.clientWidth
      body.dataset.scrollLocked = 'true'
      body.style.overflow = 'hidden'
      if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`
      getLenis()?.stop()
    }

    return () => {
      lockCount -= 1
      if (lockCount === 0) {
        delete body.dataset.scrollLocked
        body.style.overflow = ''
        body.style.paddingRight = ''
        getLenis()?.start()
      }
    }
  }, [active])
}
