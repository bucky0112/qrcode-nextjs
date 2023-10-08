import { useEffect } from 'react'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form'
import generateQrcode from '../lib/api/generateQrcode'
import { TextInput, SelectType, SizeSlider, ColorPicker } from '../components'
import useStore from '../store'

export type SvgFormInputs = {
  text: string
  qrType: string
  qrSize: number
  qrColor: string
  qrBgColor: string
}

type QrCodeData = {
  url?: string
  phone?: string
  address?: string
  email?: string
  foreground: string
  background: string
  dimensions: number
}

const CreateSvgForm = () => {
  const { setImgSrc, setErrors } = useStore()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<SvgFormInputs>({
    defaultValues: {
      qrSize: 500,
      qrColor: '#000000',
      qrBgColor: '#ffffff'
    }
  })

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

  const fetchQrcodeSvg = async (formData: SvgFormInputs) => {
    try {
      const typeMapping: { [key in SvgFormInputs['qrType']]: keyof QrCodeData } = {
        URL: 'url',
        電話: 'phone',
        地址: 'address',
        Email: 'email'
      }

      const dataKey = typeMapping[formData.qrType]
      const data: QrCodeData = {
        [dataKey]: formData.text,
        foreground: formData.qrColor,
        background: formData.qrBgColor,
        dimensions: formData.qrSize
      }
      const response = await generateQrcode.getSvg(data)
      const blob = new Blob([response.data], { type: 'image/svg+xml' })
      const objectURL = URL.createObjectURL(blob)
      setImgSrc(objectURL)
    } catch (_) {
      console.error('Error fetching image:')
    }
  }

  const onSubmit: SubmitHandler<SvgFormInputs> = async (data) => {
    await fetchQrcodeSvg(data)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-5'>
      <SelectType register={register as UseFormRegister<SvgFormInputs>} imageType="SVG" />
      <TextInput register={register as UseFormRegister<SvgFormInputs>} pattern={pattern} errors={errors} imageType="SVG" />
      <div className='flex items-center justify-evenly'>
        <SizeSlider register={register} setValue={setValue} />
        <ColorPicker
          register={register}
          label='選擇顏色'
          name='qrColor'
          setValue={setValue}
        />
        <ColorPicker
          register={register}
          label='選擇背景顏色'
          name='qrBgColor'
          setValue={setValue}
        />
      </div>
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

export default CreateSvgForm
