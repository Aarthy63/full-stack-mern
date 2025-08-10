# Environment Setup for Backend

Create a `.env` file in the backend directory with the following variables:

## Required Environment Variables

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT Secret for authentication (use a strong, random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Admin credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password_here

# Server port (optional, defaults to 4000)
PORT=4000
```

## Optional Environment Variables

```env
# Cloudinary configuration (if using image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How to Generate JWT_SECRET

You can generate a secure JWT secret using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use any strong random string generator
```

## Important Notes

1. **Never commit your .env file to version control**
2. **Use strong, unique passwords for production**
3. **Change default admin credentials in production**
4. **Ensure MongoDB is running and accessible**

## Testing the Setup

After setting up the environment variables:

1. Start the backend server: `npm run server`
2. Test the API endpoints
3. Verify authentication is working
