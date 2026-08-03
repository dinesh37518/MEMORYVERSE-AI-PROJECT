import { Request, Response, NextFunction } from 'express';
import { TimelineService } from '../services/timelineService';

export class TimelineController {
  static async getTimeline(req: Request, res: Response, next: NextFunction) {
    try {
      const rawRegNo = req.query.regNo;
      const regNo = Array.isArray(rawRegNo) ? String(rawRegNo[0]) : (typeof rawRegNo === 'string' ? rawRegNo : '');
      const bodyContext = req.body || {};
      const events = await TimelineService.getTimeline(regNo, bodyContext);
      res.status(200).json({ success: true, timeline: events });
    } catch (err) {
      next(err);
    }
  }
}
