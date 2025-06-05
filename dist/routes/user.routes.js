"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
// Protected routes
router.get('/profile', authMiddleware_1.authMiddleware, userController.getProfile.bind(userController));
router.put('/profile', authMiddleware_1.authMiddleware, userController.updateProfile.bind(userController));
exports.default = router;
