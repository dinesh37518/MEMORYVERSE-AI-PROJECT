import { Router } from 'express';
import { TimelineController } from '../controllers/timelineController';

const router = Router();

router.get('/', TimelineController.getTimeline);
router.post('/', TimelineController.getTimeline);

export default router;
