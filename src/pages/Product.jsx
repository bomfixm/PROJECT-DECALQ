import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

import ProductGrid from '@/components/product/ProductGrid'
import SizePicker from '@/components/product/SizePicker'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import { getProductBySlug, getRelated } from '@/data/products'
import { useCartStore } from '@/store/useCartStore'
import { formatBRL, installments } from '@/utils/format'
import s from './Product.module.css'

function Disclosure({ title, children, defaultOpen = false, id }) {
  return (
    <details className={s.disc} id={id} {...(defaultOpen ? { open: true } : {})}>
      <summary className={s.discSummary}>
        <span>{title}</span>
        <ChevronDown size={16} strokeWidth={1.6} aria-hidden="true" />
      </summary>
      <div className={s.discBody}>{children}</div>
    </details>
  )
}

export default function Product() {
  const { slug } = useParams()
  const product = useMemo(() => getProductBySlug(slug), [slug])
  const add = useCartStore((st) => st.add)

  const single = product && product.sizes.length === 1
  const [size, setSize] = useState(single ? product.sizes[0] : '')
  const [error, setError] = useState('')

  if (!product) {
    return (
      <div className="page">
        <div className="container page-lead">
          <p className={s.tag}>404</p>
          <h1 className={s.notFound}>Essa peça saiu de circulação.</h1>
          <Link to="/shop" className={s.backLink}>
            Voltar ao shop
          </Link>
        </div>
      </div>
    )
  }

  const related = getRelated(product, 4)

  const onAdd = () => {
    if (!size) {
      setError('Escolhe um tamanho primeiro.')
      return
    }
    setError('')
    add(product, size, 1)
  }

  const openGuide = () => {
    const el = document.getElementById('guia-medidas')
    if (el) {
      el.open = true
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  return (
    <div className="page">
      <div className={`container ${s.wrap}`}>
        <nav className={s.crumbs} aria-label="Trilha">
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?cat=${product.category}`}>{product.categoryLabel}</Link>
        </nav>

        <div className={s.layout}>
          <div className={s.gallery}>
            {product.images.map((src, i) => (
              <div className={s.shot} key={src}>
                <img
                  src={src}
                  alt={`${product.name} — vista ${i + 1}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>

          <div className={s.info}>
            <div className={s.infoInner}>
              <p className={s.category}>{product.categoryLabel}</p>
              <h1 className={s.name}>{product.name}</h1>

              <div className={s.priceBlock}>
                <p className={`${s.price} u-tabular`}>{formatBRL(product.price)}</p>
                <p className={s.installments}>ou {installments(product.price)}</p>
              </div>

              <p className={s.desc}>{product.description}</p>

              <div className={s.buy}>
                <SizePicker
                  sizes={product.sizes}
                  value={size}
                  onChange={(v) => {
                    setSize(v)
                    setError('')
                  }}
                  error={error}
                  onOpenGuide={single ? undefined : openGuide}
                />

                <button type="button" className={s.addBtn} onClick={onAdd}>
                  Adicionar ao carrinho
                </button>

                <p className={s.meta}>
                  Cor: {product.colorway} · Envio em 2–5 dias úteis
                </p>
              </div>

              <div className={s.discList}>
                <Disclosure title="Detalhes" defaultOpen>
                  <ul className={s.details}>
                    {product.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </Disclosure>
                <Disclosure title="Guia de medidas" id="guia-medidas">
                  <p>
                    Modelagem {single ? 'única' : 'oversized'}. Em caso de dúvida entre dois
                    tamanhos, fique com o menor para um caimento mais justo. Medidas exatas
                    (tórax / comprimento) chegam junto com as fotos reais.
                  </p>
                </Disclosure>
                <Disclosure title="Envio e trocas">
                  <p>
                    Enviamos para todo o Brasil em 2–5 dias úteis após a confirmação. Trocas
                    e devoluções em até 30 dias, com a etiqueta original. Frete grátis acima
                    de {formatBRL(299)}.
                  </p>
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className={`container section ${s.related}`}>
        <SectionHeading tag="Combina com" title="Você também vai querer" as="h2" />
        <ProductGrid products={related} />
      </section>
    </div>
  )
}
