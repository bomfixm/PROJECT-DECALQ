import { create } from 'zustand'

/**
 * Global UI overlays. Only one of menu / search / cart is ever open at a time.
 */
export const useUIStore = create((set) => ({
  menuOpen: false,
  searchOpen: false,
  cartOpen: false,

  openMenu: () => set({ menuOpen: true, searchOpen: false, cartOpen: false }),
  closeMenu: () => set({ menuOpen: false }),

  openSearch: () => set({ searchOpen: true, menuOpen: false, cartOpen: false }),
  closeSearch: () => set({ searchOpen: false }),

  openCart: () => set({ cartOpen: true, menuOpen: false, searchOpen: false }),
  closeCart: () => set({ cartOpen: false }),

  closeAll: () => set({ menuOpen: false, searchOpen: false, cartOpen: false }),
}))
