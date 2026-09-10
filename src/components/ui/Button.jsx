import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import s from './Button.module.css'

/**
 * One button system across the site.
 * variant: 'solid' (black fill) | 'outline' | 'ghost' (text + arrow)
 * Renders <Link>, <a> or <button> depending on props.
 */
const Button = forwardRef(function Button(
  {
    children,
    to,
    href,
    variant = 'solid',
    size = 'md',
    arrow = true,
    className = '',
    ...rest
  },
  ref,
) {
  const cls = [s.btn, s[variant], s[size], className].filter(Boolean).join(' ')

  const inner = (
    <>
      <span className={s.label}>{children}</span>
      {arrow && <ArrowRight className={s.arrow} size={16} strokeWidth={1.6} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link ref={ref} to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button ref={ref} className={cls} {...rest}>
      {inner}
    </button>
  )
})

export default Button
