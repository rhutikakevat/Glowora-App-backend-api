const mongoose = require("mongoose");

const cosmeticSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    details:{
        type:String,
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
    reviews:[{
        type:String,
    }],
    price:{
        type:Number,
        required:true,
        min:0,
    },
    profileImage:{
        type:String,
        required:true,
    },
    description:{
        expiryDate:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        manufacturer:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        }
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    }    
},{
    timestamps:true
})

const Cosmetic = mongoose.model("Cosmetic",cosmeticSchema);

module.exports = Cosmetic;