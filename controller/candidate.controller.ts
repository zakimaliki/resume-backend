import { Response } from 'express';
import { CandidateRepository } from '../repository/candidate.repository';
import { AuthRequest } from '../middleware/authMiddleware';

export class CandidateController {
  private candidateRepository: CandidateRepository;

  constructor() {
    this.candidateRepository = new CandidateRepository();
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const candidate = await this.candidateRepository.create(req.body);
      res.status(201).json(candidate);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: AuthRequest, res: Response) {
    try {
      const candidates = await this.candidateRepository.findAll();
      res.json(candidates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findById(req: AuthRequest, res: Response) {
    try {
      const candidate = await this.candidateRepository.findById(req.params.id);
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json(candidate);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const candidate = await this.candidateRepository.update(req.params.id, req.body);
      if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.json(candidate);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const success = await this.candidateRepository.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Candidate not found' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByJobId(req: AuthRequest, res: Response) {
    try {
      const candidates = await this.candidateRepository.findByJobId(req.params.jobId);
      res.json(candidates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findByLocation(req: AuthRequest, res: Response) {
    try {
      const candidates = await this.candidateRepository.findByLocation(req.params.location);
      res.json(candidates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
} 