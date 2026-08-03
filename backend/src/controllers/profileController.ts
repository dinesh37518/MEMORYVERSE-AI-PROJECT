import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profileService';

export class ProfileController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const rawRegNo = req.query.regNo || req.params.regNo;
      const regNo = Array.isArray(rawRegNo) ? String(rawRegNo[0]) : (typeof rawRegNo === 'string' ? rawRegNo : '');
      const profile = await ProfileService.getProfile(regNo);
      if (!profile) {
        return res.status(404).json({ error: true, message: 'Profile not found' });
      }
      res.status(200).json({ success: true, profile });
    } catch (err) {
      next(err);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profile = req.body;
      if (!profile || !profile.regNo) {
        return res.status(400).json({ error: true, message: 'Valid profile data with regNo required' });
      }
      const success = await ProfileService.updateProfile(profile);
      res.status(200).json({ success, message: success ? 'Profile updated' : 'Profile update failed' });
    } catch (err) {
      next(err);
    }
  }
}
