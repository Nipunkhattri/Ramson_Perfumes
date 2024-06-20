import mongoose from "mongoose";

const AllCategories= mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

export default mongoose.model('AllCategories',AllCategories)