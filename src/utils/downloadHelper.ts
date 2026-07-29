import { DocumentItem } from '../types';

export const downloadDocumentFile = (doc: DocumentItem, userName: string = 'Dineshkumar M') => {
  // If the doc has a local blob URL (uploaded in current session), download it directly
  if (doc.url && doc.url.startsWith('blob:')) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Otherwise generate a styled, verified HTML certificate/document file
  const meta = doc.extractedMetadata;
  const orgName = meta.organization || meta.institution || 'Verified Credential Authority';
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${doc.title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #090d16;
            color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 30px 20px;
        }
        .cert-container {
            width: 100%;
            max-width: 900px;
            background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 40%),
                        linear-gradient(180deg, #131b2e 0%, #0b101d 100%);
            border: 2px solid rgba(99, 102, 241, 0.4);
            border-radius: 28px;
            padding: 50px;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
            position: relative;
            overflow: hidden;
        }
        .cert-container::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; height: 6px;
            background: linear-gradient(90deg, #6366f1, #a855f7, #10b981);
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 24px;
            margin-bottom: 32px;
        }
        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .logo-box {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(99, 102, 241, 0.2);
            border: 1px solid rgba(99, 102, 241, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            color: #818cf8;
            font-size: 20px;
        }
        .brand-text {
            font-size: 18px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.02em;
        }
        .badge {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
            padding: 8px 18px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
        .cert-body {
            text-align: left;
            margin-bottom: 36px;
        }
        .org-tag {
            font-size: 13px;
            color: #818cf8;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 12px;
            display: block;
        }
        .cert-title {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            line-height: 1.25;
            margin-bottom: 16px;
        }
        .cert-summary {
            font-size: 15px;
            color: #94a3b8;
            line-height: 1.6;
            background: rgba(15, 23, 42, 0.5);
            padding: 20px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            margin-bottom: 28px;
        }
        .user-box {
            background: rgba(99, 102, 241, 0.08);
            border: 1px solid rgba(99, 102, 241, 0.25);
            border-radius: 20px;
            padding: 24px;
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .user-label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
            margin-bottom: 4px;
        }
        .user-name {
            font-size: 26px;
            font-weight: 800;
            color: #38bdf8;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-bottom: 32px;
        }
        .info-card {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 16px 20px;
            border-radius: 14px;
        }
        .info-label {
            font-size: 11px;
            color: #64748b;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .info-val {
            font-size: 14px;
            font-weight: 700;
            color: #e2e8f0;
            font-family: monospace;
        }
        .skills-section {
            margin-bottom: 32px;
        }
        .skills-title {
            font-size: 12px;
            font-weight: 700;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 12px;
        }
        .skills-flex {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill-pill {
            background: rgba(99, 102, 241, 0.15);
            color: #a5b4fc;
            border: 1px solid rgba(99, 102, 241, 0.3);
            padding: 6px 14px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
        }
        .footer {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #64748b;
        }
        .verification-seal {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #34d399;
            font-weight: 700;
        }
    </style>
</head>
<body>
    <div class="cert-container">
        <div class="header">
            <div class="brand">
                <div class="logo-box">MV</div>
                <div class="brand-text">MemoryVerse Authenticated Credential</div>
            </div>
            <div class="badge">Verified ${doc.category}</div>
        </div>

        <div class="cert-body">
            <span class="org-tag">Issuing Entity: ${orgName}</span>
            <h1 class="cert-title">${doc.title}</h1>
            <div class="cert-summary">${meta.summary || 'Official authenticated document record stored in MemoryVerse Digital Identity Vault.'}</div>
        </div>

        <div class="user-box">
            <div>
                <div class="user-label">Document Owner / Recipient</div>
                <div class="user-name">${userName}</div>
            </div>
            <div style="text-align: right;">
                <div class="user-label">Category</div>
                <div style="font-size: 14px; font-weight: 700; color: #a855f7;">${doc.category}</div>
            </div>
        </div>

        <div class="grid-2">
            <div class="info-card">
                <div class="info-label">Issue / Upload Date</div>
                <div class="info-val">${meta.issueDate || doc.uploadDate}</div>
            </div>
            ${meta.credentialId ? `
            <div class="info-card">
                <div class="info-label">Credential Verification ID</div>
                <div class="info-val" style="color: #818cf8;">${meta.credentialId}</div>
            </div>` : `
            <div class="info-card">
                <div class="info-label">Document SHA-256 Hash</div>
                <div class="info-val" style="color: #818cf8;">${doc.hash.substring(0, 20)}...</div>
            </div>`}
        </div>

        ${meta.skills && meta.skills.length > 0 ? `
        <div class="skills-section">
            <div class="skills-title">Extracted Skills & Verified Competencies</div>
            <div class="skills-flex">
                ${meta.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
            </div>
        </div>` : ''}

        <div class="footer">
            <div class="verification-seal">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                </svg>
                Cryptographically Verified Document
            </div>
            <div style="font-family: monospace; font-size: 11px;">Hash: ${doc.hash}</div>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  
  // Format clean filename for downloading
  const cleanName = doc.fileName.replace(/\.[^/.]+$/, "");
  link.download = `${cleanName}_Official_Document.html`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
};
