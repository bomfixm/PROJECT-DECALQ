import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { newsletter } from '@/data/site'
import s from './Newsletter.module.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | done

  const onSubmit = (e) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error')
      return
    }
    // front-end only — pretend it worked
    setStatus('done')
    setEmail('')
  }

  return (
    <section className={`section ${s.section}`}>
      <div className={`container ${s.grid}`}>
        <div className={s.intro}>
          <h2 className={s.title}>{newsletter.title}</h2>
          <p className={s.copy}>{newsletter.copy}</p>
        </div>

        <form className={s.form} onSubmit={onSubmit} noValidate>
          <div className={s.field}>
            <label htmlFor="nl-email" className={s.label}>
              Seu e-mail
            </label>
            <div className={s.inputRow}>
              <input
                id="nl-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="voce@email.com"
                className={s.input}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                }}
                aria-invalid={status === 'error'}
                aria-describedby="nl-msg"
              />
              <button type="submit" className={s.submit} aria-label="Assinar a newsletter">
                <span>Entrar</span>
                <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          </div>

          <p
            id="nl-msg"
            className={`${s.msg} ${status === 'error' ? s.msgError : ''} ${
              status === 'done' ? s.msgDone : ''
            }`}
            aria-live="polite"
          >
            {status === 'error' && 'Confere o e-mail e tenta de novo.'}
            {status === 'done' && 'Você está dentro. Fica de olho na caixa de entrada.'}
            {status === 'idle' && 'Sem spam. Só o que importa.'}
          </p>
        </form>
      </div>
    </section>
  )
}
