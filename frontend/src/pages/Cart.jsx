import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const { isDark } = useTheme();
  const { products, currency, navigate, cartItems, updateQuantity, isLoading, error, proceedToCheckout } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = []
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    console.log(tempData);
    setCartData(tempData)
  }, [cartItems])

  // Show loading state
  if (isLoading) {
    return (
      <div className='border-t pt-14 flex items-center justify-center min-h-[60vh]'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className='border-t pt-14 flex items-center justify-center min-h-[60vh]'>
        <div className="text-center">
          <p className={`text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className={`mt-4 px-6 py-2 rounded-lg ${
              isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length === 0 ? (
        <div className={`text-center py-16 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="text-xl mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate('/collection')}
            className={`px-6 py-3 rounded-lg transition-colors duration-200 ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);

            if (!productData) {
              return (
                <div key={index} className={`py-4 border-t border-b ${isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'}`}>
                  <p>Product not found or removed</p>
                </div>
              );
            }

            return (
              <div key={index} className={`py-4 border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 ${isDark ? 'border-gray-600 text-gray-200' : 'border-gray-300 text-gray-700'}`}>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className={`px-2 sm:px-3 sm:py-1 border ${isDark ? 'border-gray-500 bg-gray-700' : 'border-gray-300 bg-slate-50'}`}>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input 
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                  className={`border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ${isDark ? 'border-gray-500 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`} 
                  type="number" 
                  min={1} 
                  defaultValue={item.quantity} 
                />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
              </div>
            );
          })}
        </div>
      )}

      {/* Cart Total */}
      {cartData.length > 0 && (
        <div className='mt-8'>
          <CartTotal />
          <div className='w-full text-end mt-8'>
            <button 
              onClick={() => proceedToCheckout()} 
              className={`px-16 py-3 text-sm transition-colors duration-200 ${
                isDark 
                  ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300' 
                  : 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'
              }`}
            >
              PROCEED TO PAY
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
