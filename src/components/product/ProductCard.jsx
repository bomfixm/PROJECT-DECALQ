import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { formatBRL } from '@/utils/format'
import s from './ProductCard.module.css'

/**
 * The photograph is the card. Second image swaps in on hover; a small
 * "ver produto" chip trails the cursor inside the media (pointer devices only).
 */
export default function ProductCard({ product, priority = false }) {
  const mediaRef = useRef(null)
  const hasSecond = product.images.length > 1

  const onMove = (e) => {
    const el = mediaRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <article className={s.card}>
      <Link to={`/produto/${product.slug}`} className={s.link}>
        <div
          className={`${s.media} ${hasSecond ? '' : s.single}`}
          ref={mediaRef}
          onMouseMove={onMove}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className={`${s.img} ${s.imgPrimary}`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
          {hasSecond && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              className={`${s.img} ${s.imgSecondary}`}
              loading="lazy"
              decoding="async"
            />
          )}

          {product.isNew && <span className={s.flag}>Novo</span>}

          <span className={s.chip} aria-hidden="true">
            Ver produto
            <ArrowRight size={13} strokeWidth={1.7} />
          </span>
        </div>

        <div className={s.meta}>
          <h3 className={s.name}>{product.name}</h3>
          <p className={`${s.price} u-tabular`}>{formatBRL(product.price)}</p>
        </div>
      </Link>
    </article>
  )
}
