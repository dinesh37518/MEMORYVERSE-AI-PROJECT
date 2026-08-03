import { Request, Response, NextFunction } from 'express';
import { AIService } from '../services/aiServices';

export class AIController {
  static async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt, contextData, customPrompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: true, message: 'Prompt parameter is required' });
      }
      const responseText = await AIService.handleChat(prompt, contextData || {}, customPrompt);
      res.status(200).json({ success: true, text: responseText, response: responseText });
    } catch (err) {
      next(err);
    }
  }

  static async portfolio(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body;
      const result = await AIService.generatePortfolio(reqData);
      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  static async resumeAnalysis(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body;
      const result = AIService.analyzeResume(reqData);
      res.status(200).json({ success: true, analysis: result });
    } catch (err) {
      next(err);
    }
  }

  static async careerInsights(req: Request, res: Response, next: NextFunction) {
    try {
      const reqData = req.body;
      const result = AIService.generateCareerInsights(reqData);
      res.status(200).json({ success: true, insights: result });
    } catch (err) {
      next(err);
    }
  }
}
