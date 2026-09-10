import { Minus, Plus } from 'lucide-react'
import s from './QuantityStepper.module.css'

export default function QuantityStepper({ value, onDecrement, onIncrement, min = 1, max = 10 }) {
  return (
    <div className={s.stepper}>
      <button
        type="button"
        className={s.btn}
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
      >
        <Minus size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
      <span className={`${s.value} u-tabular`} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={s.btn}
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Aumentar quantidade"
      >
        <Plus size={13} strokeWidth={1.8} aria-hidden="true" />
      </button>
    </div>
  )
}
