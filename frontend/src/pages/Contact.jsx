import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { useTheme } from '../context/ThemeContext'

const Contact = () => {
  const { isDark } = useTheme();

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-gray-600'}`}>Our Store</p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-500'}>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-500'}>
            Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
          </p>
          <p className={`font-semibold text-xl ${isDark ? 'text-white' : 'text-gray-600'}`}>Careers at Forever</p>
          <p className={isDark ? 'text-gray-300' : 'text-gray-500'}>
            Learn more about our teams and job openings.
          </p>
          <button className={`border px-8 py-4 text-sm transition-all duration-500 ${
            isDark 
              ? 'border-white text-white hover:bg-white hover:text-black' 
              : 'border-black text-black hover:bg-black hover:text-white'
          }`}>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
