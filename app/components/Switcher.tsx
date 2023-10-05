import useStore from '../store' 
import styles from '../styles/Switcher.module.css'

const Switcher = () => {
  const { selectedFormat, setSelectedFormat } = useStore()

  return (
    <>
      <div className='relative inline-block w-10 align-middle select-none transition duration-200 ease-in'>
        <input
          id='formSwitcher'
          type='checkbox'
          className={`${styles.toggleCheckbox} absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
          checked={selectedFormat === 'SVG'}
          onChange={() =>
            setSelectedFormat(selectedFormat === 'SVG' ? 'PNG' : 'SVG')
          }
        />
        <label
          htmlFor='formSwitcher'
          className='w-12 block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'
        ></label>
      </div>
      <span className='ml-5 text-xl align-middle'>{selectedFormat}</span>
    </>
  )
}

export default Switcher
