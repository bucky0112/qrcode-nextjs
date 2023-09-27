import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../page'

interface TextInputProps {
  register: UseFormRegister<FormInputs>
}

const TextInput: FC<TextInputProps> = ({ register }) => (
  <div className='mb-4'>
    <label className='block font-bold mb-2'>輸入文字</label>
    <input
      type='text'
      className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
      {...register('text', { required: true })}
    />
  </div>
)

export default TextInput
