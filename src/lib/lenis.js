/**
 * Tiny module-level holder for the active Lenis instance so non-React code
 * (route change handlers, anchor links, scroll locks) can reach it.
 */
let current = null

export function setLenis(instance) {
  current = instance
}

export function getLenis() {
  return current
}

/** Smoothly scroll to an element / offset, falling back to the native API. */
export function scrollToTarget(target, options = {}) {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.1, ...options })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' })
  } else if (target instanceof Element) {
    target.scrollIntoView({ behavior: options.immediate ? 'auto' : 'smooth' })
  }
}
