import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' }, // Default user role
})

export default mongoose.model('Users', UserSchema);