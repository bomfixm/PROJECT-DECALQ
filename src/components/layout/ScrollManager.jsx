import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { scrollToTarget } from '@/lib/lenis'
import { useUIStore } from '@/store/useUIStore'

/**
 * On every route change: close overlays and jump to the top.
 * Honours in-page hash links (#entregas) by scrolling to the anchor instead.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const closeAll = useUIStore((st) => st.closeAll)

  useEffect(() => {
    closeAll()

    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => scrollToTarget(el, { offset: -80 }))
        return
      }
    }
    scrollToTarget(0, { immediate: true })
  }, [pathname, hash, closeAll])

  return null
}
