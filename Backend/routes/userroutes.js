import express from 'express';
const router = express.Router();
import authenticateToken from '../middleware/user_middleware.js';
import {GetProductByCategory, GetallCategory ,GetProductById, checkoutpayment, payment_verify, OrderDetails,likedByYou ,UpdateReview} from '../controllers/usercontroller.js';

router.get('/get_all_category',GetallCategory);
router.get('/get_by_category',GetProductByCategory);
router.get('/get_by_Id',GetProductById);
router.get('/liked_by_id',likedByYou);
router.post('/add_review',authenticateToken,UpdateReview)
router.post('/checkout',authenticateToken,checkoutpayment);
router.post('/verification',authenticateToken,payment_verify);
router.post('/save_order',OrderDetails);
export default router;