import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import s from './SectionHeading.module.css'

/**
 * Editorial section header: small tag on top, oversized title, optional link.
 */
export default function SectionHeading({ tag, title, link, as = 'h2', align = 'left' }) {
  const Title = as
  return (
    <Reveal className={`${s.wrap} ${s[align]}`}>
      <div className={s.row}>
        <div className={s.text}>
          {tag && <span className={s.tag}>{tag}</span>}
          <Title className={s.title}>{title}</Title>
        </div>
        {link && (
          <Link to={link.to} className={s.link}>
            <span>{link.label}</span>
            <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        )}
      </div>
    </Reveal>
  )
}
