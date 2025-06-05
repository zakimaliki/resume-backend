"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerController = void 0;
const interviewer_repository_1 = require("../repository/interviewer.repository");
class InterviewerController {
    constructor() {
        this.interviewerRepository = new interviewer_repository_1.InterviewerRepository();
    }
    async create(req, res) {
        try {
            const interviewer = await this.interviewerRepository.create(req.body);
            res.status(201).json(interviewer);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async findAll(req, res) {
        try {
            const interviewers = await this.interviewerRepository.findAll();
            res.json(interviewers);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const interviewer = await this.interviewerRepository.findById(req.params.id);
            if (!interviewer) {
                return res.status(404).json({ error: 'Interviewer not found' });
            }
            res.json(interviewer);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const interviewer = await this.interviewerRepository.update(req.params.id, req.body);
            if (!interviewer) {
                return res.status(404).json({ error: 'Interviewer not found' });
            }
            res.json(interviewer);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const success = await this.interviewerRepository.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Interviewer not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findByJobId(req, res) {
        try {
            const interviewers = await this.interviewerRepository.findByJobId(req.params.jobId);
            res.json(interviewers);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.InterviewerController = InterviewerController;
