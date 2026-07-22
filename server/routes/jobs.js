import { Router } from 'express';
import { body } from 'express-validator';
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getJobs);
router.get('/:id', getJob);

router.post('/',
  protect,
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('dept').trim().notEmpty().withMessage('Department is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  createJob
);

router.put('/:id', protect, updateJob);
router.delete('/:id', protect, deleteJob);

export default router;
