import { Link } from 'react-router-dom'
import Reveal from '@/components/ui/Reveal'
import s from './Simple.module.css'

export default function Account() {
  return (
    <div className="page">
      <div className={`container page-lead ${s.wrap}`}>
        <Reveal>
          <p className={s.tag}>Conta</p>
          <h1 className={s.title}>Área da conta em breve.</h1>
          <p className={s.text}>
            Login, pedidos e lista de desejos estão a caminho. Por enquanto, o drop
            é por aqui mesmo.
          </p>
          <Link to="/shop" className={s.link}>
            Ir para o shop
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
