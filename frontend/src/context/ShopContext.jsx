import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productAPI, cartAPI } from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await productAPI.getAllProducts();
            
            if (response.success) {
                // Sort products: bestsellers first, then by date (newest first)
                const sortedProducts = response.products.sort((a, b) => {
                    // First priority: bestsellers come first
                    if (a.bestseller && !b.bestseller) return -1;
                    if (!a.bestseller && b.bestseller) return 1;
                    
                    // Second priority: newer products first
                    const dateA = a.date || a.createdAt || 0;
                    const dateB = b.date || b.createdAt || 0;
                    return dateB - dateA;
                });
                
                setProducts(sortedProducts);
            } else {
                setError('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh products (useful after admin adds new products)
    const refreshProducts = () => {
        fetchProducts();
    };

    // Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select product size');
            return;
        }

        try {
            // Try to add to cart via API first (if user is logged in)
            const response = await cartAPI.addToCart(itemId, size);
            if (response.success) {
                toast.success('Added to cart successfully!');
                // Update local cart state
                let cartData = structuredClone(cartItems);
                if (cartData[itemId]) {
                    if (cartData[itemId][size]) {
                        cartData[itemId][size] += 1;
                    } else {
                        cartData[itemId][size] = 1;
                    }
                } else {
                    cartData[itemId] = {};
                    cartData[itemId][size] = 1;
                }
                setCartItems(cartData);
                return;
            }
        } catch (error) {
            console.log('API cart add failed, using local cart:', error);
        }

        // Fallback to local cart if API fails or user not logged in
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        toast.success('Added to cart!');
    }

    const updateQuantity = async (itemId, size, quantity) => {

        try {
            // Try to update cart via API first
            const response = await cartAPI.updateQuantity(itemId, size, quantity);
            if (response.success) {
                // Update local state
                let cartData = structuredClone(cartItems);
                cartData[itemId][size] = quantity;
                setCartItems(cartData);
                
                if (quantity === 0) {
                    toast.success('Item removed from cart');
                } else {
                    toast.success('Cart updated successfully');
                }
                return;
            }
        } catch (error) {
            console.log('API cart update failed, using local cart:', error);
        }

        // Fallback to local cart update
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        
        if (quantity === 0) {
            toast.success('Item removed from cart');
        } else {
            toast.success('Cart updated successfully');
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                if (cartItems[itemId][size] > 0) {
                    const product = products.find(p => p._id === itemId);
                    if (product) {
                        totalAmount += product.price * cartItems[itemId][size];
                    }
                }
            }
        }
        return totalAmount;
    }

    const proceedToCheckout = () => {
        if (getCartCount() === 0) {
            toast.error('Your cart is empty!');
            return;
        }
        navigate('/place-order');
    }

    // Clear cart after successful order placement
    const clearCart = async () => {
        try {
            // Try to clear backend cart first
            await cartAPI.clearCart();
        } catch (error) {
            console.log('Backend cart clear failed, clearing local cart only:', error);
        }
        
        // Clear local cart state
        setCartItems({});
        toast.success('Cart cleared after successful order!');
    }

    const contextValue = {
        products,
        currency,
        delivery_fee,
        navigate,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartCount,
        getCartAmount,
        proceedToCheckout,
        clearCart,
        isLoading,
        error,
        refreshProducts
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider