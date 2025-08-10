import React from 'react'
import { useTheme } from '../context/ThemeContext'

const Title = ({ text1, text2 }) => {
  const { isDark } = useTheme();

  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
        {text1} <span className={`${isDark ? 'text-white' : 'text-gray-700'} font-medium`}>{text2}</span>
      </p>
      <p className={`w-8 sm:w-12 h-[1px] sm:h-[2px] ${isDark ? 'bg-white' : 'bg-gray-700'}`}></p>
    </div>
  )
}

export default Title