import express from 'express';
const router = express.Router();
import { CreateCategory, CreateProduct } from '../controllers/admincontroller.js';
import isAdmin from '../middleware/admin_middleware.js';

router.post('/create_category',isAdmin,CreateCategory);
router.post('/create_product',isAdmin,CreateProduct);

export default router;