'use client'
import { useState, useEffect, FormEvent } from 'react'
import { TextInput, SelectType, SizeSlider, ColorPicker } from './components'
import Image from 'next/image'
import generateQrcode from './lib/api/generateQrcode'

export default function Home() {
  const [text, setText] = useState<string>('')
  const [qrType, setQrType] = useState<string>('URL')
  const [qrSize, setQrSize] = useState<number>(500)
  const [qrColor, setQrColor] = useState<string>('#000000')
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff')
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  useEffect(() => {
    const fetchQrCodeImage = async () => {
      try {
        const params = { url: 'https://buckychu.im' }
        const response = await generateQrcode.getPng(params)
        const blob = new Blob([response.data], { type: 'image/png' })
        const objectURL = URL.createObjectURL(blob)
        setImgSrc(objectURL)
      } catch (_) {
        console.error('Error fetching image:')
      }
    }

    fetchQrCodeImage()

    return () => {
      setImgSrc(null)
    }
  }, [])

  const generateQRCode = (e: FormEvent) => {
    e.preventDefault()
    // 這裡是產生 QR code 的邏輯
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl mb-4'>QR Code 製造器</h1>
        <form onSubmit={generateQRCode} className='flex flex-col gap-y-5'>
          <SelectType qrType={qrType} setQrType={setQrType} />
          <TextInput text={text} setText={setText} />
          <div className='flex items-center justify-evenly'>
            <SizeSlider qrSize={qrSize} setQrSize={setQrSize} />
            <ColorPicker
              label='選擇顏色'
              color={qrColor}
              setColor={setQrColor}
            />
            <ColorPicker
              label='選擇背景顏色'
              color={qrBgColor}
              setColor={setQrBgColor}
            />
          </div>
          <div className='flex justify-center mt-5'>
            <button
              type='submit'
              className='bg-green-500 hover:bg-green-100 text-white hover:text-slate-700 font-bold py-2 px-4 rounded text-center'
            >
              產生 QR Code
            </button>
          </div>
        </form>
        {imgSrc ? (
          <div className='flex justify-center mt-10'>
            <Image src={imgSrc} width={500} height={500} alt='QR Code Image' />
          </div>
        ) : (
          'Loading...'
        )}
      </div>
    </main>
  )
}
