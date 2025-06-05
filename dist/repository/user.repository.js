"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("./base.repository");
class UserRepository extends base_repository_1.BaseRepository {
    constructor() {
        super('users');
    }
    async findByEmail(email) {
        const snapshot = await this.collection.where('email', '==', email).get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }
}
exports.UserRepository = UserRepository;
