import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { useUIStore } from './useUIStore'

const lineId = (productId, size) => `${productId}::${size}`

/**
 * Front-end only cart. Persisted to localStorage so a refresh keeps the bag.
 * Adding a line opens the cart drawer.
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      add: (product, size, qty = 1) => {
        const id = lineId(product.id, size)
        set((state) => {
          const existing = state.items.find((it) => it.id === id)
          if (existing) {
            return {
              items: state.items.map((it) =>
                it.id === id ? { ...it, qty: Math.min(it.qty + qty, 10) } : it,
              ),
            }
          }
          return {
            items: [
              ...state.items,
              {
                id,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                size,
                price: product.price,
                image: product.images[0],
                qty,
              },
            ],
          }
        })
        useUIStore.getState().openCart()
      },

      remove: (id) => set((state) => ({ items: state.items.filter((it) => it.id !== id) })),

      setQty: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((it) => (it.id === id ? { ...it, qty: Math.max(0, Math.min(qty, 10)) } : it))
            .filter((it) => it.qty > 0),
        })),

      increment: (id) => get().setQty(id, (get().items.find((it) => it.id === id)?.qty ?? 0) + 1),
      decrement: (id) => get().setQty(id, (get().items.find((it) => it.id === id)?.qty ?? 0) - 1),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'decalq-cart',
      version: 1,
    },
  ),
)

/* ---- Derived selectors (use with useCartStore(selector)) ---- */
export const selectCount = (state) => state.items.reduce((sum, it) => sum + it.qty, 0)
export const selectSubtotal = (state) =>
  state.items.reduce((sum, it) => sum + it.price * it.qty, 0)
