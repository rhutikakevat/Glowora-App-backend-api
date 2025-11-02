const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true,
    },
    profileImage: {
        type: String,
        required: true
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses",

    }],
    gender: {
        type: String,
        enum: ['female', 'male', 'other'],
        required: true,
    },
    accountCreated: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
})

const Users = mongoose.model("Users", userSchema);

module.exports = Users;