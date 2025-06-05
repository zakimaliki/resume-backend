"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateController = void 0;
const candidate_repository_1 = require("../repository/candidate.repository");
class CandidateController {
    constructor() {
        this.candidateRepository = new candidate_repository_1.CandidateRepository();
    }
    async create(req, res) {
        try {
            const candidate = await this.candidateRepository.create(req.body);
            res.status(201).json(candidate);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async findAll(req, res) {
        try {
            const candidates = await this.candidateRepository.findAll();
            res.json(candidates);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findById(req, res) {
        try {
            const candidate = await this.candidateRepository.findById(req.params.id);
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }
            res.json(candidate);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const candidate = await this.candidateRepository.update(req.params.id, req.body);
            if (!candidate) {
                return res.status(404).json({ error: 'Candidate not found' });
            }
            res.json(candidate);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const success = await this.candidateRepository.delete(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Candidate not found' });
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findByJobId(req, res) {
        try {
            const candidates = await this.candidateRepository.findByJobId(req.params.jobId);
            res.json(candidates);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async findByLocation(req, res) {
        try {
            const candidates = await this.candidateRepository.findByLocation(req.params.location);
            res.json(candidates);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.CandidateController = CandidateController;
