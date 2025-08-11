import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { ADMIN_CONSTANTS } from '../constants/adminConstants'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewDetailsItem, setViewDetailsItem] = useState(null)

  // Handle view product details
  const handleViewDetails = (item) => {
    setViewDetailsItem(item)
  }

  // Handle duplicate product
  const handleDuplicateProduct = async (item) => {
    if (window.confirm(`Are you sure you want to duplicate "${item.name}"?`)) {
      try {
        setIsLoading(true)
        const duplicateData = {
          name: `${item.name} (Copy)`,
          category: item.category,
          price: item.price,
          description: item.description || '',
          image: item.image
        }
        
        const response = await axios.post(
          backendUrl + '/api/product/add',
          duplicateData,
          { headers: { token } }
        )

        if (response.data.success) {
          toast.success('Product duplicated successfully!')
          await fetchList()
        } else {
          toast.error(response.data.message || 'Failed to duplicate product')
        }
      } catch (error) {
        console.log('Duplicate product error:', error)
        if (error.response) {
          toast.error(error.response.data?.message || 'Failed to duplicate product')
        } else if (error.request) {
          toast.error('Network error. Please check your connection.')
        } else {
          toast.error(error.message || 'Failed to duplicate product')
        }
      
        setIsLoading(false)
      }
    }
  }

  const fetchList = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('List fetch error:', error)
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to fetch products')
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error(error.message || 'Failed to fetch products')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log('Remove product error:', error)
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to delete product')
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error(error.message || 'Failed to delete product')
      }
    }
  }

  const updateProduct = async () => {
    try {
      // Client-side validation
      if (!editItem.name || !editItem.name.trim()) {
        toast.error('Product name is required');
        return;
      }
      
      if (!editItem.category || !editItem.category.trim()) {
        toast.error('Category is required');
        return;
      }
      
      if (!editItem.price || isNaN(Number(editItem.price)) || Number(editItem.price) <= 0) {
        toast.error('Valid price is required');
        return;
      }
      
      if (!editItem.subCategory || !editItem.subCategory.trim()) {
        toast.error('Sub-category is required');
        return;
      }
      
      setIsLoading(true)
      
      console.log('=== UPDATE PRODUCT DEBUG ===');
      console.log('Product ID:', editItem._id);
      console.log('Update data:', {
        name: editItem.name,
        category: editItem.category,
        price: editItem.price,
        description: editItem.description || '',
        subCategory: editItem.subCategory || '',
        bestseller: editItem.bestseller
      });
      console.log('Backend URL:', backendUrl);
      console.log('Full URL:', backendUrl + '/api/product/update/' + editItem._id);
      console.log('Token:', token ? 'Token exists' : 'No token');
      console.log('Token length:', token ? token.length : 0);
      console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token');
      
      const updatePayload = {
        name: editItem.name.trim(),
        category: editItem.category.trim(),
        price: Number(editItem.price),
        description: editItem.description ? editItem.description.trim() : '',
        subCategory: editItem.subCategory.trim(),
        bestseller: editItem.bestseller
      }
      
      console.log('Update payload:', updatePayload);
      
      // Test admin authentication first
      try {
        const authTestResponse = await axios.get(backendUrl + '/test-admin', {
          headers: { token }
        });
        console.log('Admin auth test response:', authTestResponse.data);
      } catch (authError) {
        console.error('Admin auth test failed:', authError.response?.data || authError.message);
      }
      
      const response = await axios.post(
        backendUrl + '/api/product/update/' + editItem._id,
        updatePayload,
        { 
          headers: { 
            token,
            'Content-Type': 'application/json'
          } 
        }
      )

      console.log('Response:', response);

      if (response.data.success) {
        toast.success(response.data.message || 'Product updated successfully!')
        setEditItem(null)
        await fetchList()
      } else {
        toast.error(response.data.message || 'Failed to update product')
      }
    } catch (error) {
      console.error('Update product error:', error);
      console.log('Error response:', error.response);
      console.log('Error request:', error.request);
      console.log('Error config:', error.config);
      
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Failed to update product'
        toast.error(errorMessage)
        console.error('Server error:', errorMessage)
        console.error('Response status:', error.response.status)
        console.error('Response data:', error.response.data)
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
        console.error('Network error - no response received')
        console.error('Request details:', error.request)
      } else {
        toast.error(error.message || 'Failed to update product')
        console.error('Request setup error:', error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Filter products based on search and category
  const filteredProducts = list.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Get unique categories for filter
  const categories = ['all', ...new Set(list.map(product => product.category))]

  useEffect(() => {
    fetchList()
  }, [])

  if (isLoading && list.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          {ADMIN_CONSTANTS.PAGE_TITLES.PRODUCT_LIST}
        </h1>
        <p className="text-gray-400 mt-2">Manage all products including static and dynamic ones</p>
        <div className="mt-3 inline-flex items-center space-x-2 bg-blue-900/20 border border-blue-700/30 rounded-full px-4 py-2">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          <span className="text-blue-400 text-sm font-medium">Sorted: Bestsellers First</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[80px_2fr_1fr_120px_200px] items-center gap-4 py-4 px-6 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
          >
            {/* Product Image */}
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  className="w-16 h-16 object-cover rounded-lg border border-gray-600 shadow-sm" 
                  src={item.image[0]} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image'
                  }}
                />
                {item.image.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    +{item.image.length - 1}
                  </div>
                )}
                {/* Static Product Indicator */}
                {item.isStatic && (
                  <div className="absolute -top-1 -left-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    S
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-1">
              <h3 className="font-semibold text-white text-lg leading-tight">{item.name}</h3>
              {item.description && (
                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
              )}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>ID: {item._id?.slice(-6) || 'N/A'}</span>
                <span>Added: {new Date(item.date || Date.now()).toLocaleDateString()}</span>
                {item.isStatic && (
                  <span className="text-green-400 font-medium">Static Product</span>
                )}
              </div>
            </div>

            {/* Price and Category */}
            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">{currency}{item.price}</p>
              <p className="text-sm text-gray-400">{item.category}</p>
              <p className="text-xs text-gray-500">{item.subCategory}</p>
            </div>

            {/* Status */}
            <div className="text-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.bestseller 
                  ? 'bg-yellow-600 text-yellow-100' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {item.bestseller ? 'Bestseller' : 'Regular'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewDetails(item)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                title="View Details"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              
              {!item.isStatic && (
                <>
                  <button
                    onClick={() => setEditItem(item)}
                    className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200"
                    title="Edit Product"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                    title="Delete Product"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </>
              )}
              
              <button
                onClick={() => handleDuplicateProduct(item)}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
                title="Duplicate Product"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2m-6-4h8m-8-4h8" />
                </svg>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">No products found</p>
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Edit Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={editItem.name}
                  onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={editItem.description || ''}
                  onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    value={editItem.price}
                    onChange={(e) => setEditItem({...editItem, price: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                  <select
                    value={editItem.category}
                    onChange={(e) => setEditItem({...editItem, category: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Sub Category</label>
                <select
                  value={editItem.subCategory || ''}
                  onChange={(e) => setEditItem({...editItem, subCategory: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Sub Category</option>
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={editItem.bestseller}
                  onChange={(e) => setEditItem({...editItem, bestseller: e.target.checked})}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="bestseller" className="text-sm text-gray-300">Bestseller</label>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={updateProduct}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Update
              </button>
              <button
                onClick={() => setEditItem(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewDetailsItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">Product Details</h3>
              <button
                onClick={() => setViewDetailsItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Images */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Images</h4>
                <div className="grid grid-cols-2 gap-2">
                  {viewDetailsItem.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${viewDetailsItem.name} ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-600"
                    />
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-gray-400">Name:</span> <span className="text-white">{viewDetailsItem.name}</span></p>
                    <p><span className="text-gray-400">Price:</span> <span className="text-white">{currency}{viewDetailsItem.price}</span></p>
                    <p><span className="text-gray-400">Category:</span> <span className="text-white">{viewDetailsItem.category}</span></p>
                    <p><span className="text-gray-400">Sub-category:</span> <span className="text-white">{viewDetailsItem.subCategory}</span></p>
                    <p><span className="text-gray-400">Bestseller:</span> <span className="text-white">{viewDetailsItem.bestseller ? 'Yes' : 'No'}</span></p>
                    <p><span className="text-gray-400">Type:</span> <span className={`font-medium ${viewDetailsItem.isStatic ? 'text-green-400' : 'text-blue-400'}`}>
                      {viewDetailsItem.isStatic ? 'Static Product' : 'Dynamic Product'}
                    </span></p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Sizes Available</h4>
                  <div className="flex flex-wrap gap-2">
                    {viewDetailsItem.sizes.map((size, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700 text-white rounded-lg text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                
                {viewDetailsItem.description && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{viewDetailsItem.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default List
