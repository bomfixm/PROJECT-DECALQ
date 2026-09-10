import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import s from './ProductGrid.module.css'

export default function ProductGrid({ products, priorityCount = 0 }) {
  const reduced = usePrefersReducedMotion()

  return (
    <ul className={s.grid}>
      {products.map((product, i) => (
        <motion.li
          key={product.id}
          className={s.cell}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '0px 0px -6% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.05 }}
        >
          <ProductCard product={product} priority={i < priorityCount} />
        </motion.li>
      ))}
    </ul>
  )
}
