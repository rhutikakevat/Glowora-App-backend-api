const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required: true,
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        default: "India",
        trim: true,
    },
    zipCode: {
        type: String,
        required: true,
        trim: true,
    },
    landmark: {
        type: String,
        trim: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
})

const Addresses = mongoose.model("Addresses", addressSchema);

module.exports = Addresses;