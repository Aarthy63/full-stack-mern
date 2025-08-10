import React from 'react'
import { assets } from '../assets/assets'
import logo from '../assets/logo.png'
import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const { isDark } = useTheme();

  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
          <div className="flex items-center mb-5">
            <div className="w-32 h-12 flex items-center justify-center">
              <img 
                className="w-full h-full object-contain"
                src="http://localhost:5176/logo.png" 
                alt="Logo" 
                style={isDark ? { 
                  filter: 'brightness(0) invert(1)',
                  WebkitFilter: 'brightness(0) invert(1)',
                  MozFilter: 'brightness(0) invert(1)'
                } : {}}
              />
            </div>
          </div>
          <p className={`w-full md:w-2/3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className={`text-xl font-medium mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>COMPANY</p>
          <ul className={`flex flex-col gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className={`text-xl font-medium mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>GET IN TOUCH</p>
          <ul className={`flex flex-col gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <li>+1-212-456-7890</li>
            <li>Contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className={isDark ? 'border-gray-600' : 'border-gray-300'} />
        <p className={`py-5 text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Copyright 2024@ forever.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer