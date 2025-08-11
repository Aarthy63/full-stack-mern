import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
    const { isDark } = useTheme();
    const { user, token } = useAuth();
    const { cartItems, products, currency, delivery_fee, getCartAmount, navigate, clearCart } = useContext(ShopContext);
    const [method, setMethod] = useState('cod');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    // Load Razorpay script
    useEffect(() => {
        if (method === 'razorpay') {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
            
            return () => {
                document.body.removeChild(script);
            };
        }
    }, [method]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Validate form data
    const validateForm = () => {
        const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zipcode', 'country', 'phone'];
        for (const field of requiredFields) {
            if (!formData[field].trim()) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                return false;
            }
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address');
            return false;
        }
        
        return true;
    };

    // Prepare cart items for order
    const prepareOrderItems = () => {
        const items = [];
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const product = products.find(p => p._id === itemId);
                    if (product) {
                        items.push({
                            _id: itemId,
                            name: product.name,
                            price: product.price,
                            size: size,
                            quantity: cartItems[itemId][size],
                            image: product.image[0]
                        });
                    }
                }
            }
        }
        return items;
    };

    // Handle Razorpay payment
    const handleRazorpayPayment = async (orderData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/order/razorpay`, orderData, {
                headers: { token }
            });

            if (response.data.success) {
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: orderData.amount * 100,
                    currency: 'INR',
                    name: 'Fashion Store',
                    description: 'Order Payment',
                    order_id: response.data.order.id,
                    handler: async function (response) {
                        try {
                            const verifyResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/order/verify-razorpay`, {
                                userId: user._id,
                                razorpay_order_id: response.razorpay_order_id
                            }, {
                                headers: { token }
                            });

                            if (verifyResponse.data.success) {
                                toast.success('Payment successful! Order placed.');
                                clearCart(); // Clear the cart
                                navigate('/orders');
                            } else {
                                toast.error('Payment verification failed');
                            }
                        } catch (error) {
                            console.error('Payment verification error:', error);
                            toast.error('Payment verification failed');
                        }
                    },
                    prefill: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        contact: formData.phone
                    },
                    theme: {
                        color: '#000000'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                toast.error(response.data.message || 'Failed to create Razorpay order');
            }
        } catch (error) {
            console.error('Razorpay order creation error:', error);
            toast.error('Failed to create payment order');
        }
    };

    // Place order
    const handlePlaceOrder = async () => {
        if (!validateForm()) return;
        
        if (!user || !token) {
            toast.error('Please login to place an order');
            navigate('/login');
            return;
        }

        const items = prepareOrderItems();
        if (items.length === 0) {
            toast.error('Your cart is empty');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const orderData = {
                userId: user._id,
                items: items,
                amount: getCartAmount() + delivery_fee,
                address: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipcode: formData.zipcode,
                    country: formData.country,
                    phone: formData.phone
                }
            };

            let response;
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

            if (method === 'cod') {
                response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
                    headers: { token }
                });
                
                if (response.data.success) {
                    toast.success('Order placed successfully! You will receive a confirmation email shortly.');
                    clearCart(); // Clear the cart for COD
                    navigate('/orders');
                }
            } else if (method === 'stripe') {
                response = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
                    headers: { token }
                });
                
                if (response.data.success) {
                    window.location.href = response.data.session_url;
                }
            } else if (method === 'razorpay') {
                await handleRazorpayPayment(orderData);
            }

            if (response && !response.data.success) {
                toast.error(response.data.message || 'Failed to place order');
            }
        } catch (error) {
            console.error('Order placement error:', error);
            if (error.response) {
                toast.error(error.response.data?.message || 'Failed to place order');
            } else if (error.request) {
                toast.error('Network error. Please check your connection.');
            } else {
                toast.error(error.message || 'Failed to place order');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="text" 
                        placeholder='First name'
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="text" 
                        placeholder='Last name'
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input 
                    className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                    type="email" 
                    placeholder='Email address'
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input 
                    className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                    type="text" 
                    placeholder='Street'
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    required
                />
                <div className='flex gap-3'>
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="text" 
                        placeholder='City'
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="text" 
                        placeholder='State'
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className='flex gap-3'>
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="number" 
                        placeholder='Zipcode'
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleInputChange}
                        required
                    />
                    <input 
                        className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                        type="text" 
                        placeholder='Country'
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <input 
                    className={`border rounded py-1.5 px-3.5 w-full ${isDark ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'}`} 
                    type="text" 
                    placeholder='Phone'
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div 
                            onClick={() => setMethod('stripe')} 
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} ${method === 'stripe' ? 'border-blue-500 bg-blue-50' : ''}`}
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-blue-500' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div 
                            onClick={() => setMethod('razorpay')} 
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} ${method === 'razorpay' ? 'border-blue-500 bg-blue-50' : ''}`}
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-blue-500' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div 
                            onClick={() => setMethod('cod')} 
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${isDark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'} ${method === 'cod' ? 'border-blue-500 bg-blue-50' : ''}`}
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-blue-500' : ''}`}></p>
                            <p className={`text-sm font-medium mx-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button 
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className={`px-16 py-3 text-sm transition-colors duration-200 ${
                                isDark 
                                    ? 'bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:cursor-not-allowed' 
                                    : 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder
