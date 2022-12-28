import create from 'zustand'
import { nanoid } from 'nanoid'

const getLocalStorage = (key) => JSON.parse(window.localStorage.getItem(key))
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
  texture: 'dirt',
  cubes: getLocalStorage('cubes') || [],
  addCube: (x, y, z) => {
    set((state) => ({
      cubes: [
        ...state.cubes,
        {
          key: nanoid(),
          pos: [x, y, z],
          texture: state.texture,
        },
      ],
    }))
  },
  removeCube: (x, y, z) => {
    set((state) => ({
      cubes: state.cubes.filter((cube) => {
        const [cx, cy, cz] = cube.pos

        return !(cx === x && cy === y && cz === z)
      })
    }))
  },
  setTexture: (texture) => {
    set(() => ({
			texture
		}))
  },
  saveWorld: () => {
    set((state) => {
      setLocalStorage('cubes', state.cubes)
    })
  },
  resetWorld: () => {
    set(() => ({
      cubes: []
    }))
  },
}))