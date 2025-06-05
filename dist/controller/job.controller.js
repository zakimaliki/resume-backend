"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_repository_1 = require("../repository/job.repository");
class JobController {
    constructor() {
        this.jobRepository = new job_repository_1.JobRepository();
    }
    async create(req, res) {
        try {
            const job = await this.jobRepository.create(req.body);
            res.status(201).json(job);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async findAll(req, res) {
        try {
            const jobs = await this.jobRepository.findAll();
            res.json(jobs);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const job = await this.jobRepository.findById(req.params.id);
            if (!job) {
                return res.status(404).json({ error: 'Job not found' });
            }
            res.json(job);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const job = await this.jobRepository.update(req.params.id, req.body);
            if (!job) {
                return res.status(404).json({ error: 'Job not found' });
            }
            res.json(job);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const success = await this.jobRepository.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Job not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.JobController = JobController;
