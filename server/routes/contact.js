import { Router } from 'express';
import { body } from 'express-validator';
import { submitContact, getContacts } from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/',
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
  submitContact
);

router.get('/', protect, getContacts);

export default router;
