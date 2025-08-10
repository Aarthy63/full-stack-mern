import React from 'react'
import { useTheme } from '../context/ThemeContext'

const NewsletterBox = () => {
  const { isDark } = useTheme();

  return (
    <div className='text-center'>
      <p className={`text-2xl font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
        Subscribe now & get 20% off
      </p>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-400'} mt-3`}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form className={`w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
        <input 
          className={`w-full sm:flex-1 outline-none ${isDark ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`} 
          type="text" 
          placeholder='Enter your email id' 
          required 
        />
        <button className={`${isDark ? 'bg-white text-black' : 'bg-black text-white'} text-xs px-10 py-4 transition-colors duration-200 hover:opacity-90`} type='submit'>
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
