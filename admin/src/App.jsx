import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Dashboard from './pages/Dashboard'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
export const currency = '$'

console.log('Backend URL:', backendUrl)

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    localStorage.setItem('token',token)
    console.log('Token updated:', token ? 'Token exists' : 'No token')
  },[token])

  console.log('Rendering App, token:', token ? 'exists' : 'empty')
  
  return (
    <div className='bg-black min-h-screen text-white'>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {!token ? (
        <Login setToken={setToken} setIsLoading={setIsLoading} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[75%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-300'>
              <Routes>
                <Route path='/' element={<Dashboard token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App