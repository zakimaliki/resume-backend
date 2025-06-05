import { Router } from 'express';
import { JobController } from '../controller/job.controller';
import { authMiddleware } from '../middleware/authMiddleware';


const router = Router();
const jobController = new JobController();

router.post('/',authMiddleware,  jobController.create.bind(jobController));
router.get('/', authMiddleware, jobController.findAll.bind(jobController));
router.get('/:id',authMiddleware,  jobController.findById.bind(jobController));
router.put('/:id',authMiddleware,  jobController.update.bind(jobController));
router.delete('/:id',authMiddleware,  jobController.delete.bind(jobController));

export default router; 