import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

export const productRouter = Router();

// Rutas agrupadas por endpoint
productRouter.route('/')
  .get(getProducts)
  .post(createProduct);

productRouter.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
