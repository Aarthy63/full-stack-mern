import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SearchBar = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return showSearch && visible ? (
    <div className={`border-t border-b text-center ${isDark ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
      <div className={`inline-flex items-center justify-center border px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ${isDark ? 'border-gray-500' : 'border-gray-400'}`}>
        <input 
          className={`flex-1 outline-none bg-inherit text-sm ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`} 
          onChange={(e) => setSearch(e.target.value)} 
          value={search} 
          type="text" 
          placeholder='Search' 
        />
        <img className='w-4' src={assets.search_icon} alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
