import { FC } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { SvgFormInputs } from './CreateSvgForm'
import useStore from '../store/index'

interface SizeSliderProps {
  register: UseFormRegister<SvgFormInputs>
  setValue: UseFormSetValue<SvgFormInputs>
}

const SizeSlider: FC<SizeSliderProps> = ({ register, setValue }) => {
  const { qrSize, setQrSize } = useStore()

  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>調整圖片大小</label>
      <div className='flex'>
        <span>Min: 100</span>
        <input
          type='range'
          min='100'
          max='2000'
          value={qrSize}
          {...register('qrSize')}
          className='mx-2'
          onChange={(e) => {
            const newSize = parseInt(e.target.value, 10)
            setValue('qrSize', newSize)
            setQrSize(newSize)
          }}
        />
        <span>Max: 2000</span>
      </div>
      <div className='mt-2'>目前大小：{qrSize} pixel</div>
    </div>
  )
}

export default SizeSlider
