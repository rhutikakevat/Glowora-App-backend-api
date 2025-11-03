const express = require("express");
const { initialDatabase } = require("./db/db.connect");;
const Category = require("./models/category.model");
const Cosmetic = require("./models/cosmetic.model")
const WishlistProducts = require("./models/wishlist.model");
const CartProducts = require("./models/cart.model");
const Users = require("./models/user.model")
const Addresses = require("./models/address.model")
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config()
const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

initialDatabase();

app.use(express.json());
app.use(cors(corsOptions));

// Products Routes 

// Create a new Data with POST route for Products

async function createCosmeticData(seedProductsData) {
    try {
        const newData = new Cosmetic(seedProductsData);
        const savedData = await newData.save();

        return savedData;
    } catch (error) {
        console.log("Error while creating data: ", error);
    }
}

app.post("/api/products", async (req, res) => {
    try {
        const createData = await createCosmeticData(req.body);

        res.status(201).json({
            message: "Data created successfully.",
            data: createData,
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to create a data" })
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

app.get("/api/products", async (req, res) => {
    try {
        const products = await readAllProducts();
        if (products.length === 0) {
            return res.status(404).json({ error: "Products not found" });
        }

        res.status(200).json({ data: { products } })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products." })
    }
});

// GET method - gets Product by product id from the DB

async function readProductByID(productId) {
    try {
        const productById = await Cosmetic.findById(productId).populate("category");

        return productById;
    } catch (error) {
        console.log(error);
    }
}

app.get("/api/products/:productId", async (req, res) => {
    try {
        const productId = await readProductByID(req.params.productId);

        if (!productId) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ data: { product: productId } })
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to fetch the data." })
    }
})



// Category Routes

// Create a new Data with POST route for Category

async function createCategoryData(seedCategoryData) {
    try {
        const newData = new Category(seedCategoryData);
        const savedData = await newData.save();

        return savedData;
    } catch (error) {
        console.log("Error while creating data: ", error);
    }
}

app.post("/api/categories", async (req, res) => {
    try {
        const createData = await createCategoryData(req.body);

        res.status(201).json({
            message: "Data created successfully.",
            data: createData,
        })
    } catch (error) {
        res.status(500).json({ error: "Failed to create a data" })
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

app.get("/api/categories", async (req, res) => {
    try {
        const categories = await readAllCategories();

        if (categories.length === 0) {
            return res.status(404).json({ error: "Categories not found" });
        }

        res.status(200).json({ data: { categories } })
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories." })
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

app.get("/api/categories/:categoryId", async (req, res) => {
    try {
        const categoryId = await readCategoryByID(req.params.categoryId);

        if (!categoryId) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).json({ data: { category: categoryId } })
    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Failed to fetch the data." })
    }
})

// Wishlist Management Routes

// Create a new Data with POST route for Wishlist

async function createWishlistProduct(newWishlistProduct) {
    try {
        const newWishlistData = new WishlistProducts(newWishlistProduct);
        const savedWishlistData = await newWishlistData.save();

        return savedWishlistData;
    } catch (error) {
        console.log("Error occurred while creating the products", error)
    }
}

app.post("/api/wishlist/products", async (req, res) => {
    try {
        const wishlistData = await createWishlistProduct(req.body);

        res.status(201).json({ message: "Wishlist Data added successfully", data: wishlistData })
    } catch (error) {
        res.status(500).json({ error: "Products not found!" })
    }
})

// GET route - gets wishlist's Products by GET method from the DB

async function readAllWishlistProducts() {
    try {
        const allWishlistProducts = await WishlistProducts.find().populate("product");

        return allWishlistProducts;
    } catch (error) {
        console.log("Error while reading the wishlist products", error)
        throw error;
    }
}

app.get("/api/wishlist/products", async (req, res) => {
    try {
        const allWishlistProductsData = await readAllWishlistProducts();

        if (!allWishlistProductsData || allWishlistProductsData.length === 0) {
            return res.status(404).json({ error: "No wishlist products found" });
        }

        res.status(200).json({ data: allWishlistProductsData })
    } catch (error) {
        res.status(500).json({ error: "Products not found!" })
    }
})

// DELETE - to remove item in wishlist

async function deleteWishlistProduct(productId) {
    try {
        const deleteProductData = await WishlistProducts.findOneAndDelete({ product: productId });

        return deleteProductData;
    } catch (error) {
        console.log("Error while deleting the wishlist products in database", error)
    }
}

app.delete("/api/wishlist/product/:productId", async (req, res) => {
    try {
        const deletedProduct = await deleteWishlistProduct(req.params.productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Wishlist item not found" });
        }

        res.status(200).json({ message: "Wishlist Product deleted successfully", product: deletedProduct })
    } catch (error) {
        res.status(500).json({ error: "Product not found!" })
    }
})

// Cart Management

// GET - fetch all cart products (with product details populated).

async function readAllCartProducts() {
    try {
        const allCartProducts = await CartProducts.find().populate("productId");

        return allCartProducts;
    } catch (error) {
        console.log("Error occurred while read all cart products", error);
    }
}

app.get("/api/cart/products", async (req, res) => {
    try {
        const allCartProducts = await readAllCartProducts();

        if (!allCartProducts || allCartProducts.length === 0) {
            return res.status(404).json({ error: "No cart products found" });
        }

        res.status(200).json({ data: allCartProducts })
    } catch (error) {
        res.status(500).json({ error: "Product not found!" })
    }
})

// POST - add a new product in my cart

async function createCartProducts(newCartData) {
    try {
        const createCartData = new CartProducts(newCartData);
        const savedData = await createCartData.save()

        return savedData;
    } catch (error) {
        console.log("Error occurred while creating the data", error);
    }
}

app.post("/api/cart/products", async (req, res) => {
    try {
        const savedCartData = await createCartProducts(req.body);

        if (!savedCartData) {
            res.status(400).json({ error: "ProductId and quantity are required" })
        }

        res.status(201).json({
            message: "Cart Data added successfully",
            data: savedCartData,
        })

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({
                error: "Product ids and quantity are required",
                details: error.message
            });
        } else {
            res.status(500).json({ error: "Products not found!" });
        }
    }
})

// DELETE - delete a product from cart by productId

async function deletedCartProduct(cartProductId) {
    try {
        const deletedCartData = await CartProducts.findByIdAndDelete(cartProductId)

        return deletedCartData;
    } catch (error) {
        console.log("Error occurred while deleting the cart data", error);
    }
}

app.delete("/api/cart/:cartProductId", async (req, res) => {
    try {
        const deletedData = await deletedCartProduct(req.params.cartProductId);

        if (!deletedData) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ message: "Cart data deleted successfully", deletedData });
    } catch (error) {
        res.status(500).json({ error: "Product not found" })
    }
})

// POST - update quantity of a product.

async function updatedCartProduct(productId, addToUpdateQuantity) {
    try {
        const objectId = new mongoose.Types.ObjectId(productId)

        const updateData = await CartProducts.findOneAndUpdate(
            objectId,
            { $inc: { quantity: addToUpdateQuantity } },
            { new: true }
        )
        // console.log("Updating productId:", objectId, "Updated:", !!updateData);

        return updateData;
    } catch (error) {
        console.log("Error occurred while updating the data")
    }
}

app.post("/api/cart/product/:productId", async (req, res) => {
    try {
        const { quantity } = req.body;

        const updatedCartData = await updatedCartProduct(req.params.productId, quantity);

        if (!updatedCartData) {
            return res.status(404).json({ error: "Cart data not found!" })
        }

        res.status(200).json({
            message: "Cart Data updated successfully",
            data: updatedCartData
        })
    } catch (error) {
        res.status(500).json({ error: "Product not found!" })
    }
})

// User Profile Management

// GET - this route for fetch the user's data

async function readAllUser() {
    try {
        const allUserData = await Users.find().populate("address")

        return allUserData;
    } catch (error) {
        console.log("Error occurred while fetching user's data", error);
    }
}

app.get("/api/users", async (req, res) => {
    try {
        const userData = await readAllUser()

        if (!userData) {
            return res.status(404).json("User's data not found!")
        }

        res.status(200).json({ data: { users: userData } })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch the user data" })
    }
})

// Address Management

// GET - this route for fetch user's address data 

async function readAllAddresses() {
    try {
        const allAddresses = await Addresses.find().populate("userId");

        return allAddresses;
    } catch (error) {
        console.log("Error while fetching the user data", error);
    }
}

app.get("/api/addresses", async (req, res) => {
    try {
        const allAddressesData = await readAllAddresses();

        if (!allAddressesData) {
            return res.status(404).json({ error: "Address data not found!" });
        }

        res.status(200).json({ data: { addresses: allAddressesData } });
    } catch (error) {
        console.log("Error while fetching the address data", error);
        res.status(500).json({ error: "Failed to fetch the address data" });
    }
});

// POST - this route for create user's address data

async function createAddressData(seedAddressData) {
    try {
        const newData = new Addresses(seedAddressData);
        const savedData = await newData.save();

        await Users.findByIdAndUpdate(savedData.userId,
            { $push: { address: savedData._id } },
            { new: true })

        return savedData;
    } catch (error) {
        console.log("Error while creating the address data", error);
    }
}

app.post("/api/addresses", async (req, res) => {
    try {
        const createdAddressData = await createAddressData(req.body);

        if (!createdAddressData) {
            return res.status(400).json({ error: "Failed to create address's data" });
        }

        res.status(201).json({
            message: "Address data created successfully",
            data: createdAddressData
        });
    } catch (error) {
        console.log("Error while creating the address data", error);
        res.status(500).json({ error: "Failed to create address data" });
    }
});

// POST - Update user's address data 

async function updateAddressData(addressId, addToData) {
    try {
        const addressData = await Addresses.findByIdAndUpdate(
            addressId,
            { $set: addToData },
            { new: true }
        );

        return addressData;
    } catch (error) {
        console.log("Error while updating the address data", error);
    }
}

app.post("/api/address/:addressId", async (req, res) => {
    try {
        const updatedAddressData = await updateAddressData(req.params.addressId, req.body)

        if (!updatedAddressData) {
            return res.status(404).json({ error: "Address data is not updated" })
        }

        res.status(200).json({
            message: "Address data updated successfully",
            data: updatedAddressData
        })
    } catch (error) {
        console.log("Error occurred while updating address data")
        res.status(500).json({ error: "Address data not found!" })
    }
})

// DELETE - delete user's address data in database

async function deleteAddressData(addressId) {
    try {
        const deleteAddressData = await Addresses.findByIdAndDelete(addressId)

        return deleteAddressData;
    } catch (error) {
        console.log("Error occurred while deleting the address data", error)
    }
}

app.delete("/api/address/:addressId", async (req, res) => {
    try {
        const deletedData = await deleteAddressData(req.params.addressId)

        if (!deletedData) {
            return res.status(404).json({ error: "Address not found" })
        }

        res.status(200).json({ message: "Address data is deleted successfully", deletedData })
    } catch (error) {
        console.log("Error while deleting the address data", error)
    }
})

// POST - to set one address as default address

async function setDefaultAddress(userId, addressId) {
    try {
        await Addresses.updateMany({ userId }, { isDefault: false })

        const setAddressForDefault = await Addresses.findByIdAndUpdate(
            addressId,
            { isDefault: true },
            { new: true })

        return setAddressForDefault;
    } catch (error) {
        console.log("Error occurred while set default address", error)
    }
}

app.post("/api/address/default/:addressId", async (req, res) => {
    try {
        const { userId } = req.body;
        const { addressId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" })
        }

        const setAddressForDefaultData = await setDefaultAddress(userId, addressId)

        if (!setAddressForDefaultData) {
            return res.status(404).json({ error: "Address not found." })
        }

        res.status(200).json({
            message: "Address is set as default successfully.",
            data: setAddressForDefaultData
        })
    } catch (error) {
        console.log("Error occurred while setting default address", error)

        res.status(500).json({ error: "Failed to set default address" })
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
})