import { DocumentItem, DocumentHealthCheck } from '../types';

export function analyzeDocumentHealth(documents: DocumentItem[]): DocumentHealthCheck[] {
  const healthChecks: DocumentHealthCheck[] = [];
  const seenHashes = new Set<string>();
  const seenNames = new Set<string>();

  documents.forEach((doc) => {
    const issues: string[] = [];

    // 1. Check for Duplicate Documents
    if (seenHashes.has(doc.hash) || seenNames.has(doc.fileName.toLowerCase())) {
      issues.push('Duplicate file detected in vault index');
    } else {
      seenHashes.add(doc.hash);
      seenNames.add(doc.fileName.toLowerCase());
    }

    // 2. Check for Incomplete Metadata
    if (!doc.extractedMetadata || !doc.extractedMetadata.skills || doc.extractedMetadata.skills.length === 0) {
      issues.push('Incomplete OCR skills metadata');
    }

    // 3. Check for File Size / Zero-byte / Blank Document
    if (!doc.fileSize || doc.fileSize < 100) {
      issues.push('Potential blank or zero-byte file');
    }

    // 4. Check for Unsupported / Deprecated File Types
    const validTypes = ['pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg', 'zip', 'txt', 'ppt', 'pptx'];
    if (!validTypes.includes(doc.fileType.toLowerCase())) {
      issues.push('Unsupported format for automatic OCR parsing');
    }

    let status: 'healthy' | 'warning' | 'error' = 'healthy';
    if (issues.length >= 2) status = 'error';
    else if (issues.length === 1) status = 'warning';

    healthChecks.push({
      id: `health_${doc.id}`,
      docId: doc.id,
      fileName: doc.fileName,
      status,
      issues
    });
  });

  return healthChecks;
}
