"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const base_repository_1 = require("./base.repository");
const firebaseConfig_1 = require("../config/firebaseConfig");
class JobRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('jobs');
    }
    async findByTitle(title) {
        const snapshot = await this.collection.where('title', '==', title).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findByLocation(location) {
        const snapshot = await this.collection.where('location', '==', location).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const job = { id: doc.id, ...doc.data() };
        // Get interviewers
        const interviewersSnapshot = await firebaseConfig_1.db.collection('interviewers')
            .where('jobId', '==', id)
            .get();
        const interviewers = interviewersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        // Get candidates
        const candidatesSnapshot = await firebaseConfig_1.db.collection('candidates')
            .where('jobId', '==', id)
            .get();
        const candidates = candidatesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return {
            ...job,
            interviewers,
            candidates
        };
    }
    async findAll() {
        const snapshot = await this.collection.get();
        const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Get all interviewers and candidates for each job
        const jobsWithRelations = await Promise.all(jobs.map(async (job) => {
            const interviewersSnapshot = await firebaseConfig_1.db.collection('interviewers')
                .where('jobId', '==', job.id)
                .get();
            const interviewers = interviewersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const candidatesSnapshot = await firebaseConfig_1.db.collection('candidates')
                .where('jobId', '==', job.id)
                .get();
            const candidates = candidatesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            return {
                ...job,
                interviewers,
                candidates
            };
        }));
        return jobsWithRelations;
    }
}
exports.JobRepository = JobRepository;
