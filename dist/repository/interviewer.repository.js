"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerRepository = void 0;
const base_repository_1 = require("./base.repository");
class InterviewerRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('interviewers');
    }
    async findByJobId(jobId) {
        const snapshot = await this.collection.where('jobId', '==', jobId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findByDepartment(department) {
        const snapshot = await this.collection.where('department', '==', department).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
exports.InterviewerRepository = InterviewerRepository;
