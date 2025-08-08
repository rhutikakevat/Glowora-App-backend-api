const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB

const initialDatabase = async ()=>{
    try{
        await mongoose.connect(mongoUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,            
            serverSelectionTimeoutMS: 15000,    // Timeout after 15s
            socketTimeoutMS: 45000,    // Close sockets after 45s inactivity
        })

        
        console.log("Database connected successfully", mongoose.connection.name);
    }catch(error){
        console.log("Error occurred while connecting to database: ",error);
        throw error;
    }
}

module.exports = {initialDatabase};