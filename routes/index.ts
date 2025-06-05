import { Router } from 'express';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';
import interviewerRoutes from './interviewer.routes';
import candidateRoutes from './candidate.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);
router.use('/interviewers', interviewerRoutes);
router.use('/candidates', candidateRoutes);

export default router; 