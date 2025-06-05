"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateRepository = void 0;
const base_repository_1 = require("./base.repository");
class CandidateRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('candidates');
    }
    async findByJobId(jobId) {
        const snapshot = await this.collection.where('jobId', '==', jobId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findByLocation(location) {
        const snapshot = await this.collection.where('location', '==', location).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
exports.CandidateRepository = CandidateRepository;
