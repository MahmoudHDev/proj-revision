// # get user, update user
import express from 'express';
import protect from '../middleware/authMiddleware.js';
import { userProfile } from '../controllers/userController.js';
const router = express.Router();

router.get('/profile', protect, userProfile);

export default router;

