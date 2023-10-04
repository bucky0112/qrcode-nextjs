'use client'
import { useEffect } from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import generateQrcode from './lib/api/generateQrcode'
import { TextInput, SelectType, SizeSlider, ColorPicker } from './components'
import useStore from './store'

export type FormInputs = {
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

export default function Home() {
  const { imgSrc, setImgSrc } = useStore()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<FormInputs>({
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

  const validationPatterns = {
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    電話: /^(\+?\d{1,3}[-.\s]?)?\d{10}$/,
    地址: /.+/,
    Email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }

  const pattern = validationPatterns[qrType as keyof typeof validationPatterns]

  const fetchQrcodeSvg = async (formData: FormInputs) => {
    try {
      const typeMapping: { [key in FormInputs['qrType']]: keyof QrCodeData } = {
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

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await fetchQrcodeSvg(data)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl mb-4'>QR Code 製造器</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-y-5'
        >
          <SelectType register={register} />
          <TextInput register={register} pattern={pattern} errors={errors} />
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
              className={`${hasErrors ? 'bg-gray-400' : 'bg-green-500'} hover:bg-green-100 text-white hover:text-slate-700 font-bold py-2 px-4 rounded text-center`}
            >
              產生 QR Code
            </button>
          </div>
        </form>
        {imgSrc && Object.keys(errors).length < 1 ? (
          <div className='flex justify-center mt-10'>
            <Image src={imgSrc} width={500} height={500} alt='QR Code Image' />
          </div>
        ) : (
          <p>
            {hasErrors
              ? '請輸入正確的資訊'
              : '請點擊「產生 QR Code」按鈕'}
          </p>
        )}
      </div>
    </main>
  )
}
