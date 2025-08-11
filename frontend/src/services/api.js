import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

// Product API calls
export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/product/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.post('/api/product/single', { productId });
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      const response = await api.post(`/api/product/update/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/api/product/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
};

// User API calls
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/api/user/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.post('/api/user/update', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// Cart API calls
export const cartAPI = {
  // Add to cart
  addToCart: async (itemId, size) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      
      // Get user ID from token or user context
      const response = await api.post('/api/cart/add', { 
        itemId, 
        size,
        userId: localStorage.getItem('userId') || 'temp' // You might need to store userId in localStorage
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  // Get cart items
  getCart: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      
      const response = await api.post('/api/cart/get', {
        userId: localStorage.getItem('userId') || 'temp'
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Update cart quantity
  updateQuantity: async (itemId, size, quantity) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      
      const response = await api.post('/api/cart/update', { 
        itemId, 
        size, 
        quantity,
        userId: localStorage.getItem('userId') || 'temp'
      });
      return response.data;
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  // Remove from cart
  removeFromCart: async (itemId, size) => {
    try {
      const response = await api.post('/api/cart/remove', { itemId, size });
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await api.post('/api/cart/clear', {
        userId: localStorage.getItem('userId') || 'temp'
      });
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};

// Hugging Face AI API calls
export const huggingFaceAPI = {
  // Chat with AI model
  chatWithAI: async (message) => {
    try {
      // This is a placeholder for actual Hugging Face API integration
      // You would need to:
      // 1. Get a Hugging Face API token
      // 2. Use the appropriate model endpoint
      // 3. Handle the API response properly
      
      // Example implementation:
      // const response = await fetch('https://api-inference.huggingface.co/models/your-model', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ inputs: message }),
      // });
      // return await response.json();
      
      // For now, return a mock response
      return {
        success: true,
        response: `AI Assistant: I can help you with fashion advice, product recommendations, and shopping assistance. For "${message}", I recommend checking our latest collection and using our size guide for the best fit.`
      };
    } catch (error) {
      console.error('Error chatting with AI:', error);
      throw error;
    }
  },

  // Get product recommendations
  getProductRecommendations: async (userPreferences) => {
    try {
      // Mock implementation for product recommendations
      return {
        success: true,
        recommendations: [
          "Based on your style preferences, you might like our casual collection",
          "For your size, I recommend checking our size guide",
          "Consider our trending items for this season"
        ]
      };
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },

  // Style analysis
  analyzeStyle: async (styleDescription) => {
    try {
      // Mock implementation for style analysis
      return {
        success: true,
        analysis: `Based on your description: "${styleDescription}", I can suggest several styling options and product combinations that would work well together.`
      };
    } catch (error) {
      console.error('Error analyzing style:', error);
      throw error;
    }
  }
};

export default api;
