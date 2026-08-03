import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../services/documentService';

export class DocumentController {
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      const { title, category, regNo, fileName } = req.body;

      const fileDetails = {
        title,
        category,
        fileName: file?.originalname || fileName || 'document.pdf',
        fileSize: file?.size || 1024 * 100,
        mimeType: file?.mimetype
      };

      const doc = await DocumentService.uploadDocument(fileDetails, String(regNo || ''));
      res.status(201).json({ success: true, document: doc });
    } catch (err) {
      next(err);
    }
  }

  static async getDocuments(req: Request, res: Response, next: NextFunction) {
    try {
      const rawRegNo = req.query.regNo;
      const regNo: string = Array.isArray(rawRegNo) ? String(rawRegNo[0]) : (typeof rawRegNo === 'string' ? rawRegNo : '');
      const docs = await DocumentService.getDocuments(regNo);
      res.status(200).json({ success: true, documents: docs });
    } catch (err) {
      next(err);
    }
  }

  static async deleteDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const rawId = req.params.id;
      const id: string = Array.isArray(rawId) ? String(rawId[0]) : String(rawId || '');
      const success = await DocumentService.deleteDocument(id);
      res.status(200).json({ success, message: success ? 'Document deleted' : 'Failed to delete' });
    } catch (err) {
      next(err);
    }
  }
}
