import { create } from 'zustand'
import { FieldError } from 'react-hook-form'

type ErrorType = {
  text?: FieldError;
  qrType?: FieldError;
  qrSize?: FieldError;
  qrColor?: FieldError;
  qrBgColor?: FieldError;
}

interface Store {
  imgSrc: string | null
  setImgSrc: (imgSrc: string | null) => void
  errorsFromForm: ErrorType
  setErrors: (errors: ErrorType) => void
}
const useStore = create<Store>((set) => ({
  imgSrc: null,
  setImgSrc: (imgSrc) => set({ imgSrc }),
  errorsFromForm: {},
  setErrors: (errors) => set({ errorsFromForm: errors }),
}))

export default useStore
