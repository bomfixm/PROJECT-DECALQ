import { site } from '@/data/site'
import s from './Marquee.module.css'

/**
 * Editorial-pace marquee. Very slow, pauses on hover, static under
 * reduced motion. Duplicated content keeps the loop seamless; the copy
 * is exposed once to assistive tech.
 */
export default function Marquee({ text = site.claim, repeat = 4 }) {
  const chunk = Array.from({ length: repeat })

  return (
    <section className={s.wrap} aria-label={text}>
      <div className={s.track} aria-hidden="true">
        {[0, 1].map((group) => (
          <div className={s.group} key={group}>
            {chunk.map((_, i) => (
              <span className={s.item} key={i}>
                {text}
                <span className={s.sep}>—</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
