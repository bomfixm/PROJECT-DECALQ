import { useSearchParams } from 'react-router-dom'

import ProductGrid from '@/components/product/ProductGrid'
import Reveal from '@/components/ui/Reveal'
import { filterProducts } from '@/data/products'
import s from './Shop.module.css'

const FILTERS = [
  { key: 'todos', label: 'Tudo' },
  { key: 'novidades', label: 'Novidades' },
  { key: 'camisetas', label: 'Camisetas' },
  { key: 'acessorios', label: 'Acessórios' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = FILTERS.some((f) => f.key === params.get('cat')) ? params.get('cat') : 'todos'
  const list = filterProducts({ cat })

  const setCat = (key) => {
    const next = new URLSearchParams(params)
    if (key === 'todos') next.delete('cat')
    else next.set('cat', key)
    setParams(next, { replace: true })
  }

  return (
    <div className="page">
      <div className={`container page-lead ${s.head}`}>
        <Reveal>
          <p className={s.tag}>Shop</p>
          <h1 className={s.title}>
            {FILTERS.find((f) => f.key === cat)?.label ?? 'Tudo'}
          </h1>
        </Reveal>

        <div className={s.bar}>
          <div className={s.filters} role="tablist" aria-label="Filtrar por categoria">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={cat === f.key}
                className={`${s.filter} ${cat === f.key ? s.filterActive : ''}`}
                onClick={() => setCat(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className={`${s.count} u-tabular`}>
            {list.length} {list.length === 1 ? 'peça' : 'peças'}
          </p>
        </div>
      </div>

      <div className="container section--tight">
        {list.length > 0 ? (
          <ProductGrid key={cat} products={list} priorityCount={8} />
        ) : (
          <p className={s.empty}>Nada nessa categoria ainda. Volta logo.</p>
        )}
      </div>
    </div>
  )
}
