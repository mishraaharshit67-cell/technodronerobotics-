import { Router } from 'express';
import { body } from 'express-validator';
import { subscribe, getSubscribers, unsubscribe } from '../controllers/newsletterController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/',
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  subscribe
);

router.get('/', protect, getSubscribers);
router.delete('/:email', unsubscribe);

export default router;
