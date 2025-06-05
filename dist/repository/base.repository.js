"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const firebaseConfig_1 = require("../config/firebaseConfig");
class BaseRepository {
    constructor(collectionName) {
        this.collection = firebaseConfig_1.db.collection(collectionName);
    }
    async create(data) {
        const docRef = await this.collection.add({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const doc = await docRef.get();
        return { id: doc.id, ...doc.data() };
    }
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async update(id, data) {
        const docRef = this.collection.doc(id);
        await docRef.update({
            ...data,
            updatedAt: new Date(),
        });
        const doc = await docRef.get();
        if (!doc.exists)
            return null;
        return { id: doc.id, ...doc.data() };
    }
    async delete(id) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists)
            return false;
        await docRef.delete();
        return true;
    }
}
exports.BaseRepository = BaseRepository;
