import { Router } from 'express';
import { AIController } from '../controllers/aiController';

const router = Router();

router.post('/chat', AIController.chat);
router.post('/portfolio', AIController.portfolio);
router.post('/resume-analysis', AIController.resumeAnalysis);
router.post('/career-insights', AIController.careerInsights);

export default router;
