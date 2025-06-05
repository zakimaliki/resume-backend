import { Router } from 'express';
import { CandidateController } from '../controller/candidate.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const candidateController = new CandidateController();

// Protected routes
router.post('/', authMiddleware, candidateController.create.bind(candidateController));
router.get('/', authMiddleware, candidateController.findAll.bind(candidateController));
router.get('/:id', authMiddleware, candidateController.findById.bind(candidateController));
router.put('/:id', authMiddleware, candidateController.update.bind(candidateController));
router.delete('/:id', authMiddleware, candidateController.delete.bind(candidateController));
router.get('/job/:jobId', authMiddleware, candidateController.findByJobId.bind(candidateController));
router.get('/location/:location', authMiddleware, candidateController.findByLocation.bind(candidateController));

export default router; 