# Admin Panel Troubleshooting Guide

This guide helps resolve common issues with the admin panel functionality.

## Common Issues and Solutions

### 1. Product Editing Not Working

#### Symptoms:
- Edit button opens modal but changes don't save
- Error messages when trying to update products
- Products revert to original values after refresh

#### Possible Causes and Solutions:

**A. Authentication Issues**
```bash
# Check if admin token is valid
curl -H "token: YOUR_ADMIN_TOKEN" http://localhost:4000/test-admin
```

**B. Environment Variables Missing**
Ensure your backend `.env` file has:
```env
JWT_SECRET=your_jwt_secret_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin@123#
```

**C. Product ID Issues**
- Verify the product ID is valid MongoDB ObjectId
- Check if product exists in database
- Ensure product is not marked as static

**D. API Endpoint Issues**
- Verify backend server is running on port 4000
- Check if `/api/product/update/:id` route is accessible
- Ensure adminAuth middleware is working

#### Debug Steps:
1. Open browser console and check for errors
2. Look for network request failures
3. Verify admin token is being sent in headers
4. Check backend logs for authentication errors

### 2. Order Status Updates Not Reflecting in Frontend

#### Symptoms:
- Admin changes order status but frontend doesn't show updates
- Order status remains unchanged after admin update
- Frontend shows old status even after refresh

#### Solutions:

**A. Frontend Orders Page**
- Ensure frontend Orders page is fetching real order data
- Check if `fetchUserOrders()` function is called
- Verify API endpoint `/api/order/userorders` is working

**B. Real-time Updates**
- Add refresh functionality to frontend
- Implement polling for order status changes
- Consider WebSocket implementation for real-time updates

**C. Data Synchronization**
- Verify order status is saved in database
- Check if frontend is using cached data
- Ensure proper error handling for failed updates

### 3. Admin Authentication Problems

#### Symptoms:
- Cannot login to admin panel
- "Not Authorized" errors
- Token validation failures

#### Solutions:

**A. Check Environment Variables**
```bash
# Backend .env file must have:
JWT_SECRET=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin@123#
```

**B. Verify JWT Secret**
```bash
# Generate new JWT secret if needed
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**C. Check Admin Credentials**
- Ensure email and password match exactly
- Check for extra spaces or special characters
- Verify case sensitivity

### 4. Network and Connection Issues

#### Symptoms:
- "Network error" messages
- Cannot connect to backend
- API calls timing out

#### Solutions:

**A. Backend Server**
```bash
# Check if backend is running
curl http://localhost:4000/

# Check backend logs
npm run server
```

**B. CORS Issues**
- Verify backend CORS configuration
- Check if frontend URL is allowed
- Ensure proper headers are sent

**C. Port Conflicts**
- Verify port 4000 is not used by other services
- Check firewall settings
- Try different port if needed

## Testing and Debugging

### 1. Test Admin Authentication
```bash
cd backend
node test-admin-auth.js
```

### 2. Test Product Update
```bash
cd backend
node test-admin-product-update.js
```

### 3. Test Cart Clearing
```bash
cd backend
node test-cart-clearing.js
```

### 4. Manual API Testing
```bash
# Test admin login
curl -X POST http://localhost:4000/api/user/admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin@123#"}'

# Test product update (replace TOKEN and PRODUCT_ID)
curl -X POST http://localhost:4000/api/product/update/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "token: YOUR_ADMIN_TOKEN" \
  -d '{"name":"Test Product","price":100,"category":"Men","subCategory":"Topwear"}'
```

## Environment Setup Checklist

### Backend (.env)
- [ ] MONGODB_URI is set and valid
- [ ] JWT_SECRET is set and secure
- [ ] ADMIN_EMAIL matches exactly
- [ ] ADMIN_PASSWORD matches exactly
- [ ] PORT is set (default: 4000)

### Frontend (.env)
- [ ] VITE_BACKEND_URL is set correctly
- [ ] VITE_RAZORPAY_KEY_ID is set (if using Razorpay)

### Database
- [ ] MongoDB is running and accessible
- [ ] Database connection is successful
- [ ] Collections exist and have data

## Performance Optimization

### 1. Order Status Updates
- Implement debounced status updates
- Add loading states for better UX
- Cache order data to reduce API calls

### 2. Product Management
- Add pagination for large product lists
- Implement search and filtering
- Add bulk operations for multiple products

### 3. Real-time Features
- Consider WebSocket for live updates
- Implement optimistic updates
- Add offline support with service workers

## Security Considerations

### 1. Admin Authentication
- Use strong passwords
- Implement rate limiting
- Add two-factor authentication
- Regular token rotation

### 2. API Security
- Validate all input data
- Implement proper error handling
- Add request logging
- Use HTTPS in production

### 3. Data Protection
- Sanitize user inputs
- Implement proper access controls
- Regular security audits
- Backup important data

## Getting Help

If you're still experiencing issues:

1. **Check the logs**: Both frontend and backend console logs
2. **Verify environment**: Ensure all variables are set correctly
3. **Test endpoints**: Use the provided test scripts
4. **Check network**: Verify connectivity and CORS settings
5. **Review code**: Look for syntax errors or logic issues

## Common Error Messages

| Error Message | Possible Cause | Solution |
|---------------|----------------|----------|
| "Not Authorized Login Again" | Invalid or expired token | Re-login to admin panel |
| "Product not found" | Invalid product ID | Check product exists in database |
| "Cannot update static products" | Product is marked as static | Use different product for testing |
| "Network error" | Backend server down | Start backend server |
| "Validation Error" | Invalid input data | Check form data format |
| "Token expired" | JWT token expired | Re-login to admin panel |
