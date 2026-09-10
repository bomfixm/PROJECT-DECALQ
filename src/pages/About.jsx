import Reveal from '@/components/ui/Reveal'
import Button from '@/components/ui/Button'
import { manifesto, editorial, site } from '@/data/site'
import s from './About.module.css'

const BLOCKS = [
  {
    id: 'historia',
    k: '01',
    title: 'De onde vem',
    body: 'A DECALQ começou entre amigos que gostavam das mesmas roupas e não achavam nenhuma. Primeiro foram três estampas numa fornada de camisetas. Depois virou isso.',
  },
  {
    id: 'entregas',
    k: '02',
    title: 'Entregas',
    body: 'Produzimos em lotes pequenos e enviamos para todo o Brasil em 2 a 5 dias úteis após a confirmação do pagamento. Você acompanha tudo por código de rastreio.',
  },
  {
    id: 'trocas',
    k: '03',
    title: 'Trocas',
    body: 'Não serviu? Troca ou devolução em até 30 dias, com a etiqueta original. A primeira troca por tamanho é por nossa conta.',
  },
]

export default function About() {
  return (
    <div className="page">
      <section className={`container page-lead ${s.lead}`}>
        <Reveal>
          <p className={s.tag}>
            {manifesto.overline}
          </p>
          <h1 className={s.statement}>{manifesto.statement}</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={s.body}>{manifesto.body}</p>
        </Reveal>
      </section>

      <section className={s.figure}>
        <img src={editorial.image} alt={editorial.alt} loading="lazy" decoding="async" />
      </section>

      <section className="container section">
        <ul className={s.blocks}>
          {BLOCKS.map((block) => (
            <Reveal as="li" key={block.id} className={s.block} id={block.id}>
              <span className={s.blockK}>{block.k}</span>
              <h2 className={s.blockTitle}>{block.title}</h2>
              <p className={s.blockBody}>{block.body}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={`section section--dark on-dark ${s.cta}`}>
        <div className="container">
          <p className={s.ctaClaim}>{site.claim}</p>
          <Button to="/shop" size="lg">
            Ver o shop
          </Button>
        </div>
      </section>
    </div>
  )
}
