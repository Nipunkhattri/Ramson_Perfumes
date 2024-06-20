import AllCategories from "../models/allcategories.js";
import product from "../models/product.js";
import Razorpay from 'razorpay';
import Order from '../models/orderdetails.js'
import auth from '../models/authmodel.js';
import {v2 as cloudinary} from 'cloudinary';
import crypto from 'crypto';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret:process.env.CLOUD_API_SECRET
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

function getRandomProducts(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const GetallCategory = async (req,res) =>{
    try {
        const categories = await AllCategories.find();

        return res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const GetProductByCategory = async (req, res) => {
    try {
      const { Category, filter, minPrice, maxPrice, page = 1, limit = 8 } = req.query;
      if (!Category) {
        return res.status(400).json({ message: 'Missing required parameters' });
      }
      console.log(Category);

      const skip = (page - 1) * limit;

      let productsQuery;
      if (Category == 'Special Offer') {
        productsQuery = product.find({ OFFPercent: { $gt: 0.1 } }); 
      } else if (Category == 'Summer Sale') {
        productsQuery = product.find({ OFFPercent: { $gt: 10 } }); // Use $gt directly in find
      } else if(Category == 'ShopPoints'){
        productsQuery = product.find({ShopPoints:{$gt : 0}})
      } else {
        productsQuery = product.find({ Category });
      }
      
      if (filter === 'bestSeller') {
        productsQuery = productsQuery.where('ShopPoints').gt(0);
      } else if (filter === 'Price_Low_to_High') {
        productsQuery = productsQuery.sort({ Price: 1 }); // Sort ascending
      } else if (filter === 'Price_High_to_Low') {
        productsQuery = productsQuery.sort({ Price: -1 }); // Sort descending
      } else if (filter == 'date_asc'){ // Handle date sorting
        productsQuery = productsQuery.sort({ created_At: 1 });
      } else if (filter === 'date_des'){
          productsQuery = productsQuery.sort({ created_At: -1 });
      }

      if (minPrice && maxPrice) { 
        productsQuery = productsQuery.where('Price').gte(minPrice).lte(maxPrice);
      }
  
      // Apply pagination with skip and limit:
      productsQuery = productsQuery.skip(skip).limit(limit);
      
      let totalProducts;
      if(Category == 'Special Offer') {
        totalProducts = await product.countDocuments({ OFFPercent: { $gt: 0.1 } });
      } else if(Category == 'Summer Sale') {
        totalProducts = await product.countDocuments({ OFFPercent: { $gt: 10 } });
      } else if(Category == 'ShopPoints') {
        totalProducts = await product.countDocuments({ ShopPoints: { $gt: 0 } });
      } else {
        totalProducts = await product.countDocuments({ Category });
      }
      
      const products = await productsQuery.exec();
      
      return res.status(200).json({
        data: products,
        pagination: {
          page,
          limit,
          totalPages: Math.ceil(totalProducts / limit),
          totalProducts:totalProducts 
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

export const UpdateReview = async (req,res) =>{
  try {
    const {rating,photoBase64,content,productId,name} = req.body;
    console.log(productId);
    const { secure_url } = await cloudinary.uploader.upload(photoBase64, {
      folder: "product_images_review",
    });

    const newReview = {
      reviewerName:name,
      rating,
      image:secure_url,
      reviewText: content,
      createdAt: new Date(),
    };

    const product_data = await product.findOne({_id:productId})
    if (!product_data) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product_data.Reviewdata.push(newReview);

    await product_data.save();

    res.status(200).json({ message: 'Review added successfully'});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export const GetProductById = async (req,res) =>{
    try {
        const {id}  = req.query;
        
        const product_data = await product.findOne({_id:id});

        return res.status(200).json({data:product_data});
    } catch (error) {
        console.log(error);
        return res.status(404).json({"message":"Internal Server Error"});
    }
}

export const checkoutpayment = async (req,res) =>{
  try {
    const {amount} = req.body;
    const options = {
      amount: amount * 100,
      currency: 'INR',
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json({
      success: true,
      message: "Order details generated successully",
      order
    });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

export const payment_verify = async (req,res)=>{
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      console.log('Payment verified successfully!');
      res.status(200).json({ message:'Payment verified',orderId:razorpay_order_id,paymentID:razorpay_payment_id});
    } else {
      console.error('Signature verification failed!');
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Verification failed' });
  }
}

export const OrderDetails = async (req,res) =>{
  try {
    const {user,cart,razorpay_order_id,razorpay_payment_id} = req.body;

    const order_data = new Order({
      user: user,
      Cart: cart,
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id
    });

    await order_data.save();
    return res.status(200).json({"message":"Order Placed Successfully"});
  } catch (error) {
    console.log(error);
    return res.status(404).json({"message":"Internal Server Error"});
  }
}

export const likedByYou = async (req,res) =>{
  try {
    const {id} = req.query;

    const Product = await product.find({_id:id});

    const all_product = await product.find({Category:Product[0].Category})

    const randomProducts = getRandomProducts(all_product, 4);

    return res.status(200).json({data:randomProducts});
  } catch (error) {
    console.log(error);
    return res.status(404).json({"message":"Internal Server Error"});
  }
}