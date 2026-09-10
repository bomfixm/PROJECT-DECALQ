import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

import { useUIStore } from '@/store/useUIStore'
import { useCartStore, selectCount, selectSubtotal } from '@/store/useCartStore'
import { useLockScroll } from '@/hooks/useLockScroll'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { formatBRL } from '@/utils/format'
import QuantityStepper from '@/components/ui/QuantityStepper'
import s from './CartDrawer.module.css'

const EASE = [0.76, 0, 0.24, 1]

export default function CartDrawer() {
  const open = useUIStore((st) => st.cartOpen)
  const close = useUIStore((st) => st.closeCart)
  const reduced = usePrefersReducedMotion()

  const items = useCartStore((st) => st.items)
  const count = useCartStore(selectCount)
  const subtotal = useCartStore(selectSubtotal)
  const increment = useCartStore((st) => st.increment)
  const decrement = useCartStore((st) => st.decrement)
  const remove = useCartStore((st) => st.remove)

  const [notice, setNotice] = useState(false)

  useLockScroll(open)

  useEffect(() => {
    if (!open) return undefined
    setNotice(false)
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  const panelMotion = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } }

  return (
    <AnimatePresence>
      {open && (
        <div className={s.root}>
          <motion.div
            className={s.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          />

          <motion.aside
            className={s.panel}
            {...panelMotion}
            transition={{ duration: 0.5, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho"
          >
            <header className={s.head}>
              <h2 className={s.title}>
                Carrinho <span className="u-tabular">({count})</span>
              </h2>
              <button type="button" className={s.close} onClick={close} aria-label="Fechar carrinho">
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className={s.empty}>
                <p className={s.emptyTitle}>Seu carrinho está vazio.</p>
                <p className={s.emptyText}>Ainda dá tempo de entrar no drop.</p>
                <Link to="/shop" className={s.emptyLink} onClick={close}>
                  Ver o shop
                  <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <>
                <ul className={s.list} data-lenis-prevent>
                  {items.map((item) => (
                    <li className={s.item} key={item.id}>
                      <Link to={`/produto/${item.slug}`} className={s.thumb} onClick={close}>
                        <img src={item.image} alt="" aria-hidden="true" loading="lazy" />
                      </Link>

                      <div className={s.body}>
                        <div className={s.rowTop}>
                          <Link
                            to={`/produto/${item.slug}`}
                            className={s.name}
                            onClick={close}
                          >
                            {item.name}
                          </Link>
                          <button
                            type="button"
                            className={s.remove}
                            onClick={() => remove(item.id)}
                            aria-label={`Remover ${item.name}`}
                          >
                            <X size={14} strokeWidth={1.6} aria-hidden="true" />
                          </button>
                        </div>

                        <p className={s.attr}>Tam. {item.size}</p>

                        <div className={s.rowBottom}>
                          <QuantityStepper
                            value={item.qty}
                            onDecrement={() => decrement(item.id)}
                            onIncrement={() => increment(item.id)}
                          />
                          <span className={`${s.linePrice} u-tabular`}>
                            {formatBRL(item.price * item.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className={s.foot}>
                  <div className={s.subtotal}>
                    <span>Subtotal</span>
                    <span className="u-tabular">{formatBRL(subtotal)}</span>
                  </div>
                  <p className={s.note}>Frete e impostos calculados no checkout.</p>
                  <button
                    type="button"
                    className={s.checkout}
                    onClick={() => setNotice(true)}
                  >
                    <span>Finalizar compra</span>
                    <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                  </button>
                  {notice && (
                    <p className={s.mock} role="status">
                      Checkout é apenas visual nesta versão — pagamento não integrado.
                    </p>
                  )}
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
