import { BaseRepository } from './base.repository';
import { Job, Interviewer, Candidate } from '../entities/types';
import { db } from '../config/firebaseConfig';

export class JobRepository extends BaseRepository<Job> {
  constructor() {
    super('jobs');
  }

  async findByTitle(title: string): Promise<Job[]> {
    const snapshot = await this.collection.where('title', '==', title).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Job);
  }

  async findByLocation(location: string): Promise<Job[]> {
    const snapshot = await this.collection.where('location', '==', location).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Job);
  }

  async findById(id: string): Promise<Job | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    const job = { id: doc.id, ...doc.data() } as Job;

    // Get interviewers
    const interviewersSnapshot = await db.collection('interviewers')
      .where('jobId', '==', id)
      .get();
    const interviewers = interviewersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Interviewer[];

    // Get candidates
    const candidatesSnapshot = await db.collection('candidates')
      .where('jobId', '==', id)
      .get();
    const candidates = candidatesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Candidate[];

    return {
      ...job,
      interviewers,
      candidates
    };
  }

  async findAll(): Promise<Job[]> {
    const snapshot = await this.collection.get();
    const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Job);

    // Get all interviewers and candidates for each job
    const jobsWithRelations = await Promise.all(jobs.map(async (job) => {
      const interviewersSnapshot = await db.collection('interviewers')
        .where('jobId', '==', job.id)
        .get();
      const interviewers = interviewersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Interviewer[];

      const candidatesSnapshot = await db.collection('candidates')
        .where('jobId', '==', job.id)
        .get();
      const candidates = candidatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Candidate[];

      return {
        ...job,
        interviewers,
        candidates
      };
    }));

    return jobsWithRelations;
  }
} 