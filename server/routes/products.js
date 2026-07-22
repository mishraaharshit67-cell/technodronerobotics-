import { Router } from 'express';
import { body } from 'express-validator';
import { getProducts, getProduct, getProductBySlug, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProduct);

router.post('/',
  protect,
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  createProduct
);

router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
