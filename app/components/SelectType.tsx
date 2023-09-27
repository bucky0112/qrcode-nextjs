import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormInputs } from '../page'

interface SelectTypeProps {
  register: UseFormRegister<FormInputs>
}

const SelectType: FC<SelectTypeProps> = ({ register }) => (
  <div className='mb-4'>
    <label className='block font-bold mb-2'>選擇 QR Code 類型</label>
    <select
      className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
      {...register('qrType')}
    >
      <option value='URL'>URL</option>
      <option value='電話'>電話</option>
      <option value='地址'>地址</option>
      <option value='Email'>Email</option>
    </select>
  </div>
)

export default SelectType
