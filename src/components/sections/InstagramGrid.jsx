import { ArrowUpRight } from 'lucide-react'

import { instagramFeed } from '@/data/site'
import s from './InstagramGrid.module.css'

const IG_URL = 'https://instagram.com'

export default function InstagramGrid() {
  return (
    <div className={s.wrap}>
      <div className={s.head}>
        <a href={IG_URL} target="_blank" rel="noreferrer" className={s.handle}>
          @decalq
        </a>
        <a href={IG_URL} target="_blank" rel="noreferrer" className={s.follow}>
          Seguir
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>

      <ul className={s.rail}>
        {instagramFeed.slice(0, 5).map((post) => (
          <li key={post.id} className={s.cell}>
            <a href={IG_URL} target="_blank" rel="noreferrer" className={s.link}>
              <img
                src={post.src}
                alt={post.alt}
                className={s.img}
                loading="lazy"
                decoding="async"
              />
              <span className={s.overlay} aria-hidden="true">
                View on Instagram
                <ArrowUpRight size={13} strokeWidth={1.7} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
