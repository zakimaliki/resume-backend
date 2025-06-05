import { Router } from 'express';
import { JobController } from '../controller/job.controller';

const router = Router();
const jobController = new JobController();

router.post('/', jobController.create.bind(jobController));
router.get('/', jobController.findAll.bind(jobController));
router.get('/:id', jobController.findById.bind(jobController));
router.put('/:id', jobController.update.bind(jobController));
router.delete('/:id', jobController.delete.bind(jobController));

export default router; 