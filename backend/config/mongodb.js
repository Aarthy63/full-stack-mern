import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Use default connection string if MONGODB_URI is not set
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/e-commerce";
        
        mongoose.connection.on('connected',() => {
            console.log("DB Connected");
        })

        mongoose.connection.on('error', (err) => {
            console.log("DB Connection Error:", err.message);
        })

        await mongoose.connect(mongoURI);
    } catch (error) {
        console.log("Failed to connect to MongoDB:", error.message);
        // Continue running the server even if DB connection fails
    }
}

export default connectDB;