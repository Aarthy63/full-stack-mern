import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { useTheme } from '../context/ThemeContext';

const Product = () => {
  const { isDark } = useTheme();
  const { productId } = useParams();
  const { products, currency, addToCart, isLoading, error } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState("")
  const [image, setImage] = useState("")

  const fetchProductData = async () => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
      }
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  // Show loading state
  if (isLoading) {
    return (
      <div className='border-t-2 pt-10 flex items-center justify-center min-h-[60vh]'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className='border-t-2 pt-10 flex items-center justify-center min-h-[60vh]'>
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

  // Show product not found state
  if (!productData) {
    return (
      <div className='border-t-2 pt-10 flex items-center justify-center min-h-[60vh]'>
        <div className="text-center">
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image && productData.image.map((item, index) => (
              <img key={index} onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} alt="" />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className={`font-medium text-2xl mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_icon} alt="" />
            <img className='w-3.5' src={assets.star_dull_icon} alt="" />
            <p className={`pl-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>(122)</p>
          </div>
          <p className={`mt-5 text-3xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{currency}{productData.price}</p>
          <p className={`mt-5 md:w-4/5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className={isDark ? 'text-white' : 'text-gray-900'}>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes && productData.sizes.map((item, index) => (
                <button 
                  key={index} 
                  onClick={() => setSize(item)} 
                  className={`border py-2 px-4 ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} ${item === size ? "border-orange-500" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addToCart(productData._id, size)} 
            className={`px-8 py-3 text-sm transition-colors duration-200 ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200 active:bg-gray-300' 
                : 'bg-black text-white hover:bg-gray-800 active:bg-gray-700'
            }`}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} currentProductId={productData._id} />
    </div>
  )
}

export default Product