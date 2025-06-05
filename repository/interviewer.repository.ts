import { BaseRepository } from './base.repository';
import { Interviewer } from '../entities/types';

export class InterviewerRepository extends BaseRepository<Interviewer> {
  constructor() {
    super('interviewers');
  }

  async findByJobId(jobId: string): Promise<Interviewer[]> {
    const snapshot = await this.collection.where('jobId', '==', jobId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Interviewer);
  }

  async findByDepartment(department: string): Promise<Interviewer[]> {
    const snapshot = await this.collection.where('department', '==', department).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Interviewer);
  }
} 