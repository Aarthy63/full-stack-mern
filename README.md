# 🛒 Full Stack E-commerce Project

A complete **Full Stack E-commerce Application** built with:
- **Frontend**: Vite + React
- **Backend**: Node.js + Express + MongoDB
- **Admin Panel**: Vite + React (for product & order management)
- **AI Integration**: Hugging Face API for chatbot features
- **Development Tools**: Cursor AI, Trae AI, and Cline for assisted coding

---

## 📂 Project Structure

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/full-stack-mern.git
cd full-stack-mern

cd frontend
npm install
**Run Development Server:**  npm run dev

# Backend URL
VITE_BACKEND_URL=http://localhost:4000

# Hugging Face AI Integration
VITE_HUGGINGFACE_API_KEY=OINPNasfknkjyuiwerLKKJ
VITE_HUGGINGFACE_MODEL=microsoft/DialoGPT-medium

# Debug Mode (optional)
VITE_DEBUG_AI=false
----------------------------------------
3️⃣ Backend Setup
cd backend
npm install

npm start


JWT_SECRET="KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin@123#"

MONGODB_URI="mongodb://127.0.0.1:27017"

CLOUDINARY_API_KEY="288265176938112"
CLOUDINARY_SECRET_KEY="ki43TF4tMVn0ZiJX9NuQP4uiIu4"
CLOUDINARY_NAME="dsg7ohatq"

STRIPE_SECRET_KEY=asfasfsafasfs"

RAZORPAY_KEY_SECRET="TYQzxCxUleHg7Vt5iEaoyfjr"
RAZORPAY_KEY_ID="rzp_test_Eil9oA2dIdKYcr"

4️⃣ Admin Panel Setup
cd admin
npm install

npm run dev
VITE_BACKEND_URL=http://localhost:4000

---------------------------------------------------------------
💡 Features
User-facing e-commerce site with product listings, cart, checkout

Admin Panel to manage products & orders

AI Chatbot powered by Hugging Face

Secure Authentication with JWT

Payments via Stripe & Razorpay

Cloud Image Uploads with Cloudinary

🛠 Tools Used
Cursor AI → AI-assisted coding

Trae AI → API development & testing

Cline → AI code reviews & automation

Hugging Face → Conversational AI model (DialoGPT)

🚀 Deployment
Frontend: Netlify / Vercel (Build Command: npm run build, Publish Dir: dist)

Backend: Render / Railway / Heroku

Admin Panel: Netlify / Vercel
