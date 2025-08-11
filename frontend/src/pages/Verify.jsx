import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useContext(ShopContext);
    const { user, token } = useAuth();

    useEffect(() => {
        const verifyPayment = async () => {
            const success = searchParams.get('success');
            const orderId = searchParams.get('orderId');

            if (!success || !orderId) {
                toast.error('Invalid verification parameters');
                navigate('/');
                return;
            }

            if (!user || !token) {
                toast.error('Please login to verify payment');
                navigate('/login');
                return;
            }

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/api/order/verifyStripe`,
                    {
                        orderId,
                        success,
                        userId: user._id
                    },
                    {
                        headers: { token }
                    }
                );

                if (response.data.success) {
                    if (success === 'true') {
                        toast.success('Payment successful! Order placed.');
                        clearCart(); // Clear the cart after successful payment
                        navigate('/orders');
                    } else {
                        toast.error('Payment was cancelled or failed');
                        navigate('/place-order');
                    }
                } else {
                    toast.error('Payment verification failed');
                    navigate('/place-order');
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                toast.error('Payment verification failed');
                navigate('/place-order');
            }
        };

        verifyPayment();
    }, [searchParams, user, token, navigate, clearCart]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-lg">Verifying payment...</p>
            </div>
        </div>
    );
};

export default Verify;
