import { Response } from 'express';
import { UserRepository } from '../repository/user.repository';
import { AuthRequest } from '../middleware/authMiddleware';

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.uid) {
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user?.uid) {
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
} 