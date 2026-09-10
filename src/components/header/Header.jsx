import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, ShoppingBag, User } from 'lucide-react'

import { primaryNav } from '@/data/navigation'
import { site } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { useUIStore } from '@/store/useUIStore'
import { useCartStore, selectCount } from '@/store/useCartStore'
import s from './Header.module.css'

export default function Header() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const scrolled = useScrolled(40)
  const solid = scrolled || !isHome

  const openMenu = useUIStore((st) => st.openMenu)
  const openSearch = useUIStore((st) => st.openSearch)
  const openCart = useUIStore((st) => st.openCart)
  const count = useCartStore(selectCount)

  // keep <meta theme-color> honest with the header background
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', solid ? '#fbfbfa' : '#141414')
  }, [solid])

  return (
    <header className={`${s.header} ${solid ? s.solid : s.over}`} data-solid={solid}>
      <div className={s.inner}>
        <div className={s.left}>
          <button
            type="button"
            className={`${s.iconBtn} ${s.menuBtn}`}
            onClick={openMenu}
            aria-label="Abrir menu"
          >
            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>

          <Link to="/" className={s.brand} aria-label={`${site.name} — início`}>
            {site.wordmark}
          </Link>
        </div>

        <nav className={s.nav} aria-label="Navegação principal">
          {primaryNav.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                [s.navLink, isActive && item.to === '/shop' ? s.active : ''].join(' ')
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={s.actions}>
          <button type="button" className={s.textBtn} onClick={openSearch}>
            <Search size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className={s.actionLabel}>Buscar</span>
          </button>

          <Link to="/conta" className={s.textBtn}>
            <User size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className={s.actionLabel}>Conta</span>
          </Link>

          <button type="button" className={s.textBtn} onClick={openCart} aria-label={`Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}`}>
            <ShoppingBag size={16} strokeWidth={1.5} aria-hidden="true" />
            <span className={s.actionLabel}>
              Carrinho <span className="u-tabular">({count})</span>
            </span>
            <span className={`${s.badge} u-tabular`} aria-hidden="true" data-empty={count === 0}>
              {count}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
