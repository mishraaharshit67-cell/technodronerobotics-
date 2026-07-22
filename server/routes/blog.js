import { Router } from 'express';
import { body } from 'express-validator';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/blogController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getPosts);
router.get('/:slug', getPost);

router.post('/',
  protect,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  createPost
);

router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
