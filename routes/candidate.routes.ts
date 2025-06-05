import { Router } from 'express';
import { CandidateController } from '../controller/candidate.controller';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();
const candidateController = new CandidateController();

// Protected routes
router.post('/', verifyToken, candidateController.create.bind(candidateController));
router.get('/', verifyToken, candidateController.findAll.bind(candidateController));
router.get('/:id', verifyToken, candidateController.findById.bind(candidateController));
router.put('/:id', verifyToken, candidateController.update.bind(candidateController));
router.delete('/:id', verifyToken, candidateController.delete.bind(candidateController));
router.get('/job/:jobId', verifyToken, candidateController.findByJobId.bind(candidateController));
router.get('/location/:location', verifyToken, candidateController.findByLocation.bind(candidateController));

export default router; 