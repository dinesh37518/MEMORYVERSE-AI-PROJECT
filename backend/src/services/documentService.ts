import { DatabaseService } from '../database/supabaseClient';
import { extractDocumentMetadata, determineFileType } from '../utils/fileParser';
import { DocumentItem, DocumentCategory } from '../models/types';

export class DocumentService {
  static async uploadDocument(fileData: { title?: string; category?: DocumentCategory; fileName: string; fileSize?: number; mimeType?: string }, regNo: string): Promise<DocumentItem> {
    const docId = 'doc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    const category: DocumentCategory = fileData.category || 'other';
    const title = fileData.title || fileData.fileName.replace(/\.[^/.]+$/, '');
    const fileType = determineFileType(fileData.fileName, fileData.mimeType);
    const metadata = extractDocumentMetadata(title, category, fileData.fileName);

    const doc: DocumentItem = {
      id: docId,
      title,
      fileName: fileData.fileName,
      originalName: fileData.fileName,
      fileType,
      fileSize: fileData.fileSize || 1024 * 150,
      uploadDate: new Date().toISOString().split('T')[0],
      category,
      url: `https://storage.memoryverse.ai/vault/${docId}/${fileData.fileName}`,
      hash: 'sha256_' + Math.random().toString(36).substring(2, 10),
      status: 'analyzed',
      extractedMetadata: metadata
    };

    await DatabaseService.upsertDocument(doc, regNo || 'REG_DEMO');
    return doc;
  }

  static async getDocuments(regNo: string): Promise<DocumentItem[]> {
    return await DatabaseService.getDocumentsByRegNo(regNo);
  }

  static async deleteDocument(docId: string): Promise<boolean> {
    return await DatabaseService.deleteDocumentById(docId);
  }
}
