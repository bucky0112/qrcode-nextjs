'use client'
import Image from 'next/image'
import useStore from './store'
import CreateSvgForm from './components/CreateSvgForm'
import CreatePngForm from './components/CreatePngForm'
import Switcher from './components/Switcher'

export default function Home() {
  const { imgSrc, errorsFromForm, selectedFormat } = useStore()
  const hasErrors = Object.keys(errorsFromForm).length > 0

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='container mx-auto p-4'>
        <h1 className='text-3xl mb-4'>QR Code 製造器</h1>
        <Switcher />
        <div className='mt-3'>
          {selectedFormat === 'SVG' ? <CreateSvgForm /> : <CreatePngForm />}
        </div>
        {imgSrc && Object.keys(errorsFromForm).length < 1 ? (
          <div className='flex justify-center mt-10'>
            <Image src={imgSrc} width={500} height={500} alt='QR Code Image' />
          </div>
        ) : (
          <p>{hasErrors ? '請輸入正確的資訊' : '請點擊「產生 QR Code」按鈕'}</p>
        )}
      </div>
    </main>
  )
}
