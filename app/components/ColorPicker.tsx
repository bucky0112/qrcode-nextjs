import { FC, SetStateAction, Dispatch } from 'react'

interface ColorPickerProps {
  label: string
  color: string
  setColor: Dispatch<SetStateAction<string>>
}

const ColorPicker: FC<ColorPickerProps> = ({
  label,
  color,
  setColor
}) => {
  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>{label}</label>
      <input
        type='color'
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
    </div>
  )
}

export default ColorPicker
