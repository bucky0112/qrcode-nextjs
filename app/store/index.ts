import { create } from 'zustand'
import { FieldError } from 'react-hook-form'

type ErrorType = {
  text?: FieldError
  qrType?: FieldError
  qrSize?: FieldError
  qrColor?: FieldError
  qrBgColor?: FieldError
}

interface Store {
  imgSrc: string | null
  setImgSrc: (imgSrc: string | null) => void
  errorsFromForm: ErrorType
  setErrors: (errors: ErrorType) => void
  selectedFormat: string
  setSelectedFormat: (format: string) => void
  qrSize: number
  setQrSize: (size: number) => void
}
const useStore = create<Store>((set) => ({
  imgSrc: null,
  setImgSrc: (imgSrc) => set({ imgSrc }),
  errorsFromForm: {},
  setErrors: (errors) => set({ errorsFromForm: errors }),
  selectedFormat: 'PNG',
  setSelectedFormat: (format) => set({ selectedFormat: format }),
  qrSize: 500,
  setQrSize: (size) => set({ qrSize: size }),
}))

export default useStore
