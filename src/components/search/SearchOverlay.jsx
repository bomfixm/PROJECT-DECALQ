import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'

import { filterProducts } from '@/data/products'
import { useUIStore } from '@/store/useUIStore'
import { useLockScroll } from '@/hooks/useLockScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { formatBRL } from '@/utils/format'
import s from './SearchOverlay.module.css'

const SUGGESTIONS = ['Camisetas', 'Bonés', 'Novidades', 'Preto']
const EASE = [0.76, 0, 0.24, 1]

export default function SearchOverlay() {
  const open = useUIStore((st) => st.searchOpen)
  const close = useUIStore((st) => st.closeSearch)
  const reduced = usePrefersReducedMotion()

  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const restoreRef = useRef(null)

  useLockScroll(open)

  useEffect(() => {
    if (!open) return undefined
    restoreRef.current = document.activeElement
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      restoreRef.current?.focus?.()
    }
  }, [open, close])

  const results = useMemo(
    () => (query.trim() ? filterProducts({ query }) : []),
    [query],
  )
  const trimmed = query.trim()

  const panel = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { clipPath: 'inset(0 0 100% 0)' },
        animate: { clipPath: 'inset(0 0 0% 0)' },
        exit: { clipPath: 'inset(0 0 100% 0)' },
      }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={s.overlay}
          {...panel}
          transition={{ duration: 0.55, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Buscar produtos"
        >
          <div className={s.bar}>
            <span className={s.tag}>Buscar</span>
            <button type="button" className={s.close} onClick={close} aria-label="Fechar busca">
              <X size={22} strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>

          <div className={s.inner}>
            <div className={s.field}>
              <Search size={22} strokeWidth={1.4} aria-hidden="true" className={s.fieldIcon} />
              <input
                ref={inputRef}
                type="search"
                className={s.input}
                placeholder="O QUE VOCÊ PROCURA?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="O que você procura?"
              />
              {query && (
                <button
                  type="button"
                  className={s.clear}
                  onClick={() => {
                    setQuery('')
                    inputRef.current?.focus()
                  }}
                >
                  Limpar
                </button>
              )}
            </div>

            {!trimmed && (
              <div className={s.suggest}>
                <span className={s.suggestLabel}>Sugestões</span>
                <div className={s.chips}>
                  {SUGGESTIONS.map((term) => (
                    <button
                      key={term}
                      type="button"
                      className={s.chip}
                      onClick={() => setQuery(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {trimmed && (
              <div className={s.results}>
                <p className={s.count} aria-live="polite">
                  {results.length === 0
                    ? 'Nada encontrado'
                    : `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}`}
                </p>

                {results.length > 0 && (
                  <ul className={s.grid}>
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link
                          to={`/produto/${product.slug}`}
                          className={s.result}
                          onClick={close}
                        >
                          <div className={s.resultMedia}>
                            <img src={product.images[0]} alt="" aria-hidden="true" loading="lazy" />
                          </div>
                          <div className={s.resultMeta}>
                            <span className={s.resultName}>{product.name}</span>
                            <span className={`${s.resultPrice} u-tabular`}>
                              {formatBRL(product.price)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
