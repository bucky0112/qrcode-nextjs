import { FC } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { SvgFormInputs } from './CreateSvgForm'

interface SizeSliderProps {
  register: UseFormRegister<SvgFormInputs>
  setValue: UseFormSetValue<SvgFormInputs>
}

const SizeSlider: FC<SizeSliderProps> = ({ register, setValue }) => (
  <div className='mb-4'>
    <label className='block font-bold mb-2'>調整圖片大小</label>
    <input
      type='range'
      min='100'
      max='2000'
      {...register('qrSize')}
      onChange={(e) => {
        setValue('qrSize', parseInt(e.target.value, 10))
      }}
    />
  </div>
)

export default SizeSlider
