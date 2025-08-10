import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const OffersCarousel = () => {
    const { isDark } = useTheme();
    const [currentSlide, setCurrentSlide] = useState(0);

    // Offer images - you can replace these with actual summer and billion day offer images
    const offers = [
        {
            id: 1,
            title: "SUMMER OFFERS",
            subtitle: "Up to 70% Off",
            description: "Beat the heat with our amazing summer collection. Lightweight fabrics, vibrant colors, and comfortable styles for the perfect summer look.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 2,
            title: "BILLION DAY OFFERS",
            subtitle: "Mega Sale Event",
            description: "Don't miss the biggest sale of the year! Massive discounts on premium fashion, electronics, and lifestyle products.",
            image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 3,
            title: "FLASH SALE",
            subtitle: "24 Hours Only",
            description: "Limited time offers on premium fashion. Hurry up before these deals disappear!",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offers.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, [offers.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevious = () => {
        setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % offers.length);
    };

    return (
        <div className='flex flex-col sm:flex-row border border-gray-400'>
            {/* Left Side - Offer Content */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6'>
                <div className={`${isDark ? 'text-white' : 'text-[#414141]'} text-center sm:text-left`}>
                    <div className='flex items-center justify-center sm:justify-start gap-2 mb-4'>
                        <p className={`w-8 md:w-11 h-[2px] ${isDark ? 'bg-white' : 'bg-[#414141]'}`}></p>
                        <p className='font-medium text-sm md:text-base'>{offers[currentSlide].title}</p>
                    </div>

                    <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed mb-4'>
                        {offers[currentSlide].subtitle}
                    </h1>

                    <p className={`text-sm md:text-base mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {offers[currentSlide].description}
                    </p>

                    <div className='flex items-center justify-center sm:justify-start gap-2'>
                        <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                        <p className={`w-8 md:w-11 h-[1px] ${isDark ? 'bg-white' : 'bg-[#414141]'}`}></p>
                    </div>
                </div>
            </div>

            {/* Right Side - Carousel */}
            <div className='w-full sm:w-1/2 relative overflow-hidden'>
                <div className='relative h-full'>
                    {offers.map((offer, index) => (
                        <div
                            key={offer.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <img 
                                className='w-full h-full object-cover' 
                                src={offer.image} 
                                alt={offer.title}
                            />
                            <div className='absolute inset-0 bg-black bg-opacity-20'></div>
                        </div>
                    ))}
                    
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrevious}
                        className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200 shadow-lg'
                        aria-label="Previous slide"
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                        </svg>
                    </button>
                    
                    <button
                        onClick={goToNext}
                        className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full transition-all duration-200 shadow-lg'
                        aria-label="Next slide"
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                    {offers.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentSlide 
                                    ? 'bg-white' 
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersCarousel;
