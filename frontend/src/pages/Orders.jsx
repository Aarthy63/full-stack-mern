import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useTheme } from '../context/ThemeContext'
import Title from '../components/Title';

const Orders = () => {

    const { products, currency } = useContext(ShopContext);
    const { isDark } = useTheme();

    return (
        <div className={`border-t pt-16 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>

            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div>
                {products.slice(1, 4).map((item, index) => (
                    <div key={index} className={`py-4 border-t border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                        isDark ? 'border-gray-700 text-white' : 'border-gray-200 text-gray-700'
                    }`}>
                        <div className='flex items-start gap-6 text-sm '>
                            <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                            <div>
                                <p className={`sm:text-base font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</p>
                                <div className={`flex items-center gap-3 mt-2 text-base ${
                                    isDark ? 'text-gray-300' : 'text-gray-700'
                                }`}>
                                    <p className='text-lg'>{currency}{item.price}</p>
                                    <p>Quantity: 1</p>
                                    <p>Size: L</p>
                                </div>
                                <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date: <span className={isDark ? 'text-gray-400' : 'text-gray-400'}>25, May, 2024</span></p>
                            </div>
                        </div>
                        <div className='md:w-1/2 flex justify-between'>
                            <div className='flex items-center gap-2'>
                                <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                                <p className={`text-sm md:text-base ${isDark ? 'text-white' : 'text-gray-700'}`}>Ready to ship</p>
                            </div>
                            <button className={`border px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-300 ${
                                isDark 
                                    ? 'border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500' 
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                            }`}>Track Order</button>
                        </div>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default Orders
