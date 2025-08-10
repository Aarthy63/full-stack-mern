import React from 'react'
import { assets } from '../assets/assets'
import { ADMIN_CONSTANTS } from '../constants/adminConstants'

const Navbar = ({ setToken }) => {
  return (
    <div className='bg-gradient-to-r from-gray-900 to-black px-8 py-4 shadow-lg border-b border-gray-700'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <img 
            src={assets.logo} 
            alt="Logo" 
            className='w-12 h-12 rounded-lg shadow-lg'
          />
          <div>
            <h1 className='text-2xl font-bold text-white'>
              {ADMIN_CONSTANTS.NAVBAR.TITLE}
            </h1>
            <p className='text-gray-400 text-sm'>{ADMIN_CONSTANTS.NAVBAR.SUBTITLE}</p>
          </div>
        </div>
        
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2 text-gray-300'>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm">{ADMIN_CONSTANTS.NAVBAR.ADMINISTRATOR}</span>
          </div>
          
          <button
            onClick={() => {
              setToken(null)
              localStorage.removeItem('token')
            }}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:scale-105'
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{ADMIN_CONSTANTS.NAVBAR.LOGOUT}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar