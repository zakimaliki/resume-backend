import { BaseRepository } from './base.repository';
import { Candidate } from '../entities/types';

export class CandidateRepository extends BaseRepository<Candidate> {
  constructor() {
    super('candidates');
  }

  async findByJobId(jobId: string): Promise<Candidate[]> {
    const snapshot = await this.collection.where('jobId', '==', jobId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Candidate);
  }

  async findByLocation(location: string): Promise<Candidate[]> {
    const snapshot = await this.collection.where('location', '==', location).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Candidate);
  }
} 