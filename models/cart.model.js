const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product: {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cosmetics",
            required:true,
        },
        quantity: {
            type: Number,
            required:true,
            default:1,
            min:1,
        }
    }
},{
    timestamps:true
})

const CartProducts = mongoose.model("Cart",cartSchema);

module.exports = CartProducts;