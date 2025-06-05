"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const token = authHeader.split('Bearer ')[1];
        try {
            const decodedToken = await firebaseConfig_1.auth.verifyIdToken(token);
            req.user = {
                uid: decodedToken.uid,
                email: decodedToken.email
            };
            next();
        }
        catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.authMiddleware = authMiddleware;
