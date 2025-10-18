const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    
})

const Address = mongoose.model("Address",addressSchema);

module.exports = Address;