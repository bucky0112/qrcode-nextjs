import { useEffect } from 'react'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form'
import generateQrcode from '../lib/api/generateQrcode'
import { TextInput, SelectType } from './'
import useStore from '../store'

export type PngFormInputs = {
  text: string
  qrType: string
}

type QrCodeData = {
  url?: string
  phone?: string
  address?: string
  email?: string
}

const CreatePngForm = () => {
  const { setImgSrc, setErrors } = useStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PngFormInputs>()

  const qrType = watch('qrType', 'URL')

  useEffect(() => {
    setImgSrc(null)
  }, [qrType])

  useEffect(() => {
    setErrors(errors)
  }, [errors])

  const validationPatterns = {
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    電話: /^(\+?\d{1,3}[-.\s]?)?\d{10}$/,
    地址: /.+/,
    Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  const pattern = validationPatterns[qrType as keyof typeof validationPatterns]

  const fetchQrcodePng = async (formData: PngFormInputs) => {
    try {
      const typeMapping: { [key in PngFormInputs['qrType']]: keyof QrCodeData } = {
        URL: 'url',
        電話: 'phone',
        地址: 'address',
        Email: 'email'
      }

      const dataKey = typeMapping[formData.qrType]
      const data: QrCodeData = {
        [dataKey]: formData.text
      }
      const response = await generateQrcode.getPng(data)
      const blob = new Blob([response.data], { type: 'image/png+xml' })
      const objectURL = URL.createObjectURL(blob)
      setImgSrc(objectURL)
    } catch (_) {
      console.error('Error fetching image')
    }
  }

  const onSubmit: SubmitHandler<PngFormInputs> = async (data) => {
    await fetchQrcodePng(data)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5'>
      {/* <SelectType register={register} /> */}
      <SelectType register={register as UseFormRegister<PngFormInputs>} imageType="PNG" />
      {/* <TextInput register={register} pattern={pattern} errors={errors} /> */}
      <TextInput register={register as UseFormRegister<PngFormInputs>} pattern={pattern} errors={errors} imageType="PNG" />
      <div className='flex justify-center mt-5'>
        <button
          type='submit'
          className={`${
            hasErrors ? 'bg-gray-400' : 'bg-green-500'
          } hover:bg-green-100 text-white hover:text-slate-700 font-bold py-2 px-4 rounded text-center`}
        >
          產生 QR Code
        </button>
      </div>
    </form>
  )
}

export default CreatePngForm
