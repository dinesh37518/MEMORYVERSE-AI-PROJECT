import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, userDetails } = req.body;
      if (!email) {
        return res.status(400).json({ error: true, message: 'Email is required for login' });
      }
      const result = await AuthService.login(email, password, userDetails);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      if (!userData || !userData.email) {
        return res.status(400).json({ error: true, message: 'Valid user profile data and email required' });
      }
      const result = await AuthService.register(userData);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
