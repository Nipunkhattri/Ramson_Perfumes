import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})

const CartSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        required:true
    }
})

const OrderDetails = new mongoose.Schema({
    user:{
        type:UserSchema,
        required:true
    },
    Cart:{
        type:[CartSchema],
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
})

export default mongoose.model('Orders',OrderDetails);