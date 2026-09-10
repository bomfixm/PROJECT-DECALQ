import s from './SizePicker.module.css'

export default function SizePicker({ sizes, value, onChange, error, onOpenGuide }) {
  return (
    <div className={s.wrap}>
      <div className={s.head}>
        <span className={s.label}>Tamanho</span>
        {onOpenGuide && (
          <button type="button" className={s.guide} onClick={onOpenGuide}>
            Guia de medidas
          </button>
        )}
      </div>

      <div className={s.options} role="radiogroup" aria-label="Tamanho">
        {sizes.map((size) => {
          const active = value === size
          return (
            <button
              key={size}
              type="button"
              role="radio"
              aria-checked={active}
              className={`${s.option} ${active ? s.active : ''}`}
              onClick={() => onChange(size)}
            >
              {size}
            </button>
          )
        })}
      </div>

      {error && (
        <p className={s.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
