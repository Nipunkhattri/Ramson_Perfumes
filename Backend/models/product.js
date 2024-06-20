import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerName: { type: String, required: true }, 
    rating: { type: Number, required: true, min: 0, max: 5 },
    image:{ type:String, required:true },
    reviewText: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
});

const ProductSchema = mongoose.Schema({
    Category:{
        type:String,
        required:true
    },
    ShopPoints:{
        type:Number,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    OFFPercent:{
        type:Number,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    },
    Rating:{
        type:Number,
        required:true
    },
    Reviewdata:{
        type:[reviewSchema],
        required:true
    },
    image:{
        type:String,
        required:true
    },
    created_At:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Product',ProductSchema)