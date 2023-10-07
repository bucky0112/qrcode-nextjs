import { FC } from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { SvgFormInputs } from './CreateSvgForm'

interface ColorPickerProps {
  label: string
  name: keyof SvgFormInputs
  register: UseFormRegister<SvgFormInputs>
  setValue: UseFormSetValue<SvgFormInputs>
}

const ColorPicker: FC<ColorPickerProps> = ({
  label,
  name,
  register,
  setValue
}) => {
  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>{label}</label>
      <input
        type='color'
        {...register(name)}
        onChange={(e) => {
          setValue(name, e.target.value)
        }}
      />
    </div>
  )
}

export default ColorPicker
