import { Router } from 'express';
import authRoutes from './authRoutes';
import documentRoutes from './documentRoutes';
import timelineRoutes from './timelineRoutes';
import knowledgeGraphRoutes from './knowledgeGraphRoutes';
import aiRoutes from './aiRoutes';
import profileRoutes from './profileRoutes';

const router = Router();

// Router bindings matching prompt specs
router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/timeline', timelineRoutes);
router.use('/knowledge-graph', knowledgeGraphRoutes);
router.use('/profile', profileRoutes);
router.use('/', aiRoutes);

export default router;
