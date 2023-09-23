import { FC, SetStateAction, Dispatch } from 'react'

interface TextInputProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
}

const TextInput: FC<TextInputProps> = ({ text, setText }) => (
  <div className='mb-4'>
    <label className='block font-bold mb-2'>輸入文字</label>
    <input
      type='text'
      className='w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300'
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  </div>
)

export default TextInput
