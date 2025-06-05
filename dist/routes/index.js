"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const job_routes_1 = __importDefault(require("./job.routes"));
const interviewer_routes_1 = __importDefault(require("./interviewer.routes"));
const candidate_routes_1 = __importDefault(require("./candidate.routes"));
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.default);
router.use('/jobs', job_routes_1.default);
router.use('/interviewers', interviewer_routes_1.default);
router.use('/candidates', candidate_routes_1.default);
exports.default = router;
