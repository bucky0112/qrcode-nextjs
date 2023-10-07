import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { SvgFormInputs } from './CreateSvgForm'
import { PngFormInputs } from './CreatePngForm'

type ImageType = 'SVG' | 'PNG'

interface SelectTypeProps<T extends ImageType> {
  register: T extends 'SVG'
    ? UseFormRegister<SvgFormInputs>
    : UseFormRegister<PngFormInputs>
  imageType: T
}

// interface SelectTypeProps {
//   register: UseFormRegister<SvgFormInputs>
// }

const SelectType: FC<SelectTypeProps<ImageType>> = ({
  register,
  imageType
}) => {
  let adjustedRegister: any

  if (imageType === 'SVG') {
    adjustedRegister = register as UseFormRegister<SvgFormInputs>
  } else {
    adjustedRegister = register as UseFormRegister<PngFormInputs>
  }

  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>選擇 QR Code 類型</label>
      <select
        className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
        // {...register('qrType')}
        {...adjustedRegister('qrType')}
      >
        <option value='URL'>URL</option>
        <option value='電話'>電話</option>
        <option value='地址'>地址</option>
        <option value='Email'>Email</option>
      </select>
    </div>
  )
}

export default SelectType
