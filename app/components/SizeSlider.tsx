import { FC, SetStateAction, Dispatch } from 'react'

interface SizeSliderProps {
  qrSize: number
  setQrSize: Dispatch<SetStateAction<number>>
}

const SizeSlider: FC<SizeSliderProps> = ({ qrSize, setQrSize }) => {
  return (
    <div className='mb-4'>
      <label className='block font-bold mb-2'>調整圖片大小</label>
      <input
        type='range'
        min='100'
        max='2000'
        value={qrSize}
        onChange={(e) => setQrSize(parseInt(e.target.value))}
      />
    </div>
  )
}

export default SizeSlider
