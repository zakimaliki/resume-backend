import { Router } from 'express';
import { UserController } from '../controller/user.controller';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();
const userController = new UserController();

// Protected routes
router.get('/profile', verifyToken, userController.getProfile.bind(userController));
router.put('/profile', verifyToken, userController.updateProfile.bind(userController));

export default router; 