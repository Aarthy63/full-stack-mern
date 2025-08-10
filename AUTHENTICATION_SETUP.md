# Authentication System Setup Guide

This guide explains how to set up and use the complete authentication system for your MERN e-commerce application.

## 🚀 Features

- **User Registration & Login**: Secure user account creation and authentication
- **JWT Token Management**: Stateless authentication using JSON Web Tokens
- **Protected Routes**: Automatic redirection for unauthenticated users
- **User Profile Management**: View and manage user information
- **Secure Logout**: Proper token cleanup and session management
- **Responsive UI**: Dark/light theme support with Tailwind CSS

## 📁 File Structure

```
frontend/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx          # Authentication context
│   ├── components/
│   │   ├── ProtectedRoute.jsx       # Route protection component
│   │   └── Navbar.jsx               # Updated navbar with auth
│   └── pages/
│       ├── Login.jsx                 # Login/Register form
│       └── Profile.jsx               # User profile page

backend/
├── controllers/
│   └── userController.js            # User authentication logic
├── middleware/
│   └── auth.js                      # JWT verification middleware
├── routes/
│   └── userRoute.js                 # Authentication routes
└── models/
    └── userModel.js                 # User data model
```

## 🛠️ Backend Setup

### 1. Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_super_secret_jwt_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin_password_here
PORT=4000
```

### 2. Install Dependencies

```bash
cd backend
npm install
```

### 3. Start the Server

```bash
npm run server
```

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

## 🔐 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/user/register` | User registration | `{name, email, password}` |
| POST | `/api/user/login` | User login | `{email, password}` |
| GET | `/api/user/profile` | Get user profile | Headers: `{token}` |
| POST | `/api/user/admin` | Admin login | `{email, password}` |

### Response Format

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

## 🚦 How It Works

### 1. User Registration
- User fills out registration form
- Password is hashed using bcrypt
- JWT token is generated and returned
- User is automatically logged in

### 2. User Login
- User provides email and password
- Password is verified against stored hash
- JWT token is generated and returned
- User is redirected to home page

### 3. Protected Routes
- Routes wrapped with `<ProtectedRoute>` require authentication
- Unauthenticated users are redirected to login page
- JWT token is automatically included in API requests

### 4. Logout
- JWT token is removed from localStorage
- User state is cleared
- User is redirected to home page

## 🎯 Usage Examples

### Using Authentication in Components

```jsx
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
    const { user, isAuthenticated, logout } = useAuth();
    
    if (isAuthenticated()) {
        return (
            <div>
                <p>Welcome, {user.name}!</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }
    
    return <p>Please log in</p>;
};
```

### Protecting Routes

```jsx
import ProtectedRoute from '../components/ProtectedRoute';

<Route path="/orders" element={
    <ProtectedRoute>
        <Orders />
    </ProtectedRoute>
} />
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure, stateless authentication
- **Input Validation**: Email format and password strength validation
- **Protected Routes**: Automatic authentication checks
- **Token Cleanup**: Proper logout with token removal

## 🧪 Testing

### Backend Testing

Use the provided test script:

```bash
cd backend
node test-auth.js
```

### Frontend Testing

1. Start both frontend and backend servers
2. Navigate to `/login`
3. Try registering a new user
4. Test login with the created account
5. Verify protected routes work correctly
6. Test logout functionality

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend CORS is properly configured
2. **JWT Errors**: Check JWT_SECRET in .env file
3. **Database Connection**: Verify MongoDB is running
4. **Port Conflicts**: Ensure port 4000 is available

### Debug Steps

1. Check browser console for errors
2. Verify backend server is running
3. Check network tab for API calls
4. Verify environment variables are set correctly

## 📱 Features

- **Responsive Design**: Works on all device sizes
- **Theme Support**: Dark/light mode toggle
- **Toast Notifications**: Success/error feedback
- **Loading States**: Proper loading indicators
- **Form Validation**: Client-side validation
- **Auto-redirect**: Smart navigation after auth actions

## 🚀 Next Steps

After setting up authentication, you can:

1. Add password reset functionality
2. Implement email verification
3. Add social login (Google, Facebook)
4. Create user roles and permissions
5. Add session management
6. Implement rate limiting

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure environment variables are set correctly
4. Check that MongoDB is running
5. Verify ports are not in use

---

**Happy Coding! 🎉**
