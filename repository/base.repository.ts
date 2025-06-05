import { db } from '../config/firebaseConfig';
import * as admin from 'firebase-admin';

export class BaseRepository<T> {
  protected collection: admin.firestore.CollectionReference<admin.firestore.DocumentData>;

  constructor(collectionName: string) {
    this.collection = db.collection(collectionName);
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const docRef = await this.collection.add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() } as T;
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as T;
  }

  async findAll(): Promise<T[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const docRef = this.collection.doc(id);
    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });
    
    const doc = await docRef.get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as T;
  }

  async delete(id: string): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) return false;
    
    await docRef.delete();
    return true;
  }
} 