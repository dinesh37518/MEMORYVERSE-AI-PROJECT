import { DocumentItem } from '../types';

export const downloadDocumentFile = (doc: DocumentItem, userName: string = 'Dineshkumar M') => {
  // If the doc has a direct file URL (raw GitHub URL, blob URL, or data URL), open/download it directly
  if (doc.url && (doc.url.startsWith('blob:') || doc.url.startsWith('data:') || doc.url.startsWith('http://') || doc.url.startsWith('https://'))) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.target = '_blank';
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Otherwise generate an authentic, high-resolution printable formal certificate document
  const meta = doc.extractedMetadata;
  const orgName = meta.organization || meta.institution || 'Verified Credential Authority';
  const issueDate = meta.issueDate || doc.uploadDate;
  const credId = meta.credentialId || `CRED-${doc.hash.substring(0, 12).toUpperCase()}`;

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Official Certificate - ${doc.title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Montserrat:wght@400;500;600;700;800&family=Great+Vibes&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body {
            font-family: 'Montserrat', sans-serif;
            background: #e2e8f0;
            color: #0f172a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }

        .cert-paper {
            width: 1000px;
            height: 700px;
            background: #ffffff;
            background-image: radial-gradient(#f1f5f9 1px, transparent 0);
            background-size: 24px 24px;
            padding: 30px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
            overflow: hidden;
        }

        .border-outer {
            width: 100%;
            height: 100%;
            border: 4px solid #1e293b;
            padding: 8px;
            position: relative;
        }

        .border-inner {
            width: 100%;
            height: 100%;
            border: 2px solid #b45309;
            padding: 30px 40px;
            display: flex;
            flex-col;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            background: rgba(255, 255, 255, 0.95);
        }

        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Cinzel', serif;
            font-size: 110px;
            font-weight: 900;
            color: rgba(241, 245, 249, 0.7);
            text-transform: uppercase;
            letter-spacing: 15px;
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
        }

        .header-section {
            text-align: center;
            position: relative;
            z-index: 2;
        }

        .org-name {
            font-family: 'Cinzel', serif;
            font-size: 22px;
            font-weight: 800;
            color: #92400e;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 6px;
        }

        .subtitle {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 4px;
        }

        .cert-title {
            font-family: 'Cinzel', serif;
            font-size: 34px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: 2px;
            margin-top: 15px;
            margin-bottom: 5px;
            text-transform: uppercase;
        }

        .presentation-text {
            font-size: 13px;
            color: #475569;
            font-style: italic;
            margin-top: 10px;
        }

        .recipient-name {
            font-family: 'Cinzel', serif;
            font-size: 36px;
            font-weight: 800;
            color: #1e3a8a;
            letter-spacing: 2px;
            margin: 12px 0;
            padding-bottom: 6px;
            border-bottom: 2px solid #cbd5e1;
            display: inline-block;
            min-width: 400px;
            text-align: center;
        }

        .course-details {
            max-width: 780px;
            margin: 0 auto;
            text-align: center;
            font-size: 13px;
            line-height: 1.6;
            color: #334155;
            z-index: 2;
            position: relative;
        }

        .course-name {
            font-weight: 800;
            color: #0f172a;
            font-size: 16px;
        }

        .skills-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin-top: 12px;
        }

        .skill-tag {
            font-size: 10px;
            font-weight: 700;
            background: #f1f5f9;
            color: #1e293b;
            border: 1px solid #cbd5e1;
            padding: 4px 12px;
            border-radius: 20px;
        }

        .footer-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 20px;
            position: relative;
            z-index: 2;
        }

        .seal-box {
            text-align: center;
        }

        .gold-seal {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, #fbbf24 0%, #b45309 100%);
            border: 3px double #ffffff;
            box-shadow: 0 4px 10px rgba(180, 83, 9, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 6px auto;
            color: #ffffff;
            font-family: 'Cinzel', serif;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.4);
        }

        .signature-box {
            text-align: center;
            width: 220px;
        }

        .signature-script {
            font-family: 'Great Vibes', cursive;
            font-size: 32px;
            color: #1e3a8a;
            line-height: 1;
            margin-bottom: 4px;
        }

        .signature-line {
            border-top: 1px solid #94a3b8;
            padding-top: 4px;
            font-size: 11px;
            font-weight: 700;
            color: #334155;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .cred-info {
            font-size: 10px;
            color: #64748b;
            font-family: monospace;
            text-align: left;
        }

        @media print {
            body { background: white; padding: 0; }
            .cert-paper { box-shadow: none; width: 100%; height: 100vh; }
            .no-print { display: none; }
        }

        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1e3a8a;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 14px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 99;
        }
    </style>
</head>
<body>
    <button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save as Official PDF</button>

    <div class="cert-paper">
        <div class="border-outer">
            <div class="border-inner">
                <div class="watermark">VERIFIED</div>

                <div class="header-section">
                    <div class="org-name">${orgName}</div>
                    <div class="subtitle">Official Credential & Verification Authority</div>
                    <div class="cert-title">Certificate of Achievement</div>
                    <div class="presentation-text">This official credential is proudly awarded to</div>
                    <div class="recipient-name">${userName}</div>
                </div>

                <div class="course-details">
                    for successfully demonstrating verified mastery in
                    <div class="course-name" style="margin: 6px 0;">${doc.title}</div>
                    <p style="font-size: 12px; color: #64748b;">${meta.summary || 'Verified academic and professional credential issued and authenticated in MemoryVerse Vault.'}</p>
                    
                    ${meta.skills && meta.skills.length > 0 ? `
                    <div class="skills-badges">
                        ${meta.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>` : ''}
                </div>

                <div class="footer-section">
                    <div class="cred-info">
                        <div><strong>ISSUE DATE:</strong> ${issueDate}</div>
                        <div><strong>CREDENTIAL ID:</strong> ${credId}</div>
                        <div><strong>SECURITY HASH:</strong> ${doc.hash.substring(0, 16)}...</div>
                    </div>

                    <div class="seal-box">
                        <div class="gold-seal">OFFICIAL<br>VERIFIED</div>
                        <div style="font-size: 9px; font-weight: 800; color: #92400e; letter-spacing: 1px;">AUTHENTICATED</div>
                    </div>

                    <div class="signature-box">
                        <div class="signature-script">D. Director</div>
                        <div class="signature-line">Authorized Signatory</div>
                        <div style="font-size: 9px; color: #64748b;">${orgName}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  
  const cleanName = doc.fileName.replace(/\.[^/.]+$/, "");
  link.download = `${cleanName}_Official_Certificate.html`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
};
