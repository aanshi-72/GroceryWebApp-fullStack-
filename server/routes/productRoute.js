import express from 'express';
import { upload } from '../configs/multer.js'
import authSeller from '../middleware/authSeller.js';
import { addProduct, changeStock, ProductById, ProductList } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/add', authSeller, upload.array(["images"]), addProduct);
productRouter.get('/list', ProductList);
productRouter.get('/id/:id', ProductById);
productRouter.post('/stock', authSeller, changeStock);

export default productRouter