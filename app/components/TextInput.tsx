import { FC } from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormInputs } from './CreateSvgForm'

interface TextInputProps {
  register: UseFormRegister<FormInputs>
  pattern: RegExp
  errors: FieldErrors<FormInputs>
}

const TextInput: FC<TextInputProps> = ({ register, pattern, errors }) => (
  <div className='mb-4'>
    <label className='block font-bold mb-2'>輸入文字</label>
    <input
      type='text'
      className={`w-full p-2 border rounded focus:outline-none focus:ring ${errors?.text ? 'focus:border-red-500 border-red-500 ring-red-500' : 'focus:border-blue-300'}`}
      {...register('text', { required: true, pattern })}
    />
  </div>
)

export default TextInput
