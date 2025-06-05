"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidate_controller_1 = require("../controller/candidate.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const candidateController = new candidate_controller_1.CandidateController();
// Protected routes
router.post('/', authMiddleware_1.authMiddleware, candidateController.create.bind(candidateController));
router.get('/', authMiddleware_1.authMiddleware, candidateController.findAll.bind(candidateController));
router.get('/:id', authMiddleware_1.authMiddleware, candidateController.findById.bind(candidateController));
router.put('/:id', authMiddleware_1.authMiddleware, candidateController.update.bind(candidateController));
router.delete('/:id', authMiddleware_1.authMiddleware, candidateController.delete.bind(candidateController));
router.get('/job/:jobId', authMiddleware_1.authMiddleware, candidateController.findByJobId.bind(candidateController));
router.get('/location/:location', authMiddleware_1.authMiddleware, candidateController.findByLocation.bind(candidateController));
exports.default = router;
