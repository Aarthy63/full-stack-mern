import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import Title from '../components/Title'
import { toast } from 'react-toastify'
import axios from 'axios'

const Orders = () => {
    const { currency } = useContext(ShopContext);
    const { isDark } = useTheme();
    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user orders
    const fetchUserOrders = async () => {
        if (!user || !token) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/order/userorders`,
                { userId: user._id },
                { headers: { token } }
            );

            if (response.data.success) {
                setOrders(response.data.orders.reverse()); // Show newest first
            } else {
                toast.error(response.data.message || 'Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response) {
                toast.error(error.response.data?.message || 'Failed to fetch orders');
            } else if (error.request) {
                toast.error('Network error. Please check your connection.');
            } else {
                toast.error(error.message || 'Failed to fetch orders');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Get status color based on order status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'bg-blue-500';
            case 'Packing':
                return 'bg-yellow-500';
            case 'Shipped':
                return 'bg-purple-500';
            case 'Out for delivery':
                return 'bg-orange-500';
            case 'Delivered':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Get status text color
    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Order Placed':
                return 'text-blue-100';
            case 'Packing':
                return 'text-yellow-100';
            case 'Shipped':
                return 'text-purple-100';
            case 'Out for delivery':
                return 'text-orange-100';
            case 'Delivered':
                return 'text-green-100';
            default:
                return 'text-gray-100';
        }
    };

    useEffect(() => {
        fetchUserOrders();
    }, [user, token]);

    if (!user) {
        return (
            <div className={`border-t pt-16 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className='text-2xl'>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>
                <div className="text-center py-16">
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Please login to view your orders
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={`border-t pt-16 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className='text-2xl'>
                    <Title text1={'MY'} text2={'ORDERS'} />
                </div>
                <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Loading your orders...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`border-t pt-16 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={order._id} className={`border rounded-lg p-6 ${
                            isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
                        }`}>
                            {/* Order Header */}
                            <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 pb-4 border-b ${
                                isDark ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                                <div>
                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Order #{order._id.slice(-8).toUpperCase()}
                                    </h3>
                                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        Placed on {new Date(order.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)} ${getStatusTextColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                    <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {currency}{order.amount}
                                    </span>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="space-y-3 mb-4">
                                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Items:</h4>
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className={`flex items-center gap-4 p-3 rounded-lg ${
                                        isDark ? 'bg-gray-700' : 'bg-gray-50'
                                    }`}>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {item.name}
                                            </p>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Size: {item.size} | Quantity: {item.quantity}
                                            </p>
                                            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {currency}{item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Details */}
                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg ${
                                isDark ? 'bg-gray-700' : 'bg-gray-50'
                            }`}>
                                <div>
                                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Delivery Address:
                                    </h4>
                                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <p>{order.address.firstName} {order.address.lastName}</p>
                                        <p>{order.address.street}</p>
                                        <p>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                                        <p>{order.address.country}</p>
                                        <p>Phone: {order.address.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        Order Details:
                                    </h4>
                                    <div className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        <p>Payment Method: {order.paymentMethod}</p>
                                        <p>Payment Status: {order.payment ? 'Paid' : 'Pending'}</p>
                                        <p>Total Items: {order.items.length}</p>
                                        <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className={`text-xl font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        No orders yet
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Start shopping to see your orders here
                    </p>
                </div>
            )}
        </div>
    )
}

export default Orders
