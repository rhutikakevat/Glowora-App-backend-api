const express = require("express");
const {initialDatabase} = require("./db/db.connect");
const Cosmetic = require("./models/cosmetic.models");
const Category = require("./models/category.model")
const WishlistProducts = require("./models/wishlist.model")
const cors = require("cors");
require("dotenv").config()
const app = express();

const corsOptions = {
    origin:"*",
    credentials:true,
    optionSuccessStatus:200,
}

initialDatabase();

app.use(express.json());
app.use(cors(corsOptions));

// Products Routes 

// Create a new Data with POST route for Products

async function createCosmeticData (seedProductsData){
    try{
        const newData = new Cosmetic(seedProductsData);
        const savedData = await newData.save();

        return savedData;
    }catch(error){
        console.log("Error while creating data: ",error);
    }  
}            

app.post("/api/products",async (req,res)=>{
    try {
        const createData = await createCosmeticData(req.body);

        res.status(201).json({
            message:"Data created successfully.",
            data: createData,
        })
    } catch (error) {
        res.status(500).json({error:"Failed to create a data"})
    }
})

// GET method - gets all Products from the DB

async function readAllProducts() {
    try {
        const allProducts = await Cosmetic.find().populate("category");

        return allProducts;
    } catch (error) {
        console.log(error);
    }
}

app.get("/api/products",async (req,res)=>{
    try {
        const products = await readAllProducts();
        if (products.length === 0) {
            return res.status(404).json({ error: "Products not found" });
        }

        res.status(200).json({data:{products}})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch products."})
    }
});

// GET method - gets Product by product id from the DB

async function readProductByID(productId) {
    try {
        const productById = await Cosmetic.findById(productId);

        return productById;
    } catch (error) {
        console.log(error);
    }
}

app.get("/api/products/:productId", async (req,res)=>{
    try {
        const productId = await readProductByID(req.params.productId);

        if (!productId) {
           return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({data:{product: productId}})
    } catch (error) {
        console.log(error);

        res.status(500).json({error:"Failed to fetch the data."})
    }
})



// Category Routes

// Create a new Data with POST route for Category

async function createCategoryData (seedCategoryData){
    try{
        const newData = new Category(seedCategoryData);
        const savedData = await newData.save();

        return savedData;
    }catch(error){
        console.log("Error while creating data: ",error);
    }  
}            

app.post("/api/categories",async (req,res)=>{
    try {
        const createData = await createCategoryData(req.body);

        res.status(201).json({
            message:"Data created successfully.",
            data: createData,
        })
    } catch (error) {
        res.status(500).json({error:"Failed to create a data"})
    }
})


// GET method - gets all categories from the DB

async function readAllCategories() {
    try {
        const allCategories = await Category.find();

        return allCategories;
    } catch (error) {
        console.log(error);
    }
}

app.get("/api/categories",async (req,res)=>{
    try {
        const categories = await readAllCategories();

         if (categories.length === 0) {
            return res.status(404).json({ error: "Categories not found" });
        }

        res.status(200).json({data:{categories}})
    } catch (error) {
        res.status(500).json({error:"Failed to fetch categories."})
    }
});

// GET method - gets category by category id from the DB

async function readCategoryByID(categoryId) {
    try {
        const categoryById = await Category.findById(categoryId);

        return categoryById;
    } catch (error) {
        console.log(error);
    }
}

app.get("/api/categories/:categoryId", async (req,res)=>{
    try {
        const categoryId = await readCategoryByID(req.params.categoryId);

        if (!categoryId) {
        return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({data:{category: categoryId}})
    } catch (error) {
        console.log(error);

        res.status(500).json({error:"Failed to fetch the data."})
    }
})

// Wishlist Management Routes

// Create a new Data with POST route for Wishlist

async function createWishlistProduct(newWishlistProduct){
    try {
        const newWishlistData= new WishlistProducts(newWishlistProduct);
        const savedWishlistData = await newWishlistData.save();

        return savedWishlistData;
    } catch (error) {
        console.log("Error occurred while creating the products",error)
    }
}

app.post("/api/wishlist/products", async(req,res)=>{
    try {
        const wishlistData = await createWishlistProduct(req.body);
        
        res.status(201).json({message:"Wishlist Data added successfully",data:wishlistData})
    } catch (error) {
        res.status(500).json({error:"Products not found!"})
    }
})

// GET route - gets wishlist's Products by GET method from the DB

async function readAllWishlistProducts() {
    try {
        const allWishlistProducts = await WishlistProducts.find();

        return allWishlistProducts;
    } catch (error) {
        console.log("Error while reading the wishlist products",error)
        throw error;
    }
}

app.get("/api/wishlist/products",async (req,res)=>{
    try {
        const allWishlistProductsData = await readAllWishlistProducts();
        if (!allWishlistProductsData || allWishlistProductsData.length === 0) {
            return res.status(404).json({ error: "No wishlist products found" });
        }

        res.status(200).json({data:allWishlistProductsData})
    } catch (error) {
        res.status(500).json({error:"Products not found!"})
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("Server is running on PORT",PORT);
})