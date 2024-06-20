import AllCategories from "../models/allcategories.js";
import product from "../models/product.js";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET
});

export const CreateCategory = async (req,res) =>{
    try {
        const { newCategory } = req.body;

        const data  = await new AllCategories({
            name:newCategory
        })
        await data.save();
        return res.status(200).json({'message':"category added successfully"});
    } catch (error) {
        res.status(400).json({"message":"Something Went Wrong"});
        console.log(error);
    }
}

export const CreateProduct = async (req,res)=>{
    try {
        const {category,name,description,offPercent,price,quantity,image} = req.body;

        console.log(req.body);
        
        if (!category || !name || !price || !quantity) {
            return res.status(400).json({ message: 'Missing required product fields' });
        }
    
        if (offPercent && (offPercent < 0 || offPercent > 100)) {
            return res.status(400).json({ message: 'OFFPercent must be between 0 and 100' });
        }
    
        const existingCategory = await AllCategories.findOne({ name: category });
    
        if (!existingCategory) {
        return res.status(400).json({ message: 'Category Not Found' });
        }

        const { secure_url } = await cloudinary.uploader.upload(image, {
            folder: "product_images",
        });

        const data = await new product({
            Category:category,
            ShopPoints:0,
            Name:name,
            Description:description,
            OFFPercent:offPercent,
            Price:price,
            Quantity:quantity,
            Rating:0,
            Reviewdata:[],
            image:secure_url
        })
        await data.save();
        return res.status(200).json({"message":"Product Created Successfully"});
    } catch (error) {
        res.status(400).json({"message":"Internal Server Error"});
        console.log(error);
    }
}