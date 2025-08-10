import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ADMIN_CONSTANTS } from '../constants/adminConstants'

const Sidebar = () => {
  return (
    <div className='w-[max(20vw,200px)] min-h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-700 p-6 flex flex-col'>
      <div className='flex-1 space-y-6'>
        {/* Dashboard */}
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
              isActive 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-white hover:text-gray-200'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
          <span className="font-medium">{ADMIN_CONSTANTS.NAVIGATION.DASHBOARD}</span>
        </NavLink>

        {/* Add Product */}
        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
              isActive 
                ? 'bg-green-600 text-white shadow-lg' 
                : 'text-white hover:text-gray-200'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span className="font-medium">{ADMIN_CONSTANTS.NAVIGATION.ADD_PRODUCT}</span>
        </NavLink>

        {/* Product List */}
        <NavLink 
          to="/list" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
              isActive 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-white hover:text-gray-200'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="font-medium">{ADMIN_CONSTANTS.NAVIGATION.PRODUCTS}</span>
        </NavLink>

        {/* Orders */}
        <NavLink 
          to="/orders" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-gray-800 hover:scale-105 ${
              isActive 
                ? 'bg-orange-600 text-white shadow-lg' 
                : 'text-white hover:text-gray-200'
            }`
          }
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-medium">{ADMIN_CONSTANTS.NAVIGATION.ORDERS}</span>
        </NavLink>
      </div>

      {/* Footer Section */}
      <div className='mt-auto pt-6 border-t border-gray-700'>
        <div className='text-center'>
          <div className='flex items-center justify-center space-x-2 mb-2'>
            <img
              src={assets.logo}
              alt="Logo"
              className='w-8 h-8 rounded'
            />
            <span className='text-sm font-medium text-white'>Admin Panel</span>
          </div>
          <p className='text-xs text-gray-500'>© 2024 E-commerce Management</p>
          <p className='text-xs text-gray-500 mt-1'>All rights reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar