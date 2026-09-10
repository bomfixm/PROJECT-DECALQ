import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import s from './Simple.module.css'

export default function NotFound() {
  return (
    <div className="page">
      <div className={`container page-lead ${s.wrap}`}>
        <Reveal>
          <p className={s.tag}>Erro 404</p>
          <h1 className={s.title}>Você se perdeu na rua.</h1>
          <p className={s.text}>A página que você procurou não existe — ou já saiu de circulação.</p>
          <Link to="/" className={s.link}>
            Voltar pro início
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
