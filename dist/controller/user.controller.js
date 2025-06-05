"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_repository_1 = require("../repository/user.repository");
class UserController {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    async getProfile(req, res) {
        var _a;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid)) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const user = await this.userRepository.findByEmail(req.user.email || '');
            if (!user) {
                // If user doesn't exist in Firestore, create it
                const newUser = await this.userRepository.create({
                    email: req.user.email || '',
                    password: '', // We don't store password in Firestore
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                return res.json({
                    id: newUser.id,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                });
            }
            res.json({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async updateProfile(req, res) {
        var _a;
        try {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid)) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const user = await this.userRepository.findByEmail(req.user.email || '');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const updatedUser = await this.userRepository.update(user.id, {
                ...req.body,
                updatedAt: new Date()
            });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({
                id: updatedUser.id,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.UserController = UserController;
