import { Router } from 'express';
import { InterviewerController } from '../controller/interviewer.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const interviewerController = new InterviewerController();

// Protected routes
router.post('/', authMiddleware, interviewerController.create.bind(interviewerController));
router.get('/', authMiddleware, interviewerController.findAll.bind(interviewerController));
router.get('/:id', authMiddleware, interviewerController.findById.bind(interviewerController));
router.put('/:id', authMiddleware, interviewerController.update.bind(interviewerController));
router.delete('/:id', authMiddleware, interviewerController.delete.bind(interviewerController));
router.get('/job/:jobId', authMiddleware, interviewerController.findByJobId.bind(interviewerController));

export default router; 