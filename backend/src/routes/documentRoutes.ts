import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controllers/documentController';

const upload = multer({ limits: { fileSize: 25 * 1024 * 1024 } });
const router = Router();

router.post('/upload', upload.single('file'), DocumentController.upload);
router.get('/', DocumentController.getDocuments);
router.delete('/:id', DocumentController.deleteDocument);

export default router;
