import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

import { footerColumns } from '@/data/navigation'
import { site } from '@/data/site'
import s from './Footer.module.css'

function FooterLink({ link }) {
  if (link.to) {
    return (
      <Link to={link.to} className={s.link}>
        {link.label}
      </Link>
    )
  }
  return (
    <a
      href={link.href}
      className={s.link}
      {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {link.label}
      {link.external && <ArrowUpRight size={12} strokeWidth={1.6} aria-hidden="true" />}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.top}>
          <Link to="/" className={s.wordmark} aria-label={`${site.name} — início`}>
            {site.wordmark}
          </Link>

          <nav className={s.columns} aria-label="Rodapé">
            {footerColumns.map((col) => (
              <div className={s.col} key={col.title}>
                <p className={s.colTitle}>{col.title}</p>
                <ul className={s.colList}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={s.bottom}>
          <p>
            {site.wordmark} © {site.year}
          </p>
          <p className={s.mid}>{site.country}</p>
          <p className={s.tagline}>{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
