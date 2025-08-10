import React, { useState } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { ADMIN_CONSTANTS } from '../constants/adminConstants'

const Add = ({token}) => {
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log('Add product error:', error);
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to add product')
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error(error.message || 'Failed to add product')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setImage1(false)
    setImage2(false)
    setImage3(false)
    setImage4(false)
    setPrice('')
    setSizes([])
    setBestseller(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{ADMIN_CONSTANTS.PAGE_TITLES.ADD_PRODUCT}</h1>
        <p className="text-gray-400 mt-1">Create a new product for your store</p>
      </div>

      <form onSubmit={onSubmitHandler} className='bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-8 space-y-6'>
        {/* Image Upload Section */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Product Images</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <label htmlFor="image1" className="cursor-pointer group">
              <div className={`w-full aspect-square rounded-lg border-2 border-dashed transition-all duration-200 group-hover:border-blue-500 ${
                image1 ? 'border-green-500' : 'border-gray-600'
              } flex items-center justify-center overflow-hidden`}>
                {!image1 ? (
                  <div className="text-center">
                    <img className='w-12 h-12 mx-auto mb-2 opacity-60' src={assets.upload_area} alt="Upload" />
                    <p className="text-gray-400 text-sm">Image 1</p>
                  </div>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image1)} alt="Preview" />
                )}
              </div>
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden accept="image/*"/>
            </label>
            
            <label htmlFor="image2" className="cursor-pointer group">
              <div className={`w-full aspect-square rounded-lg border-2 border-dashed transition-all duration-200 group-hover:border-blue-500 ${
                image2 ? 'border-green-500' : 'border-gray-600'
              } flex items-center justify-center overflow-hidden`}>
                {!image2 ? (
                  <div className="text-center">
                    <img className='w-12 h-12 mx-auto mb-2 opacity-60' src={assets.upload_area} alt="Upload" />
                    <p className="text-gray-400 text-sm">Image 2</p>
                  </div>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image2)} alt="Preview" />
                )}
              </div>
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden accept="image/*"/>
            </label>
            
            <label htmlFor="image3" className="cursor-pointer group">
              <div className={`w-full aspect-square rounded-lg border-2 border-dashed transition-all duration-200 group-hover:border-blue-500 ${
                image3 ? 'border-green-500' : 'border-gray-600'
              } flex items-center justify-center overflow-hidden`}>
                {!image3 ? (
                  <div className="text-center">
                    <img className='w-12 h-12 mx-auto mb-2 opacity-60' src={assets.upload_area} alt="Upload" />
                    <p className="text-gray-400 text-sm">Image 3</p>
                  </div>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image3)} alt="Preview" />
                )}
              </div>
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden accept="image/*"/>
            </label>
            
            <label htmlFor="image4" className="cursor-pointer group">
              <div className={`w-full aspect-square rounded-lg border-2 border-dashed transition-all duration-200 group-hover:border-blue-500 ${
                image4 ? 'border-green-500' : 'border-gray-600'
              } flex items-center justify-center overflow-hidden`}>
                {!image4 ? (
                  <div className="text-center">
                    <img className='w-12 h-12 mx-auto mb-2 opacity-60' src={assets.upload_area} alt="Upload" />
                    <p className="text-gray-400 text-sm">Image 4</p>
                  </div>
                ) : (
                  <img className='w-full h-full object-cover' src={URL.createObjectURL(image4)} alt="Preview" />
                )}
              </div>
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden accept="image/*"/>
            </label>
          </div>
        </div>

        {/* Product Details */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Product Name</label>
            <input 
              onChange={(e)=>setName(e.target.value)} 
              value={name} 
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
              type="text" 
              placeholder='Enter product name' 
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Product Price</label>
            <input 
              onChange={(e) => setPrice(e.target.value)} 
              value={price} 
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
              type="number" 
              step="0.01"
              placeholder='0.00' 
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-300 mb-2'>Product Description</label>
          <textarea 
            onChange={(e)=>setDescription(e.target.value)} 
            value={description} 
            className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none' 
            rows="4"
            placeholder='Write product description here' 
            required
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Category</label>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-300 mb-2'>Sub Category</label>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              value={subCategory}
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Sizes Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-300 mb-3'>Available Sizes</label>
          <div className='flex flex-wrap gap-3'>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => 
                  prev.includes(size) 
                    ? prev.filter(item => item !== size) 
                    : [...prev, size]
                )}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  sizes.includes(size)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex items-center space-x-3'>
          <input 
            onChange={() => setBestseller(prev => !prev)} 
            checked={bestseller} 
            type="checkbox" 
            id='bestseller'
            className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label className='text-gray-300 cursor-pointer hover:text-white transition-colors duration-200' htmlFor="bestseller">
            Mark as Bestseller
          </label>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 pt-6'>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2'
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding Product...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Product</span>
              </>
            )}
          </button>
          
          <button 
            type="button"
            onClick={resetForm}
            className='px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-200'
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add