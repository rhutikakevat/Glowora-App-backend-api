const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        default: () => `ORD${Math.floor(Math.random() * 1000)}`
    },
    orderProduct: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Cosmetics",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ["Credit Card", "Debit Card", "UPI ID/QR Code", "Net Banking", "Cash on Delivery"],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Delivered", "Cancelled", "Return/Replace"],
        default: "Pending"
    },
    trackingId: {
        type: String,
        required: true
    },
    expectedDelivery: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Paid", "Unpaid", "Refund"],
        default: "Paid"
    },
    totalPayment: {
        type: Number,
        required: true
    },
    placedDate: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses",
        required: true
    }

},{
    timestamps:true
})

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders