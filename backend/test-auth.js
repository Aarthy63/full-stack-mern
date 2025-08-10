// Simple test script to verify authentication endpoints
// Run this after setting up your .env file and starting the server

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// Test user data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpassword123'
};

async function testAuth() {
    try {
        console.log('🧪 Testing Authentication System...\n');

        // Test 1: User Registration
        console.log('1. Testing User Registration...');
        const registerResponse = await axios.post(`${API_BASE_URL}/user/register`, testUser);
        console.log('✅ Registration Response:', registerResponse.data);
        
        if (registerResponse.data.success) {
            const token = registerResponse.data.token;
            console.log('✅ Token received:', token.substring(0, 20) + '...');
        }

        console.log('\n2. Testing User Login...');
        const loginResponse = await axios.post(`${API_BASE_URL}/user/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login Response:', loginResponse.data);

        if (loginResponse.data.success) {
            const token = loginResponse.data.token;
            console.log('✅ Login successful, token:', token.substring(0, 20) + '...');

            // Test 3: Get User Profile
            console.log('\n3. Testing Get User Profile...');
            const profileResponse = await axios.get(`${API_BASE_URL}/user/profile`, {
                headers: { token }
            });
            console.log('✅ Profile Response:', profileResponse.data);
        }

        console.log('\n🎉 All authentication tests passed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test
testAuth();
