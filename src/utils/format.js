const BRL = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** 149.9 -> "R$ 149,90" */
export function formatBRL(value) {
  return BRL.format(value ?? 0)
}

/**
 * Installment copy, Brazilian retail style.
 * 149.9 -> "4x de R$ 37,48 sem juros"
 */
export function installments(value, parts = 4) {
  if (!value) return ''
  return `${parts}x de ${formatBRL(value / parts)} sem juros`
}

// Combining Diacritical Marks block: U+0300–U+036F
const DIACRITICS = new RegExp('[' + String.fromCharCode(0x300) + '-' + String.fromCharCode(0x36f) + ']', 'g')

/** Lowercase + strip diacritics, so "bone" matches "Boné". */
export function normalize(str = '') {
  return str.toLowerCase().normalize('NFD').replace(DIACRITICS, '')
}
