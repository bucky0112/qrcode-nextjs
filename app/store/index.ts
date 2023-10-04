import { create } from 'zustand'

interface Store {
  imgSrc: string | null
  setImgSrc: (imgSrc: string | null) => void
}
const useStore = create<Store>((set) => ({
  imgSrc: null,
  setImgSrc: (imgSrc) => set({ imgSrc }),
}))

export default useStore
