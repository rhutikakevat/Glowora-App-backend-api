const mongoose = require("mongoose");

const wishlistProductsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    ratings:{
        type:Number,
        min:0,
        max:5,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    profileImage:{
        type:String,
        required:true,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    }    
},{
    timestamps:true
})

const WishlistProducts = mongoose.model("WishlistProducts",wishlistProductsSchema);

module.exports = WishlistProducts;