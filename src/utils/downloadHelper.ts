import { DocumentItem } from '../types';

export const generateFormalResumeHtml = (doc: DocumentItem, userName: string = 'Dineshkumar M'): string => {
  const meta = doc.extractedMetadata;
  const issueDate = meta.issueDate || doc.uploadDate;
  const skillsList = meta.skills || ['Full Stack Web Development', 'Arduino IDE', 'Embedded C', 'Angular', 'Node.js', 'Express.js', 'MySQL', 'Python'];

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userName} - Official Master Resume</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #090d16;
            color: #f1f5f9;
            padding: 30px 20px;
            display: flex;
            justify-content: center;
        }
        .resume-container {
            width: 850px;
            background: #0f172a;
            border: 2px solid #334155;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
            position: relative;
        }
        .header {
            border-b: 2px solid #334155;
            padding-bottom: 20px;
            margin-bottom: 25px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .name {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .title-sub {
            font-size: 14px;
            font-weight: 600;
            color: #a855f7;
            margin-top: 4px;
        }
        .contact-info {
            text-align: right;
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.6;
            font-family: monospace;
        }
        .contact-info a { color: #818cf8; text-decoration: none; }
        .section-title {
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            font-weight: 800;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section { margin-bottom: 22px; }
        .summary-box {
            background: #1e293b;
            border: 1px solid #334155;
            padding: 14px 18px;
            border-radius: 12px;
            font-size: 12px;
            color: #cbd5e1;
            line-height: 1.6;
        }
        .item-card {
            background: #1e293b/60;
            border-left: 3px solid #818cf8;
            padding: 10px 14px;
            border-radius: 0 10px 10px 0;
            margin-bottom: 10px;
        }
        .item-header {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 700;
            color: #ffffff;
        }
        .item-sub { font-size: 11px; color: #a855f7; font-weight: 600; margin-top: 2px; }
        .item-desc { font-size: 11px; color: #94a3b8; margin-top: 4px; line-height: 1.5; }
        .skills-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .skill-badge {
            font-size: 10px;
            font-weight: 700;
            background: #1e1b4b;
            color: #c084fc;
            border: 1px solid #6b21a8;
            padding: 5px 12px;
            border-radius: 20px;
        }
        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #818cf8;
            color: #0f172a;
            border: none;
            padding: 10px 22px;
            font-size: 13px;
            font-weight: 800;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(129, 140, 248, 0.4);
            z-index: 999;
        }
        @media print {
            body { background: white; color: black; padding: 0; }
            .resume-container { border: none; box-shadow: none; width: 100%; background: white; color: black; }
            .print-btn { display: none; }
            .name { color: #000; }
            .summary-box { background: #f8fafc; color: #334155; border: 1px solid #ccc; }
            .item-header { color: #000; }
        }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save PDF</button>
    <div class="resume-container">
        <div class="header">
            <div>
                <h1 class="name">${userName}</h1>
                <div class="title-sub">B.E. Electronics & Communication Engineering • Full Stack & IoT Engineer</div>
            </div>
            <div class="contact-info">
                <div>Email: ${meta.organization ? 'dineshguru0609@gmail.com' : 'student@memoryverse.ai'}</div>
                <div>GitHub: <a href="https://github.com/dinesh37518" target="_blank">github.com/dinesh37518</a></div>
                <div>LeetCode: <a href="https://leetcode.com/u/dinesh37518" target="_blank">leetcode.com/u/dinesh37518</a></div>
                <div>Location: Tamil Nadu, India</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📄 Executive Summary</div>
            <div class="summary-box">
                ${meta.summary || `Verified single-page resume detailing B.E. ECE studies (Class of 2028), completed industry internships, major web & IoT engineering projects, and verified credentials indexed in MemoryVerse AI Platform.`}
            </div>
        </div>

        <div class="section">
            <div class="section-title">🎓 Education & Academic History</div>
            <div class="item-card">
                <div class="item-header">
                    <span>Bachelor of Engineering (B.E.) – Electronics & Communication</span>
                    <span>2024 – 2028</span>
                </div>
                <div class="item-sub">VSB Engineering College, Karur • RegNo: 922524106001</div>
                <div class="item-desc">Core Focus: Embedded Systems, Digital Electronics, Computer Networks, IoT, Data Structures & Relational Databases.</div>
            </div>
            <div class="item-card">
                <div class="item-header">
                    <span>Higher Secondary Certificate (HSC - Class XII)</span>
                    <span>77% (May 2024)</span>
                </div>
                <div class="item-sub">State Board of Tamil Nadu</div>
            </div>
            <div class="item-card">
                <div class="item-header">
                    <span>Secondary School Leaving Certificate (SSLC - Class X)</span>
                    <span>86% (May 2022)</span>
                </div>
                <div class="item-sub">State Board of Tamil Nadu</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">🛠️ Engineering Projects</div>
            <div class="item-card">
                <div class="item-header">
                    <span>CAREER BRIDGE Student Record Management System</span>
                    <span>PROJECT-2</span>
                </div>
                <div class="item-sub">Angular • Node.js • Express.js • MySQL • JWT Authentication</div>
                <div class="item-desc">Multi-tenant student management web app featuring role-based auth, placement metrics, and automated document OCR processing.</div>
            </div>
            <div class="item-card">
                <div class="item-header">
                    <span>WhatsApp Agriculture & Polyhouse IoT Monitoring System</span>
                    <span>PROJECT-1</span>
                </div>
                <div class="item-sub">NodeMCU ESP8266 • Embedded C • Sensors • Twilio WhatsApp API</div>
                <div class="item-desc">Smart farming IoT automation system sending real-time soil moisture and temperature webhooks to WhatsApp.</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">💼 Internships & Experience</div>
            <div class="item-card">
                <div class="item-header">
                    <span>Full Stack Development Intern</span>
                    <span>Neura Global (June 2026)</span>
                </div>
                <div class="item-desc">Built modular frontend Angular views, integrated Express REST APIs, and optimized SQL database queries.</div>
            </div>
            <div class="item-card">
                <div class="item-header">
                    <span>Embedded Systems & IoT Intern</span>
                    <span>Manfree Technologies</span>
                </div>
                <div class="item-desc">Hands-on micro-controller programming (NodeMCU, ESP32), sensor calibration, and Wi-Fi data telemetry.</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">⚡ Extracted Technical Skills</div>
            <div class="skills-grid">
                ${skillsList.map(s => `<span class="skill-badge">${s}</span>`).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;
};

export const generateFormalCertificateHtml = (doc: DocumentItem, userName: string = 'Dineshkumar M'): string => {
  const meta = doc.extractedMetadata;
  const orgName = meta.organization || meta.institution || 'Verified Credential Authority';
  const issueDate = meta.issueDate || doc.uploadDate;
  const credId = meta.credentialId || `CRED-${doc.hash.substring(0, 12).toUpperCase()}`;
  const skills = meta.skills || ['Technical Competency', 'Verified Skill'];

  return `<!DOCTYPE html>
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
            background: #0f172a;
            color: #0f172a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
        }
        .cert-paper {
            width: 950px;
            height: 670px;
            background: #ffffff;
            padding: 25px;
            position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            overflow: hidden;
        }
        .border-outer {
            width: 100%;
            height: 100%;
            border: 4px solid #1e293b;
            padding: 6px;
            position: relative;
        }
        .border-inner {
            width: 100%;
            height: 100%;
            border: 2px solid #b45309;
            padding: 25px 35px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            background: rgba(255, 255, 255, 0.98);
        }
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Cinzel', serif;
            font-size: 100px;
            font-weight: 900;
            color: rgba(241, 245, 249, 0.85);
            text-transform: uppercase;
            letter-spacing: 12px;
            pointer-events: none;
            user-select: none;
            white-space: nowrap;
        }
        .header-section { text-align: center; position: relative; z-index: 2; }
        .org-name {
            font-family: 'Cinzel', serif;
            font-size: 22px;
            font-weight: 800;
            color: #92400e;
            letter-spacing: 3px;
            text-transform: uppercase;
        }
        .subtitle { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 3px; margin-top: 2px; }
        .cert-title {
            font-family: 'Cinzel', serif;
            font-size: 30px;
            font-weight: 900;
            color: #0f172a;
            margin-top: 12px;
            text-transform: uppercase;
        }
        .presentation-text { font-size: 12px; color: #475569; font-style: italic; margin-top: 8px; }
        .recipient-name {
            font-family: 'Cinzel', serif;
            font-size: 32px;
            font-weight: 800;
            color: #1e3a8a;
            margin: 10px 0;
            padding-bottom: 4px;
            border-bottom: 2px solid #cbd5e1;
            display: inline-block;
            min-width: 380px;
            text-align: center;
        }
        .course-details { text-align: center; font-size: 12px; color: #334155; z-index: 2; position: relative; }
        .course-name { font-weight: 800; color: #0f172a; font-size: 16px; margin: 4px 0; }
        .skills-badges { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 10px; }
        .skill-tag { font-size: 10px; font-weight: 700; background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1; padding: 3px 10px; border-radius: 16px; }
        .footer-section { display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
        .gold-seal {
            width: 75px;
            height: 75px;
            border-radius: 50%;
            background: radial-gradient(circle, #fbbf24 0%, #b45309 100%);
            border: 3px double #ffffff;
            box-shadow: 0 4px 10px rgba(180, 83, 9, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            color: #ffffff;
            font-family: 'Cinzel', serif;
            font-size: 9px;
            font-weight: 900;
            text-align: center;
        }
        .signature-box { text-align: center; width: 200px; }
        .signature-script { font-family: 'Great Vibes', cursive; font-size: 30px; color: #1e3a8a; }
        .signature-line { border-top: 1px solid #94a3b8; padding-top: 3px; font-size: 10px; font-weight: 700; color: #334155; text-transform: uppercase; }
        .cred-info { font-size: 10px; color: #64748b; font-family: monospace; }
        .print-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1e3a8a;
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            z-index: 99;
        }
        @media print { .print-btn { display: none; } body { background: white; padding: 0; } }
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save Official PDF</button>
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
                    <div class="course-name">${doc.title}</div>
                    <p style="font-size: 11px; color: #64748b; max-w-md mx-auto;">${meta.summary || 'Verified credential authenticated and indexed in MemoryVerse Vault.'}</p>
                    
                    ${skills.length > 0 ? `
                    <div class="skills-badges">
                        ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                    </div>` : ''}
                </div>

                <div class="footer-section">
                    <div class="cred-info">
                        <div><strong>ISSUE DATE:</strong> ${issueDate}</div>
                        <div><strong>CREDENTIAL ID:</strong> ${credId}</div>
                        <div><strong>SECURITY HASH:</strong> ${doc.hash.substring(0, 16)}...</div>
                    </div>

                    <div style="text-align: center;">
                        <div class="gold-seal">OFFICIAL<br>VERIFIED</div>
                    </div>

                    <div class="signature-box">
                        <div class="signature-script">D. Director</div>
                        <div class="signature-line">Authorized Signatory</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
};

export const getOriginalDocumentViewUrl = (doc: DocumentItem, userName: string = 'Dineshkumar M'): string => {
  // If it is a real uploaded file (data: or blob:) and NOT dummy.pdf, return doc.url directly
  if (doc.url && (doc.url.startsWith('data:') || doc.url.startsWith('blob:')) && !doc.url.includes('dummy.pdf')) {
    return doc.url;
  }

  // If it's a resume document
  if (doc.category === 'Resume' || doc.title.toLowerCase().includes('resume')) {
    const html = generateFormalResumeHtml(doc, userName);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
  }

  // Generate authentic formal certificate document
  const html = generateFormalCertificateHtml(doc, userName);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  return URL.createObjectURL(blob);
};

export const downloadDocumentFile = (doc: DocumentItem, userName: string = 'Dineshkumar M') => {
  const isDummyUrl = doc.url && doc.url.includes('dummy.pdf');

  // If the doc has a direct user-uploaded file URL (blob: or data:) and NOT dummy.pdf, download it directly
  if (doc.url && !isDummyUrl && (doc.url.startsWith('blob:') || doc.url.startsWith('data:'))) {
    const link = document.createElement('a');
    link.href = doc.url;
    link.target = '_blank';
    link.download = doc.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Otherwise generate and download the printable formal document
  const htmlContent = (doc.category === 'Resume' || doc.title.toLowerCase().includes('resume'))
    ? generateFormalResumeHtml(doc, userName)
    : generateFormalCertificateHtml(doc, userName);

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  
  const cleanName = doc.fileName.replace(/\.[^/.]+$/, "");
  const ext = doc.category === 'Resume' ? 'Resume' : 'Official_Certificate';
  link.download = `${cleanName}_${ext}.html`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);
};
