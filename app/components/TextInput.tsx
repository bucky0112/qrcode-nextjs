import { FC } from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { SvgFormInputs } from './CreateSvgForm'
import { PngFormInputs } from './CreatePngForm'

type ImageType = 'SVG' | 'PNG'

interface TextInputProps<T extends ImageType> {
  // register: UseFormRegister<SvgFormInputs>
  register: T extends 'SVG'
  ? UseFormRegister<SvgFormInputs>
  : UseFormRegister<PngFormInputs>
  pattern: RegExp
  errors: FieldErrors<SvgFormInputs>
  imageType: T
}

const TextInput: FC<TextInputProps<ImageType>> = ({ register, pattern, errors, imageType }) => {
  let adjustedRegister: any

  if (imageType === 'SVG') {
    adjustedRegister = register as UseFormRegister<SvgFormInputs>
  } else {
    adjustedRegister = register as UseFormRegister<PngFormInputs>
  }

  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>輸入文字</label>
      <input
        type='text'
        className={`w-full p-2 border rounded focus:outline-none focus:ring ${
          errors?.text
            ? 'focus:border-red-500 border-red-500 ring-red-500'
            : 'focus:border-blue-300'
        }`}
        // {...register('text', { required: true, pattern })}
        {...adjustedRegister('qrType')}
      />
    </div>
  )
}

export default TextInput
