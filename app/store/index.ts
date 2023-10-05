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
  selectedFormat: string
  setSelectedFormat: (format: string) => void
}
const useStore = create<Store>((set) => ({
  imgSrc: null,
  setImgSrc: (imgSrc) => set({ imgSrc }),
  errorsFromForm: {},
  setErrors: (errors) => set({ errorsFromForm: errors }),
  selectedFormat: 'PNG',
  setSelectedFormat: (format) => set({ selectedFormat: format }),
}))

export default useStore
