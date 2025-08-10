import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { ADMIN_CONSTANTS } from '../constants/adminConstants'
import Chat from '../components/Chat'
import Charts from '../components/Charts'

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      // Fetch products count
      const productsResponse = await axios.get(backendUrl + '/api/product/list')
      const productsCount = productsResponse.data.success ? productsResponse.data.products.length : 0
      
      // Fetch orders count and revenue
      const ordersResponse = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token }
      })
      
      let ordersCount = 0
      let totalRevenue = 0
      let recentOrders = []
      
      if (ordersResponse.data.success) {
        ordersCount = ordersResponse.data.orders.length
        totalRevenue = ordersResponse.data.orders.reduce((sum, order) => sum + (order.amount || 0), 0)
        recentOrders = ordersResponse.data.orders.slice(0, 5) // Get last 5 orders
      }
      
      setStats({
        totalProducts: productsCount,
        totalOrders: ordersCount,
        totalRevenue: totalRevenue,
        recentOrders: recentOrders
      })
    } catch (error) {
      console.log('Dashboard error:', error)
      if (error.response) {
        toast.error(error.response.data?.message || 'Failed to fetch dashboard data')
      } else if (error.request) {
        toast.error('Network error. Please check your connection.')
      } else {
        toast.error(error.message || 'Failed to fetch dashboard data')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Products</p>
                    <p className="text-3xl font-bold text-white">{stats.totalProducts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold text-white">{currency}{stats.totalRevenue.toFixed(2)}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Recent Orders</h2>
              {stats.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Order #{order._id?.slice(-6) || 'N/A'}</p>
                          <p className="text-gray-400 text-sm">{order.date || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{currency}{order.amount || 0}</p>
                        <p className="text-gray-400 text-sm">{order.status || 'Pending'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No recent orders found</p>
                </div>
              )}
            </div>
          </div>
        )
      case 'analytics':
        return <Charts stats={stats} />
      case 'chat':
        return <Chat />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          {ADMIN_CONSTANTS.PAGE_TITLES.DASHBOARD}
        </h1>
        <p className="text-gray-400 mt-2">Welcome to your e-commerce control center</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Analytics & Charts
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'chat'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          Customer Support
        </button>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}

export default Dashboard
