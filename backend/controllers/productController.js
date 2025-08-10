import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// Static products data (same as frontend assets.js)
const staticProducts = [
    {
        _id: "aaaaa",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 100,
        image: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["S", "M", "L"],
        date: 1716634345448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaab",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 200,
        image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716621345448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaac",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 220,
        image: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716234545448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaad",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 110,
        image: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "XXL"],
        date: 1716621345448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaae",
        name: "Women Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 130,
        image: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500"],
        category: "Women",
        subCategory: "Topwear",
        sizes: ["M", "L", "XL"],
        date: 1716622345448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaaf",
        name: "Girls Round Neck Cotton Top",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 140,
        image: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500"],
        category: "Kids",
        subCategory: "Topwear",
        sizes: ["S", "L", "XL"],
        date: 1716623423448,
        bestseller: true,
        isStatic: true
    },
    {
        _id: "aaaag",
        name: "Men Tapered Fit Flat-Front Trousers",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 190,
        image: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500"],
        category: "Men",
        subCategory: "Bottomwear",
        sizes: ["S", "L", "XL"],
        date: 1716621542448,
        bestseller: false,
        isStatic: true
    },
    {
        _id: "aaaah",
        name: "Men Round Neck Pure Cotton T-shirt",
        description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
        price: 140,
        image: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
        category: "Men",
        subCategory: "Topwear",
        sizes: ["S", "M", "L", "XL"],
        date: 1716622345448,
        bestseller: false,
        isStatic: true
    }
];

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
            isStatic: false
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product - now includes both static and dynamic products
const listProducts = async (req, res) => {
    try {
        
        // Get dynamic products from database
        const dynamicProducts = await productModel.find({});
        
        // Combine static and dynamic products
        const allProducts = [...staticProducts, ...dynamicProducts];
        
        // Sort products: bestsellers first, then by date (newest first)
        const sortedProducts = allProducts.sort((a, b) => {
            // First priority: bestsellers come first
            if (a.bestseller && !b.bestseller) return -1;
            if (!a.bestseller && b.bestseller) return 1;
            
            // Second priority: newer products first
            const dateA = a.date || a.createdAt || 0;
            const dateB = b.date || b.createdAt || 0;
            return dateB - dateA;
        });
        
        res.json({success: true, products: sortedProducts})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;
        
        // First check if the product exists in the database
        const existingProduct = await productModel.findById(id);
        
        if (!existingProduct) {
            // If not found in database, check if it's a static product
            const staticProduct = staticProducts.find(p => p._id === id);
            if (staticProduct) {
                return res.json({ success: false, message: "Cannot delete static products" });
            }
            return res.json({ success: false, message: "Product not found" });
        }
        
        // Check if the product is marked as static in the database
        if (existingProduct.isStatic) {
            return res.json({ success: false, message: "Cannot delete static products" });
        }
        
        await productModel.findByIdAndDelete(id);
        res.json({success: true, message: "Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body;
        
        // First check static products
        let product = staticProducts.find(p => p._id === productId);
        
        // If not found in static, check database
        if (!product) {
            product = await productModel.findById(productId);
        }
        
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }
        
        res.json({success: true, product})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for updating product
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller } = req.body;
        const { id } = req.params; // Get ID from URL parameters
        
        console.log("=== UPDATE PRODUCT DEBUG ===");
        console.log("Product ID:", id);
        console.log("Request body:", req.body);
        console.log("Request params:", req.params);
        
        // Validate required fields
        if (!name || !price || !category || !subCategory) {
            return res.json({ 
                success: false, 
                message: "Missing required fields: name, price, category, and subCategory are required" 
            });
        }
        
        // Validate MongoDB ObjectId format
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return res.json({ 
                success: false, 
                message: "Invalid product ID format" 
            });
        }
        
        // First check if the product exists in the database
        const existingProduct = await productModel.findById(id);
        console.log("Existing product from DB:", existingProduct);
        
        if (!existingProduct) {
            // If not found in database, check if it's a static product
            const staticProduct = staticProducts.find(p => p._id === id);
            console.log("Static product check:", staticProduct);
            if (staticProduct) {
                return res.json({ success: false, message: "Cannot update static products" });
            }
            return res.json({ success: false, message: "Product not found" });
        }
        
        // Check if the product is marked as static in the database
        if (existingProduct.isStatic) {
            return res.json({ success: false, message: "Cannot update static products" });
        }
        
        const updateData = {
            name: name.trim(),
            description: description ? description.trim() : '',
            price: Number(price),
            category: category.trim(),
            subCategory: subCategory.trim(),
            bestseller: bestseller === "true" ? true : false
        };
        
        // Validate price
        if (isNaN(updateData.price) || updateData.price <= 0) {
            return res.json({ 
                success: false, 
                message: "Invalid price. Price must be a positive number" 
            });
        }
        
        console.log("Update data:", updateData);
        
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        console.log("Updated product result:", updatedProduct);
        
        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }
        
        res.json({ success: true, message: "Product Updated Successfully", product: updatedProduct });
    } catch (error) {
        console.log("Update product error:", error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct }