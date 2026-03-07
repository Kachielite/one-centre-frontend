import type { StateStorage } from "zustand/middleware"

const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    localStorage.set(name, value)
  },
  getItem: (name) => {
    const value = localStorage.get(name)
    return value ?? null
  },
  removeItem: (name) => {
    localStorage.remove(name)
  },
}

export default zustandStorage
