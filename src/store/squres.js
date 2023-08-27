import { create } from 'zustand'

export const useSquare = create((set) => ({
  array: Array(9)
  kosong: () => set((state) => ({ fill(null) })),
  removeAllBears: () => set({ bears: 0 }),
}))