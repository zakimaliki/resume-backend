import { Router } from 'express';
import { InterviewerController } from '../controller/interviewer.controller';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();
const interviewerController = new InterviewerController();

// Protected routes
router.post('/', verifyToken, interviewerController.create.bind(interviewerController));
router.get('/', verifyToken, interviewerController.findAll.bind(interviewerController));
router.get('/:id', verifyToken, interviewerController.findById.bind(interviewerController));
router.put('/:id', verifyToken, interviewerController.update.bind(interviewerController));
router.delete('/:id', verifyToken, interviewerController.delete.bind(interviewerController));
router.get('/job/:jobId', verifyToken, interviewerController.findByJobId.bind(interviewerController));

export default router; 