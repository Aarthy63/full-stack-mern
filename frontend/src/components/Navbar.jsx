import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)

    const { setShowSearch, navigate, getCartCount } = useContext(ShopContext);
    const { user, isAuthenticated, logout } = useAuth();
    const { isDark } = useTheme();

    console.log('Navbar - Current theme isDark:', isDark);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <div className={`flex items-center justify-between py-5 font-medium transition-all duration-300 ${
            isDark ? 'text-white' : 'text-gray-700'
        }`}>
            <Link to='/' className="flex items-center">
              <div className="w-36 h-16 flex items-center justify-center">
                <img 
                  className="w-full h-full object-contain"
                  src="http://localhost:5176/logo.png" 
                  alt="Logo" 
                  style={isDark ? { 
                    filter: 'brightness(0) invert(1)',
                    WebkitFilter: 'brightness(0) invert(1)',
                    MozFilter: 'brightness(0) invert(1)'
                  } : {}}
                  onError={(e) => {
                    console.error('Logo failed to load');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              {isDark && <span className="text-white text-2xl font-bold ml-2">FOREVER</span>}
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm'>
                <NavLink to="/" className='flex flex-col items-center gap-1 transition-colors duration-300'>
                    <p className={isDark ? 'text-white' : 'text-gray-700'}>HOME</p>
                    <hr className={`w-2/4 border-none h-[1.5px] transition-colors duration-300 ${
                        isDark ? 'bg-white' : 'bg-gray-700'
                    } hidden`} />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1 transition-colors duration-300'>
                    <p className={isDark ? 'text-white' : 'text-gray-700'}>COLLECTION</p>
                    <hr className={`w-2/4 border-none h-[1.5px] transition-colors duration-300 ${
                        isDark ? 'bg-white' : 'bg-gray-700'
                    } hidden`} />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1 transition-colors duration-300'>
                    <p className={isDark ? 'text-white' : 'text-gray-700'}>ABOUT</p>
                    <hr className={`w-2/4 border-none h-[1.5px] transition-colors duration-300 ${
                        isDark ? 'bg-white' : 'bg-gray-700'
                    } hidden`} />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1 transition-colors duration-300'>
                    <p className={isDark ? 'text-white' : 'text-gray-700'}>CONTACT</p>
                    <hr className={`w-2/4 border-none h-[1.5px] transition-colors duration-300 ${
                        isDark ? 'bg-white' : 'bg-gray-700'
                    } hidden`} />
                </NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {/* Theme Toggle */}
                <ThemeToggle />
                
                {/* Search Icon */}
                <img 
                    onClick={() => { setShowSearch(true); navigate('/collection') }} 
                    className='w-5 cursor-pointer transition-transform duration-200 hover:scale-110' 
                    src={assets.search_icon} 
                    alt="Search" 
                    style={isDark ? { 
                        filter: 'brightness(0) invert(1)',
                        WebkitFilter: 'brightness(0) invert(1)',
                        MozFilter: 'brightness(0) invert(1)'
                    } : {}}
                />
                
                {/* User Profile */}
                <div className='relative'>
                    {isAuthenticated ? (
                        <div className='group'>
                            <img 
                                onClick={() => setShowUserMenu(!showUserMenu)} 
                                className='w-5 cursor-pointer transition-transform duration-200 hover:scale-110' 
                                src={assets.profile_icon} 
                                alt="Profile" 
                                style={isDark ? { 
                                    filter: 'brightness(0) invert(1)',
                                    WebkitFilter: 'brightness(0) invert(1)',
                                    MozFilter: 'brightness(0) invert(1)'
                                } : {}}
                            />

                            {/* User Dropdown Menu */}
                            {showUserMenu && (
                                <div className={`absolute right-0 pt-4 z-50`}>
                                    <div className={`flex flex-col gap-2 w-48 py-3 px-4 rounded-lg shadow-xl border transition-all duration-300 ${
                                        isDark 
                                            ? 'bg-gray-800 border-gray-600 text-gray-300' 
                                            : 'bg-white border-gray-200 text-gray-700'
                                    }`}>
                                        <div className='px-3 py-2 border-b border-gray-300 dark:border-gray-600'>
                                            <p className='font-medium text-sm'>{user?.name}</p>
                                            <p className='text-xs text-gray-500'>{user?.email}</p>
                                        </div>
                                        <button 
                                            onClick={() => { navigate('/orders'); setShowUserMenu(false); }} 
                                            className='text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200'
                                        >
                                            My Orders
                                        </button>
                                        <button 
                                            onClick={handleLogout} 
                                            className='text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200 text-red-600 dark:text-red-400'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className={`px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                isDark 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                            }`}
                        >
                            Login
                        </button>
                    )}
                </div>
                
                {/* Cart */}
                <Link to='/cart' className='relative'>
                    <img 
                        className='w-5 min-w-5 transition-transform duration-200 hover:scale-110' 
                        src={assets.cart_icon} 
                        alt="Cart" 
                        style={isDark ? { 
                            filter: 'brightness(0) invert(1)',
                            WebkitFilter: 'brightness(0) invert(1)',
                            MozFilter: 'brightness(0) invert(1)'
                        } : {}}
                    />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-500 text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>
                
                {/* Mobile Menu Button */}
                <img 
                    onClick={() => setVisible(true)} 
                    className='w-5 cursor-pointer sm:hidden transition-transform duration-200 hover:scale-110' 
                    src={assets.menu_icon} 
                    alt="Menu" 
                    style={isDark ? { 
                        filter: 'brightness(0) invert(1)',
                        WebkitFilter: 'brightness(0) invert(1)',
                        MozFilter: 'brightness(0) invert(1)'
                    } : {}}
                />
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all duration-300 ${
                visible ? 'w-full' : 'w-0'
            } ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`flex flex-col ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3'>
                        <img 
                            className='h-4 rotate-180' 
                            src={assets.dropdown_icon} 
                            alt="" 
                            style={isDark ? { 
                                filter: 'brightness(0) invert(1)',
                                WebkitFilter: 'brightness(0) invert(1)',
                                MozFilter: 'brightness(0) invert(1)'
                            } : {}}
                        />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} to="/" className='py-2 pl-6 border'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/collection' className='py-2 pl-6 border'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/about' className='py-2 pl-6 border'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} to='/contact' className='py-2 pl-6 border'>CONTACT</NavLink>
                    {!isAuthenticated && (
                        <NavLink onClick={() => setVisible(false)} to='/login' className='py-2 pl-6 border'>LOGIN</NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar