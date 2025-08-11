import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// Set default JWT secret if not provided
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'default_jwt_secret_change_in_production';
    console.log('Warning: Using default JWT_SECRET. Please set JWT_SECRET in environment variables for production.');
}

// Set default admin credentials if not provided
if (!process.env.ADMIN_EMAIL) {
    process.env.ADMIN_EMAIL = 'admin@example.com';
    console.log('Warning: Using default ADMIN_EMAIL. Please set ADMIN_EMAIL in environment variables for production.');
}

if (!process.env.ADMIN_PASSWORD) {
    process.env.ADMIN_PASSWORD = 'admin123';
    console.log('Warning: Using default ADMIN_PASSWORD. Please set ADMIN_PASSWORD in environment variables for production.');
}

// Connect to database and cloudinary
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : '+ port))
console.log("port: ", port);