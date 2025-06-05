import { Response } from 'express';
import { InterviewerRepository } from '../repository/interviewer.repository';
import { AuthRequest } from '../middleware/authMiddleware';

export class InterviewerController {
  private interviewerRepository: InterviewerRepository;

  constructor() {
    this.interviewerRepository = new InterviewerRepository();
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const interviewer = await this.interviewerRepository.create(req.body);
      res.status(201).json(interviewer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      const interviewers = await this.interviewerRepository.findAll();
      res.json(interviewers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: AuthRequest, res: Response) {
    try {
      const interviewer = await this.interviewerRepository.findById(req.params.id);
      if (!interviewer) {
        return res.status(404).json({ error: 'Interviewer not found' });
      }
      res.json(interviewer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const interviewer = await this.interviewerRepository.update(req.params.id, req.body);
      if (!interviewer) {
        return res.status(404).json({ error: 'Interviewer not found' });
      }
      res.json(interviewer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const success = await this.interviewerRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Interviewer not found' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByJobId(req: AuthRequest, res: Response) {
    try {
      const interviewers = await this.interviewerRepository.findByJobId(req.params.jobId);
      res.json(interviewers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
} 