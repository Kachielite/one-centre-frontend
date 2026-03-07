import type { StateStorage } from "zustand/middleware"

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    localStorage.setItem(name, value)
  },
  getItem: (name) => {
    const value = localStorage.getItem(name)
    return value ?? null
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  },
}

export default zustandStorage
