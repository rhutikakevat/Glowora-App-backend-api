const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
},{
    timestamps:true
})

const CartProducts = mongoose.model("CartProducts",cartSchema);

module.exports = CartProducts;