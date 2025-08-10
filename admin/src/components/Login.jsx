import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({setToken, setIsLoading}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsSubmitting(true)
            setIsLoading(true)
            
            const response = await axios.post(backendUrl + '/api/user/admin', {email, password})
            if (response.data.success) {
                console.log('Login successful, setting token:', response.data.token)
                setToken(response.data.token)
                toast.success('Login successful! Welcome to Admin Panel')
            } else {
                console.log('Login failed:', response.data.message)
                toast.error(response.data.message)
            }
             
        } catch (error) {
            console.log('Login error:', error);
            if (error.response) {
                toast.error(error.response.data?.message || 'Login failed')
            } else if (error.request) {
                toast.error('Network error. Please check your connection.')
            } else {
                toast.error(error.message || 'Login failed')
            }
        } finally {
            setIsSubmitting(false)
            setIsLoading(false)
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className='relative z-10 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-2xl px-10 py-12 max-w-md w-full mx-4 border border-gray-700 backdrop-blur-sm'>
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-white mb-2'>Admin Panel</h1>
          <p className='text-gray-400'>Access your e-commerce dashboard</p>
        </div>
        
        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-300'>Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                onChange={(e)=>setEmail(e.target.value)} 
                value={email} 
                className='w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                type="email" 
                placeholder='your@email.com' 
                required 
              />
            </div>
          </div>
          
          <div className='space-y-2'>
            <label className='text-sm font-medium text-gray-300'>Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                onChange={(e)=>setPassword(e.target.value)} 
                value={password} 
                className='w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200' 
                type="password" 
                placeholder='Enter your password' 
                required 
              />
            </div>
          </div>
          
          <button 
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              isSubmitting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
            }`} 
            type="submit"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login