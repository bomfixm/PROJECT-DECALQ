import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { categories } from '@/data/products'
import Reveal from '@/components/ui/Reveal'
import s from './Categories.module.css'

export default function Categories() {
  return (
    <ul className={s.list}>
      {categories.map((cat, i) => (
        <Reveal as="li" key={cat.key} delay={i * 0.06} className={s.item}>
          <Link to={cat.to} className={s.link}>
            <div className={s.media}>
              <img
                src={cat.image}
                alt=""
                aria-hidden="true"
                className={s.img}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={s.row}>
              <div className={s.text}>
                <span className={s.index}>{String(i + 1).padStart(2, '0')}</span>
                <h3 className={s.label}>{cat.label}</h3>
                <p className={s.caption}>{cat.caption}</p>
              </div>
              <ArrowUpRight className={s.arrow} size={22} strokeWidth={1.4} aria-hidden="true" />
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}
