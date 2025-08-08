const mongoose = require("mongoose");

const wishlistProductsSchema = mongoose.Schema({
    product: {
           type: mongoose.Schema.Types.ObjectId,
           ref:"Cosmetics",
           required:true,
       },
},{
    timestamps:true
})

const WishlistProducts = mongoose.model("WishlistProducts",wishlistProductsSchema);

module.exports = WishlistProducts;