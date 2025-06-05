"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interviewer_controller_1 = require("../controller/interviewer.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const interviewerController = new interviewer_controller_1.InterviewerController();
// Protected routes
router.post('/', authMiddleware_1.authMiddleware, interviewerController.create.bind(interviewerController));
router.get('/', authMiddleware_1.authMiddleware, interviewerController.findAll.bind(interviewerController));
router.get('/:id', authMiddleware_1.authMiddleware, interviewerController.findById.bind(interviewerController));
router.put('/:id', authMiddleware_1.authMiddleware, interviewerController.update.bind(interviewerController));
router.delete('/:id', authMiddleware_1.authMiddleware, interviewerController.delete.bind(interviewerController));
router.get('/job/:jobId', authMiddleware_1.authMiddleware, interviewerController.findByJobId.bind(interviewerController));
exports.default = router;
