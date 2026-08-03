import { Router } from 'express';
import { KnowledgeGraphController } from '../controllers/knowledgeGraphController';

const router = Router();

router.get('/', KnowledgeGraphController.getKnowledgeGraph);
router.post('/', KnowledgeGraphController.getKnowledgeGraph);

export default router;
