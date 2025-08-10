import axios from 'axios';

const testProductUpdate = async () => {
  try {
    console.log('Testing product update functionality...');
    
    // Test with a valid product ID format
    const testId = '507f1f77bcf86cd799439011'; // Valid MongoDB ObjectId format
    
    const response = await axios.post(`http://localhost:4000/api/product/update/${testId}`, {
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      category: 'Test Category',
      subCategory: 'Test SubCategory',
      bestseller: false
    });
    
    console.log('Response:', response.data);
  } catch (error) {
    console.log('Error:', error.response?.data || error.message);
  }
};

testProductUpdate();
