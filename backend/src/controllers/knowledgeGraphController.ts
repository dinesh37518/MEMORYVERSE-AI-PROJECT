import { Request, Response, NextFunction } from 'express';
import { KnowledgeGraphService } from '../services/knowledgeGraphService';

export class KnowledgeGraphController {
  static getKnowledgeGraph(req: Request, res: Response, next: NextFunction) {
    try {
      const context = req.body || { user: { name: 'Student', email: '', regNo: '' } };
      const graph = KnowledgeGraphService.getKnowledgeGraph(context);
      res.status(200).json({ success: true, graph });
    } catch (err) {
      next(err);
    }
  }
}
