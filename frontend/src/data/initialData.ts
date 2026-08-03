import { 
  UserProfile, 
  DocumentItem, 
  SkillItem, 
  ProjectItem, 
  InternshipItem, 
  CertificationItem, 
  AchievementItem, 
  TimelineEvent, 
  AppNotification, 
  GraphNode, 
  GraphEdge 
} from '../types';

export const DEFAULT_STUDENT_AVATAR = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400';

// Male photo for student Dineshkumar M
export const INITIAL_USER: UserProfile = {
  id: 'usr_dinesh_01',
  name: 'Dineshkumar M',
  email: 'dineshguru0609@gmail.com',
  regNo: '922524106001',
  avatarUrl: DEFAULT_STUDENT_AVATAR,
  college: 'VSB Engineering College, Karur',
  department: 'ECE',
  section: 'A',
  currentYear: 2,
  degree: 'B.E. – Electronics & Communication Engineering',
  graduationYear: 2028,
  phone: '+91 7904554720',
  github: 'https://github.com/dinesh37518',
  linkedin: 'https://www.linkedin.com/in/dineshkumar-m-9a6ba2312',
  portfolio: 'https://github.com/dinesh37518',

  // Compulsory Coding & Social Profile URLs
  githubUrl: 'https://github.com/dinesh37518',
  linkedinUrl: 'https://www.linkedin.com/in/dineshkumar-m-9a6ba2312',
  leetcodeUrl: 'https://leetcode.com/u/dinesh37518',

  // Optional Coding Profiles
  gfgUrl: 'https://auth.geeksforgeeks.org/user/dinesh37518',
  codechefUrl: 'https://www.codechef.com/users/dinesh37518',

  bio: 'Electronics & Communication Engineering student at VSB Engineering College passionate about Full-Stack Web Development, Embedded Systems, IoT, Data Analytics, and AI platforms.',
  role: 'student',
  createdAt: '2023-09-01T08:00:00Z',
  profileCompletionPercent: 98
};

// Female photo for Admin
export const ADMIN_USER: UserProfile = {
  id: 'usr_admin_01',
  name: 'MemoryVerse System Administrator',
  email: 'vsbkaruredu@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  college: 'MemoryVerse Governance Board',
  department: 'Platform Administration & Security',
  degree: 'Master of Information Security',
  graduationYear: 2022,
  phone: '+1 (800) 555-MVAI',
  github: 'https://github.com/dinesh37518',
  linkedin: 'https://linkedin.com/company/memoryverse-ai',
  portfolio: 'https://memoryverse.ai/admin',
  bio: 'Head Platform Administrator overseeing student digital identities, OCR metadata accuracy, and database security.',
  role: 'admin',
  createdAt: '2022-01-01T08:00:00Z',
  profileCompletionPercent: 100
};

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_res_dinesh',
    title: 'Dineshkumar M Master Resume 2026',
    fileName: 'Dineshkumar_M_Resume_ECE_FullStack.pdf',
    fileType: 'pdf',
    fileSize: 1450000,
    uploadDate: '2026-02-01',
    category: 'Resume',
    url: '',
    hash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
    status: 'analyzed',
    originalName: 'Dineshkumar_M_Resume_ECE_FullStack.pdf',
    extractedMetadata: {
      category: 'Resume',
      organization: 'VSB Engineering College, Karur',
      issueDate: '2026-02-01',
      skills: ['Frontend Developer', 'Data Analytics', 'C and C++', 'Java', 'Python', 'Arduino IDE', 'MATLAB', 'Embedded C', 'HTML', 'CSS', 'JavaScript', 'Angular', 'Node.js', 'Express.js', 'MySQL'],
      technologies: ['Full Stack Web Development', 'Arduino', 'Embedded C', 'IoT', 'MySQL Database'],
      languages: ['Tamil', 'English', 'Hindi'],
      keywords: ['Resume', 'ECE Undergrad', 'Full-Stack Developer', 'Embedded Systems', 'VSB College', 'dinesh37518'],
      summary: 'Verified single-page resume of Dineshkumar M detailing B.E. ECE studies (CGPA 7.7), 3 internships, 3 major web & IoT projects, 3 certifications, and Ideathon honors.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_infosys_01',
    title: 'Infosys Springboard Angular Web Certification',
    fileName: 'INFOSYS ANGULAR WEB CERTIFICATION.pdf',
    fileType: 'pdf',
    fileSize: 2100000,
    uploadDate: '2025-07-14',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/INFOSYS%20ANGULAR%20WEB%20CERTIFICATION.pdf',
    hash: 'b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01',
    status: 'analyzed',
    originalName: 'INFOSYS ANGULAR WEB CERTIFICATION.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'Infosys Springboard',
      institution: 'Infosys Education Platform',
      certificateName: 'Angular Full Stack Certification',
      issueDate: '2025-07-14',
      credentialId: 'INFOSYS-ANG-FS-992014',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/INFOSYS%20ANGULAR%20WEB%20CERTIFICATION.pdf',
      skills: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'REST API Architecture'],
      technologies: ['Web Architecture', 'Single Page Applications'],
      languages: ['TypeScript', 'JavaScript', 'HTML/CSS'],
      keywords: ['Infosys', 'Angular', 'Full Stack', 'Certificate'],
      summary: 'Original Infosys Springboard certification document from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_intern_neuro',
    title: 'Full Stack Development Internship Certificate – Neura Global',
    fileName: 'FULLSTACK DEVELOPMENT INTERNSHIP CERTIFICATE.jpeg',
    fileType: 'jpeg',
    fileSize: 1650000,
    uploadDate: '2026-07-02',
    category: 'Internships',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/FULLSTACK%20DEVELOPMENT%20INTERNSHIP%20CERTIFICATE.jpeg',
    hash: 'e5f67890123456789abcdef0123456789abcdef0123456789abcdef01234',
    status: 'analyzed',
    originalName: 'FULLSTACK DEVELOPMENT INTERNSHIP CERTIFICATE.jpeg',
    extractedMetadata: {
      category: 'Internships',
      organization: 'Neura Global',
      internshipCompany: 'Neura Global',
      issueDate: '2026-06-30',
      duration: '1 Month (01.06.2026 to 30.06.2026)',
      credentialId: 'NG/SIP/2026/035',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/FULLSTACK%20DEVELOPMENT%20INTERNSHIP%20CERTIFICATE.jpeg',
      skills: ['Full Stack Development', 'Angular', 'Node.js', 'Express.js', 'MySQL'],
      technologies: ['Responsive Web Design', 'RESTful API Development', 'MySQL Database'],
      languages: ['JavaScript', 'HTML', 'CSS', 'SQL'],
      keywords: ['Full Stack Internship', 'Neura Global', 'Web Development'],
      summary: 'Original Neura Global Full Stack Internship completion certificate (NG/SIP/2026/035) from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_intern_manfree',
    title: 'Embedded Systems Internship Certificate – Manfree Technologies',
    fileName: 'EMBEDDED SYSTEMS INTERNSHIP CERTIFICATE.jpeg',
    fileType: 'jpeg',
    fileSize: 1540000,
    uploadDate: '2026-06-24',
    category: 'Internships',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/EMBEDDED%20SYSTEMS%20INTERNSHIP%20CERTIFICATE.jpeg',
    hash: 'f67890123456789abcdef0123456789abcdef0123456789abcdef012345',
    status: 'analyzed',
    originalName: 'EMBEDDED SYSTEMS INTERNSHIP CERTIFICATE.jpeg',
    extractedMetadata: {
      category: 'Internships',
      organization: 'Manfree Technologies – Coimbatore',
      internshipCompany: 'Manfree Technologies',
      issueDate: '2026-06-24',
      duration: '2 Weeks (08.06.2026 to 22.06.2026)',
      credentialId: 'MF26/EMD/028',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/EMBEDDED%20SYSTEMS%20INTERNSHIP%20CERTIFICATE.jpeg',
      skills: ['Embedded C', 'Arduino IDE', 'Sensors Interfacing', 'Circuit Design'],
      technologies: ['Microcontrollers', 'Arduino Uno', 'Sensor Interfacing'],
      languages: ['Embedded C', 'C++'],
      keywords: ['Manfree Technologies', 'Embedded C', 'Arduino'],
      summary: 'Original Manfree Technologies Embedded Systems internship completion certificate (MF26/EMD/028) from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    id: 'doc_cert_cisco_iot',
    title: 'Cisco Introduction to IoT Certificate',
    fileName: 'CISCO INTRODUCTION TO IOT.pdf',
    fileType: 'pdf',
    fileSize: 1750000,
    uploadDate: '2025-11-30',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/CISCO%20INTRODUCTION%20TO%20IOT.pdf',
    hash: 'c1s2c3o4i5o6t7890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'CISCO INTRODUCTION TO IOT.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'Cisco Networking Academy',
      institution: 'Cisco',
      certificateName: 'Introduction to IoT',
      issueDate: '2025-11-30',
      credentialId: 'CISCO-IOT-9920',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/CISCO%20INTRODUCTION%20TO%20IOT.pdf',
      skills: ['Internet of Things (IoT)', 'Sensors & Automation', 'Network Connectivity'],
      technologies: ['IoT Architecture', 'Smart Devices'],
      languages: ['English'],
      keywords: ['Cisco', 'IoT', 'Introduction to IoT'],
      summary: 'Original Cisco Introduction to IoT certification PDF from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_cisco_badge',
    title: 'Cisco IoT Verified Digital Badge',
    fileName: 'CISCO BADGE.png',
    fileType: 'png',
    fileSize: 850000,
    uploadDate: '2025-11-30',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/CISCO%20BADGE.png',
    hash: 'b1a2d3g4e5f67890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'CISCO BADGE.png',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'Cisco',
      certificateName: 'Cisco IoT Badge',
      issueDate: '2025-11-30',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/CISCO%20BADGE.png',
      skills: ['IoT Systems', 'Network Connectivity'],
      technologies: ['Cisco Digital Credential'],
      languages: ['English'],
      keywords: ['Cisco', 'Badge', 'IoT'],
      summary: 'Original Cisco IoT verified digital badge PNG from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_hp_ai',
    title: 'HP LIFE – AI for Beginners Certification',
    fileName: 'HP AI for Beginners.pdf',
    fileType: 'pdf',
    fileSize: 1420000,
    uploadDate: '2025-08-31',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/HP%20AI%20for%20Beginners.pdf',
    hash: 'h1p2a3i4b5e6g7890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'HP AI for Beginners.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'HP LIFE Learning Platform',
      certificateName: 'AI for Beginners',
      issueDate: '2025-08-31',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20AI%20for%20Beginners.pdf',
      skills: ['Artificial Intelligence', 'Machine Learning Basics', 'AI Ethics'],
      technologies: ['AI Platforms', 'Prompts'],
      languages: ['English'],
      keywords: ['HP', 'AI for Beginners', 'HP LIFE'],
      summary: 'Original HP LIFE AI for Beginners certificate PDF from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    id: 'doc_cert_hp_agile',
    title: 'HP LIFE – Agile Project Management Certificate',
    fileName: 'HP Agile Project Management.pdf',
    fileType: 'pdf',
    fileSize: 1510000,
    uploadDate: '2025-08-31',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/HP%20Agile%20Project%20Management.pdf',
    hash: 'h1p2a3g4i5l6e7890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'HP Agile Project Management.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'HP LIFE',
      certificateName: 'Agile Project Management',
      issueDate: '2025-08-31',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20Agile%20Project%20Management.pdf',
      skills: ['Agile Methodology', 'Scrum Framework', 'Sprint Planning'],
      technologies: ['Project Management Tools'],
      languages: ['English'],
      keywords: ['HP', 'Agile', 'Project Management'],
      summary: 'Original HP LIFE Agile Project Management certificate PDF from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_hp_email',
    title: 'HP LIFE – Business Email Communications Certificate',
    fileName: 'HP Business Email.pdf',
    fileType: 'pdf',
    fileSize: 1390000,
    uploadDate: '2025-08-31',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/HP%20Business%20Email.pdf',
    hash: 'h1p2e3m4a5i6l7890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'HP Business Email.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'HP LIFE',
      certificateName: 'Business Email Communications',
      issueDate: '2025-08-31',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20Business%20Email.pdf',
      skills: ['Professional Communication', 'Email Writing', 'Corporate Etiquette'],
      technologies: ['Email Clients'],
      languages: ['English'],
      keywords: ['HP', 'Business Email', 'Communication'],
      summary: 'Original HP LIFE Business Email certificate PDF from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    id: 'doc_cert_freedom_ai',
    title: 'Freedom with AI Masterclass Certificate',
    fileName: 'FREEDOMWITH AI.pdf',
    fileType: 'pdf',
    fileSize: 1620000,
    uploadDate: '2024-11-02',
    category: 'Certifications',
    url: 'https://raw.githubusercontent.com/dinesh37518/CERTIFICATIONS/main/FREEDOMWITH%20AI.pdf',
    hash: 'f1r2e3e4d5o6m7890123456789abcdef0123456789abcdef0123456789abcdef',
    status: 'analyzed',
    originalName: 'FREEDOMWITH AI.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'Freedom with AI Platform',
      certificateName: 'Freedom with AI Masterclass',
      issueDate: '2024-11-02',
      verificationUrl: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/FREEDOMWITH%20AI.pdf',
      skills: ['Generative AI Tools', 'Prompt Engineering', 'AI Productivity'],
      technologies: ['ChatGPT', 'Claude', 'Midjourney'],
      languages: ['English'],
      keywords: ['Freedom with AI', 'AI Masterclass'],
      summary: 'Original Freedom with AI Masterclass certificate PDF from GitHub repository dinesh37518/CERTIFICATIONS.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_intern_tneb',
    title: 'Tamil Nadu Electricity Board (TNEB) Karur – Training Letter',
    fileName: 'TNEB_Karur_InPlant_Training_Certificate.pdf',
    fileType: 'pdf',
    fileSize: 1420000,
    uploadDate: '2023-12-15',
    category: 'Internships',
    url: '',
    hash: '07890123456789abcdef0123456789abcdef0123456789abcdef0123456',
    status: 'analyzed',
    originalName: 'TNEB_Karur_InPlant_Training_Certificate.pdf',
    extractedMetadata: {
      category: 'Internships',
      organization: 'Tamil Nadu Electricity Board (TNEB)',
      internshipCompany: 'TNEB Substation – Karur',
      issueDate: '2023-12-15',
      duration: 'In-Plant Industrial Training',
      skills: ['Electrical Systems', 'Substation Operations', 'Power Distribution', 'System Safety'],
      technologies: ['Transformers', 'Power Grids', 'Control Panels'],
      languages: ['Tamil', 'English'],
      keywords: ['TNEB', 'Electrical Training', 'Karur', 'Power Systems'],
      summary: 'Practical industrial training certificate confirming completion of substation electrical system operations, power distribution, and transformer control training.',
      experienceLevel: 'Intermediate'
    }
  },
  {
    id: 'doc_proj_agri',
    title: 'WhatsApp Agriculture & Polyhouse IoT System Report',
    fileName: 'WhatsApp_Agriculture_Monitoring_System_IoT_Report.pdf',
    fileType: 'pdf',
    fileSize: 3400000,
    uploadDate: '2025-03-10',
    category: 'Projects',
    url: '',
    hash: '1890123456789abcdef0123456789abcdef0123456789abcdef01234567',
    status: 'analyzed',
    originalName: 'WhatsApp_Agriculture_Monitoring_System_IoT_Report.pdf',
    extractedMetadata: {
      category: 'Projects',
      projectName: 'Polyhouse Farming using IoT & WhatsApp Agriculture Monitoring',
      institution: 'VSB Engineering College, Karur',
      issueDate: '2025-03-10',
      skills: ['Arduino IDE', 'Embedded C', 'IoT Sensors', 'WhatsApp Bot API', 'Smart Farming'],
      technologies: ['Arduino', 'Soil Moisture Sensor', 'NodeMCU ESP8266', 'Twilio WhatsApp Bot', 'Python API'],
      languages: ['Embedded C', 'Python'],
      keywords: ['Smart Agriculture', 'IoT', 'WhatsApp Bot', 'Arduino', 'dinesh37518/PROJECT-1'],
      summary: 'Arduino-based smart agriculture & polyhouse farming project integrated with a WhatsApp bot for automated land moisture updates, temperature control, and smart farming efficiency.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_proj_cb',
    title: 'CAREER BRIDGE & SkillBridge Web Application Documentation',
    fileName: 'CareerBridge_Student_Record_Management_System_Doc.pdf',
    fileType: 'pdf',
    fileSize: 4100000,
    uploadDate: '2025-09-20',
    category: 'Projects',
    url: '',
    hash: '290123456789abcdef0123456789abcdef0123456789abcdef012345678',
    status: 'analyzed',
    originalName: 'CareerBridge_Student_Record_Management_System_Doc.pdf',
    extractedMetadata: {
      category: 'Projects',
      projectName: 'CAREER BRIDGE WEB APPLICATION & SkillBridge',
      institution: 'VSB Engineering College',
      issueDate: '2025-09-20',
      skills: ['Angular', 'Node.js', 'Express.js', 'MySQL', 'Role-Based Authentication', 'Placement Data Management'],
      technologies: ['Angular CLI', 'Express REST API', 'MySQL Database', 'JWT Auth'],
      languages: ['TypeScript', 'JavaScript', 'SQL', 'HTML/CSS'],
      keywords: ['CareerBridge', 'Student Management System', 'Angular', 'Node.js', 'dinesh37518/PROJECT-2'],
      summary: 'Web-based Student Record Management System managing student academic profiles, placement info, and placement data with role-based security.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_ach_ideathon',
    title: '1st Place Winner Trophy – Inter-College Ideathon Competition',
    fileName: 'InterCollege_Ideathon_1st_Place_Award_Certificate.png',
    fileType: 'png',
    fileSize: 2800000,
    uploadDate: '2025-02-18',
    category: 'Achievements',
    url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
    hash: '390123456789abcdef0123456789abcdef0123456789abcdef0123456789',
    status: 'analyzed',
    originalName: 'InterCollege_Ideathon_1st_Place_Award_Certificate.png',
    extractedMetadata: {
      category: 'Achievements',
      organization: 'Inter-College Ideathon Forum',
      achievementLevel: 'First Place Winner',
      issueDate: '2025-02-18',
      skills: ['Product Pitching', 'Innovative Technical Solution', 'IoT Strategy', 'Team Leadership'],
      technologies: ['Smart Systems', 'IoT Prototype'],
      languages: ['English', 'Tamil'],
      keywords: ['Ideathon', '1st Place', 'Award', 'Inter-College Innovation'],
      summary: 'Award certificate for securing 1st Place in the Inter-College Ideathon Competition presenting an IoT-enabled smart monitoring innovation.',
      experienceLevel: 'Expert'
    }
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'sk_angular',
    name: 'Angular & Frontend Development',
    category: 'Frameworks',
    level: 'Expert',
    score: 94,
    sourceDocumentIds: ['doc_cert_infosys_01', 'doc_intern_neuro', 'doc_proj_cb', 'doc_res_dinesh'],
    relatedProjectIds: ['prj_career_bridge', 'prj_skillbridge'],
    relatedCertificateIds: ['cert_infosys_ang'],
    relatedInternshipIds: ['int_neuro_global'],
    verifiedCount: 4
  },
  {
    id: 'sk_node_sql',
    name: 'Node.js, Express.js & MySQL',
    category: 'Technical',
    level: 'Advanced',
    score: 91,
    sourceDocumentIds: ['doc_cert_infosys_01', 'doc_intern_neuro', 'doc_proj_cb', 'doc_res_dinesh'],
    relatedProjectIds: ['prj_career_bridge', 'prj_skillbridge'],
    relatedCertificateIds: ['cert_infosys_ang'],
    relatedInternshipIds: ['int_neuro_global'],
    verifiedCount: 4
  },
  {
    id: 'sk_python_analytics',
    name: 'Python & Data Analytics',
    category: 'Programming Languages',
    level: 'Advanced',
    score: 89,
    sourceDocumentIds: ['doc_cert_nptel_py', 'doc_res_dinesh'],
    relatedProjectIds: ['prj_whatsapp_agri'],
    relatedCertificateIds: ['cert_nptel_py'],
    relatedInternshipIds: [],
    verifiedCount: 2
  },
  {
    id: 'sk_embedded_arduino',
    name: 'Embedded C & Arduino IDE',
    category: 'Tools',
    level: 'Advanced',
    score: 92,
    sourceDocumentIds: ['doc_intern_manfree', 'doc_proj_agri', 'doc_res_dinesh'],
    relatedProjectIds: ['prj_whatsapp_agri'],
    relatedCertificateIds: [],
    relatedInternshipIds: ['int_manfree'],
    verifiedCount: 3
  },
  {
    id: 'sk_networking',
    name: 'Computer Networks & IP Protocol',
    category: 'Domain Skills',
    level: 'Advanced',
    score: 87,
    sourceDocumentIds: ['doc_cert_nptel_cn', 'doc_res_dinesh'],
    relatedProjectIds: ['prj_whatsapp_agri'],
    relatedCertificateIds: ['cert_nptel_cn'],
    relatedInternshipIds: [],
    verifiedCount: 2
  },
  {
    id: 'sk_java_c',
    name: 'C, C++ & Java Core',
    category: 'Programming Languages',
    level: 'Intermediate',
    score: 84,
    sourceDocumentIds: ['doc_res_dinesh', 'doc_cert_nptel_cn'],
    relatedProjectIds: [],
    relatedCertificateIds: ['cert_nptel_cn'],
    relatedInternshipIds: [],
    verifiedCount: 2
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prj_whatsapp_agri',
    name: 'WhatsApp Agriculture & Polyhouse IoT System',
    description: 'Arduino-based smart agriculture project integrated with a WhatsApp bot for automated land monitoring, soil moisture updates, temperature control, and smart farming efficiency.',
    technologies: ['Arduino IDE', 'Embedded C', 'NodeMCU ESP8266', 'WhatsApp Twilio Bot', 'Sensors'],
    skillsUsed: ['Embedded C & Arduino IDE', 'Python & Data Analytics', 'Computer Networks & IP Protocol'],
    teamSize: 3,
    githubLink: 'https://github.com/dinesh37518/PROJECT-1',
    demoLink: 'https://github.com/dinesh37518/PROJECT-1',
    reportDocId: 'doc_proj_agri',
    screenshotUrls: [
      'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&q=80&w=800'
    ],
    connectedCertIds: ['cert_nptel_py'],
    connectedSkillIds: ['sk_embedded_arduino', 'sk_python_analytics'],
    date: '2025-03-10',
    category: 'IoT & Smart Systems',
    features: [
      '🌾 Real-Time Soil Moisture Sensing: Continuous land moisture telemetry via capacitive soil sensors.',
      '💬 WhatsApp Bot Automation: Instant automated land status updates sent via Twilio WhatsApp API.',
      '💧 Smart Irrigation Control: Relay-actuated water pump activation when moisture drops below threshold.',
      '📊 Environmental Telemetry: Climate monitoring using DHT11 sensors for polyhouse crop yield.'
    ],
    readmeContent: `# WhatsApp Agriculture & Polyhouse IoT Monitoring System

**Developer**: Dineshkumar M (VSB Engineering College, Karur)  
**GitHub Repo**: [https://github.com/dinesh37518/PROJECT-1](https://github.com/dinesh37518/PROJECT-1)

## Overview
An end-to-end IoT smart agriculture solution enabling automated land monitoring and polyhouse farming management. By combining Arduino hardware microcontrollers with a WhatsApp bot interface, farmers receive instant alerts and can control irrigation pumps remotely.

## Key Features
- **Automated Land Moisture Updates**: Continuous polling of soil moisture sensors sending status updates to mobile numbers.
- **Automated Irrigation Control**: Relay switch automatically powers irrigation pumps when soil moisture drops below calibrated threshold.
- **Polyhouse Climate Monitoring**: Ambient temperature and humidity logging using DHT11 sensors to maintain optimal crop health.
- **Remote WhatsApp Control**: WhatsApp bot commands allowing manual pump activation/deactivation via simple text messages.

## Tech Stack & Hardware Components
- **Microcontroller**: Arduino UNO / ESP8266 NodeMCU Wi-Fi Module
- **Sensors**: Capacitive Soil Moisture Sensor, DHT11 Temperature & Humidity Sensor
- **Actuators**: 5V Single Channel Relay Module, 12V DC Water Submersible Pump
- **Software & APIs**: Embedded C, Arduino IDE, Twilio WhatsApp API, Python API backend`
  },
  {
    id: 'prj_skillbridge',
    name: 'SkillBridge NGO Volunteer Web Platform',
    description: 'Web-based full stack platform connecting NGOs with volunteers to post opportunities, match social activities, and track event participation.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'Node.js', 'Express.js', 'MySQL'],
    skillsUsed: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL'],
    teamSize: 4,
    githubLink: 'https://github.com/dinesh37518/PROJECT-2',
    demoLink: 'https://github.com/dinesh37518/PROJECT-2',
    reportDocId: 'doc_intern_neuro',
    screenshotUrls: [
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800'
    ],
    connectedCertIds: ['cert_infosys_ang'],
    connectedSkillIds: ['sk_angular', 'sk_node_sql'],
    date: '2025-06-25',
    category: 'Full-Stack Web App',
    features: [
      '🤝 Opportunity Matching Engine: Smart matching connecting volunteers with nearby NGO events.',
      '📋 Volunteer Registration & Tracking: Real-time participation tracking and activity certificate generation.',
      '🌐 Full Stack Architecture: Built using Angular frontend, Express API backend, and MySQL database.'
    ],
    readmeContent: `# SkillBridge NGO Volunteer Web Platform

**Developer**: Dineshkumar M  
**GitHub Repo**: [https://github.com/dinesh37518/PROJECT-2](https://github.com/dinesh37518/PROJECT-2)

## Overview
SkillBridge connects social non-profits with motivated volunteers. NGOs can publish events, manage volunteer attendance, and issue digital participation certificates.

## Key Features
- **NGO Event Board**: Publish volunteer events, cause categories, and required volunteer counts.
- **Skill Matching Engine**: Recommends events based on volunteer skills and availability.
- **Activity & Hour Logging**: Tracks volunteer service hours and automatically updates student community engagement profiles.`
  },
  {
    id: 'prj_career_bridge',
    name: 'CAREER BRIDGE WEB APPLICATION',
    description: 'Centralized Student Record Management System managing student academic profiles, placement records, and company recruitment updates with role-based access.',
    technologies: ['Angular', 'Node.js', 'Express.js', 'MySQL', 'JWT Security', 'TailwindCSS'],
    skillsUsed: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL'],
    teamSize: 3,
    githubLink: 'https://github.com/dinesh37518/PROJECT-2',
    demoLink: 'https://github.com/dinesh37518/PROJECT-2',
    reportDocId: 'doc_proj_cb',
    screenshotUrls: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    ],
    connectedCertIds: ['cert_infosys_ang'],
    connectedSkillIds: ['sk_angular', 'sk_node_sql'],
    date: '2025-09-20',
    category: 'Enterprise Web Portal',
    features: [
      '🎓 Student Academic Record System: Centralized storage for student profiles, CGPA, backlogs, and resume documents.',
      '🔐 Role-Based Security: Multi-tier access control for Students, Placement Officers, and Corporate Recruiters.',
      '⚡ Angular SPA Frontend: High-performance single page application with dynamic search and filtering.',
      '🗄️ Express & MySQL Backend: Relational database queries optimized for campus placement drives.'
    ],
    readmeContent: `# CAREER BRIDGE WEB APPLICATION

**Developer**: Dineshkumar M  
**GitHub Repo**: [https://github.com/dinesh37518/PROJECT-2](https://github.com/dinesh37518/PROJECT-2)

## Overview
CAREER BRIDGE is a Student Record Management System built for colleges to manage student academic portfolios, placement eligibility, and campus recruitment drives.

## Key Features
- **Student Profile Management**: Manage academic marks, skills, resume PDF files, and certifications.
- **Placement Officer Dashboard**: Filter student lists by CGPA, department, and skill criteria.
- **Company Recruitment Management**: Post company job roles, CTC packages, and interview round dates.
- **Role-Based Authorization**: JWT authentication protecting student records and administrative actions.

## Architecture & Technologies
- **Frontend**: Angular CLI, TypeScript, HTML5, CSS3, RxJS, TailwindCSS
- **Backend**: Node.js, Express.js RESTful API engine
- **Database**: MySQL relational database
- **GitHub Repository**: [https://github.com/dinesh37518/PROJECT-2](https://github.com/dinesh37518/PROJECT-2)`
  }
];

export const INITIAL_INTERNSHIPS: InternshipItem[] = [
  {
    id: 'int_neuro_global',
    company: 'Neura Global',
    position: 'Full Stack Development Intern',
    duration: '1 Month (01.06.2026 to 30.06.2026)',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    skillsLearned: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL', 'HTML/CSS/JS'],
    documentIds: ['doc_intern_neuro'],
    certificateDocId: 'doc_intern_neuro',
    offerLetterDocId: 'doc_intern_neuro',
    experienceSummary: 'Gained practical experience designing & building responsive web applications using HTML5, CSS3, JavaScript, Angular, Node.js, Express.js, and MySQL databases.',
    location: 'Online / Remote',
    status: 'Completed'
  },
  {
    id: 'int_manfree',
    company: 'Manfree Technologies – Coimbatore',
    position: 'Embedded Systems & IoT Trainee',
    duration: '2 Weeks (08.06.2026 to 22.06.2026)',
    startDate: '2026-06-08',
    endDate: '2026-06-22',
    skillsLearned: ['Embedded C & Arduino IDE', 'Sensors Interfacing', 'MATLAB'],
    documentIds: ['doc_intern_manfree'],
    certificateDocId: 'doc_intern_manfree',
    offerLetterDocId: 'doc_intern_manfree',
    experienceSummary: 'Enhanced practical knowledge in Embedded C, Arduino UNO, electronic component sensor interfacing, and embedded circuit design.',
    location: 'Coimbatore, Tamil Nadu',
    status: 'Completed'
  },
  {
    id: 'int_tneb',
    company: 'Tamil Nadu Electricity Board (TNEB) - Karur',
    position: 'In-Plant Electrical Trainee',
    duration: '2 Weeks (Dec 2025)',
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    skillsLearned: ['Electrical Systems', 'Substation Operations', 'Power Grids'],
    documentIds: ['doc_intern_tneb'],
    certificateDocId: 'doc_intern_tneb',
    offerLetterDocId: 'doc_intern_tneb',
    experienceSummary: 'Gained practical exposure to high-voltage substation electrical operations, power distribution networks, and industrial transformer systems.',
    location: 'Karur, Tamil Nadu',
    status: 'Completed'
  }
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert_infosys_ang',
    name: 'Infosys Springboard Angular Web Certification',
    issuingOrganization: 'Infosys Springboard',
    date: '2025-07-14',
    credentialId: 'INFOSYS-ANG-FS-992014',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/INFOSYS%20ANGULAR%20WEB%20CERTIFICATION.pdf',
    skillsGained: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL'],
    documentId: 'doc_cert_infosys_01',
    status: 'Active'
  },
  {
    id: 'cert_fullstack_intern',
    name: 'Full Stack Development Internship Certificate',
    issuingOrganization: 'Neura Global',
    date: '2026-07-02',
    credentialId: 'NG/SIP/2026/035',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/FULLSTACK%20DEVELOPMENT%20INTERNSHIP%20CERTIFICATE.jpeg',
    skillsGained: ['Angular', 'Node.js', 'Express.js', 'MySQL'],
    documentId: 'doc_intern_neuro',
    status: 'Active'
  },
  {
    id: 'cert_embedded_intern',
    name: 'Embedded Systems & Microcontrollers Internship Certificate',
    issuingOrganization: 'Manfree Technologies – Coimbatore',
    date: '2026-06-24',
    credentialId: 'MF26/EMD/028',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/EMBEDDED%20SYSTEMS%20INTERNSHIP%20CERTIFICATE.jpeg',
    skillsGained: ['Embedded C & Arduino IDE', 'Sensors Interfacing', 'Circuit Design'],
    documentId: 'doc_intern_manfree',
    status: 'Active'
  },
  {
    id: 'cert_cisco_iot',
    name: 'Cisco Introduction to IoT Certification',
    issuingOrganization: 'Cisco Networking Academy',
    date: '2025-11-30',
    credentialId: 'CISCO-IOT-9920',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/CISCO%20INTRODUCTION%20TO%20IOT.pdf',
    skillsGained: ['Internet of Things (IoT)', 'Sensors & Automation', 'Network Connectivity'],
    documentId: 'doc_cert_cisco_iot',
    status: 'Active'
  },
  {
    id: 'cert_cisco_badge',
    name: 'Cisco IoT Verified Digital Badge',
    issuingOrganization: 'Cisco',
    date: '2025-11-30',
    credentialId: 'CISCO-BADGE-2025',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/CISCO%20BADGE.png',
    skillsGained: ['IoT Systems', 'Network Connectivity'],
    documentId: 'doc_cert_cisco_badge',
    status: 'Active'
  },
  {
    id: 'cert_hp_ai',
    name: 'HP LIFE – AI for Beginners Certification',
    issuingOrganization: 'HP LIFE Learning Platform',
    date: '2025-08-31',
    credentialId: '7fbdc071-39aa-4551-adda-05681d4d141d',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20AI%20for%20Beginners.pdf',
    skillsGained: ['Artificial Intelligence', 'Machine Learning Basics'],
    documentId: 'doc_cert_hp_ai',
    status: 'Active'
  },
  {
    id: 'cert_hp_agile',
    name: 'HP LIFE – Agile Project Management Certificate',
    issuingOrganization: 'HP LIFE',
    date: '2025-08-31',
    credentialId: 'cc3def39-61e2-48c7-857c-a52e43519a2a',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20Agile%20Project%20Management.pdf',
    skillsGained: ['Agile Methodology', 'Scrum Framework', 'Sprint Planning'],
    documentId: 'doc_cert_hp_agile',
    status: 'Active'
  },
  {
    id: 'cert_hp_email',
    name: 'HP LIFE – Business Email Communications Certificate',
    issuingOrganization: 'HP LIFE',
    date: '2025-08-31',
    credentialId: 'HP-EMAIL-2025',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/HP%20Business%20Email.pdf',
    skillsGained: ['Professional Communication', 'Email Writing'],
    documentId: 'doc_cert_hp_email',
    status: 'Active'
  },
  {
    id: 'cert_freedom_ai',
    name: 'Freedom with AI Masterclass Certificate',
    issuingOrganization: 'Freedom with AI Platform',
    date: '2024-11-02',
    credentialId: 'FREEDOM-AI-2024',
    verificationLink: 'https://github.com/dinesh37518/CERTIFICATIONS/blob/main/FREEDOMWITH%20AI.pdf',
    skillsGained: ['Generative AI Tools', 'Prompt Engineering', 'AI Productivity'],
    documentId: 'doc_cert_freedom_ai',
    status: 'Active'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_ideathon_1st',
    title: 'Secured First Place in Inter-College Ideathon Competition',
    type: 'Competition',
    date: '2025-11-18',
    issuerOrEvent: 'Inter-College Innovation Forum',
    description: 'Awarded 1st Place for presenting an innovative IoT-based smart land monitoring project.',
    documentId: 'doc_ach_ideathon',
    impactScore: 98
  },
  {
    id: 'ach_hackathon_3rd',
    title: 'Secured Third Prize in Inter-College Hackathon',
    type: 'Hackathon',
    date: '2025-12-05',
    issuerOrEvent: 'Inter-College Tech Fest',
    description: 'Secured 3rd Prize after building a live web application prototype within 24 hours.',
    impactScore: 92
  },
  {
    id: 'ach_ncsc_state',
    title: 'Participated in State Level NCSC (National Children’s Science Congress)',
    type: 'Award',
    date: '2021-11-20',
    issuerOrEvent: 'National Children’s Science Congress',
    description: 'Selected to represent district at the State Level NCSC science exhibition presenting eco-friendly technological projects.',
    impactScore: 90
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl_sslc',
    year: 2022,
    month: 'May',
    date: '2022-05-15',
    title: 'Completed SSLC with 86% at St. Antony\'s Matric HSS',
    category: 'Academics',
    description: 'Graduated secondary school with 86% aggregate score.',
    relatedIds: [],
    type: 'academic',
    impactScore: 80
  },
  {
    id: 'tl_hsc',
    year: 2024,
    month: 'May',
    date: '2024-05-20',
    title: 'Completed HSC with 77% at Bharani Park Matric HSS',
    category: 'Academics',
    description: 'Completed Higher Secondary Certificate studies focusing on Mathematics & Physics.',
    relatedIds: [],
    type: 'academic',
    impactScore: 82
  },
  {
    id: 'tl_college_enroll',
    year: 2024,
    month: 'Sep',
    date: '2024-09-16',
    title: 'Enrolled in B.E. ECE at VSB Engineering College, Karur',
    category: 'Academics',
    description: 'Joined VSB Engineering College pursuing B.E. Electronics & Communication Engineering (2024 - 2028).',
    relatedIds: [],
    type: 'academic',
    impactScore: 88
  },
  {
    id: 'tl_infosys_ang',
    year: 2025,
    month: 'Jul',
    date: '2025-07-14',
    title: 'Earned Infosys Springboard Angular Web Certification',
    category: 'Certifications',
    description: 'Certified in Angular, Node.js, Express, and MySQL full stack web architecture.',
    documentId: 'doc_cert_infosys_01',
    relatedIds: ['cert_infosys_ang', 'sk_angular'],
    type: 'cert',
    impactScore: 96
  },
  {
    id: 'tl_cisco_iot',
    year: 2025,
    month: 'Nov',
    date: '2025-11-30',
    title: 'Earned Cisco Introduction to IoT Certification',
    category: 'Certifications',
    description: 'Certified by Cisco Networking Academy in IoT Architecture & Automation.',
    documentId: 'doc_cert_cisco_iot',
    relatedIds: ['cert_cisco_iot', 'sk_embedded_arduino'],
    type: 'cert',
    impactScore: 90
  },
  {
    id: 'tl_tneb_training',
    year: 2025,
    month: 'Dec',
    date: '2025-12-15',
    title: 'Completed In-Plant Training at TNEB Karur',
    category: 'Internships',
    description: 'Gained practical industrial training in electrical systems and substation operations.',
    documentId: 'doc_intern_tneb',
    relatedIds: ['int_tneb'],
    type: 'internship',
    impactScore: 86
  },
  {
    id: 'tl_manfree_intern',
    year: 2026,
    month: 'Jun',
    date: '2026-06-24',
    title: 'Completed Embedded Systems Internship at Manfree Technologies',
    category: 'Internships',
    description: 'Hands-on internship training in Embedded C, Arduino hardware, and sensor circuit interfacing (Ref: MF26/EMD/028).',
    documentId: 'doc_intern_manfree',
    relatedIds: ['int_manfree', 'sk_embedded_arduino'],
    type: 'internship',
    impactScore: 89
  },
  {
    id: 'tl_neuro_intern',
    year: 2026,
    month: 'Jul',
    date: '2026-07-02',
    title: 'Completed Full Stack Internship at Neura Global',
    category: 'Internships',
    description: '1-month full stack web development internship with Angular, Node.js, and MySQL (Ref: NG/SIP/2026/035).',
    documentId: 'doc_intern_neuro',
    relatedIds: ['int_neuro_global', 'sk_angular', 'sk_node_sql'],
    type: 'internship',
    impactScore: 95
  },
  {
    id: 'tl_career_bridge',
    year: 2026,
    month: 'Jul',
    date: '2026-07-15',
    title: 'Built CAREER BRIDGE Student Record System Web App',
    category: 'Projects',
    description: 'Developed student record management system with Angular, Node, and MySQL (dinesh37518/PROJECT-2).',
    documentId: 'doc_proj_cb',
    relatedIds: ['prj_career_bridge'],
    type: 'project',
    impactScore: 93
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_01',
    type: 'ai_analysis_complete',
    title: 'AI OCR & Metadata Extraction Complete',
    message: 'Extracted Angular, Node.js, MySQL, and Embedded C skills from Dineshkumar M\'s uploaded credentials.',
    date: '2026-02-01T10:30:00Z',
    read: false
  },
  {
    id: 'notif_02',
    type: 'timeline_update',
    title: 'GitHub Repositories Synchronized',
    message: 'Linked GitHub profile https://github.com/dinesh37518 including PROJECT-1 (IoT Polyhouse Farming) and PROJECT-2 (CareerBridge).',
    date: '2026-02-01T09:15:00Z',
    read: true
  }
];

export const INITIAL_NODES: GraphNode[] = [
  { id: 'n_dinesh', label: 'Dineshkumar M (Student)', type: 'document', category: 'Identity', score: 100, x: 400, y: 300, details: 'B.E. ECE Student at VSB Engineering College (dinesh37518)' },
  { id: 'n_doc_res', label: 'Dineshkumar Resume', type: 'document', category: 'Resume', docId: 'doc_res_dinesh', x: 250, y: 150, details: 'Master ECE & Full Stack Resume' },
  { id: 'n_doc_infosys', label: 'Infosys Angular Cert', type: 'document', category: 'Certifications', docId: 'doc_cert_infosys_01', x: 550, y: 150, details: 'Angular Full Stack Certification' },
  { id: 'n_doc_agri', label: 'WhatsApp Agri IoT (PROJECT-1)', type: 'document', category: 'Projects', docId: 'doc_proj_agri', x: 200, y: 420, details: 'dinesh37518/PROJECT-1' },
  { id: 'n_doc_ideathon', label: 'Ideathon 1st Award', type: 'document', category: 'Achievements', docId: 'doc_ach_ideathon', x: 600, y: 420, details: '1st Place Ideathon Trophy' },
  { id: 'n_sk_angular', label: 'Angular & Frontend', type: 'skill', category: 'Skill', score: 94, x: 480, y: 200, details: 'Verified across Infosys Cert & Neuro Global' },
  { id: 'n_sk_embedded', label: 'Embedded C & Arduino', type: 'skill', category: 'Skill', score: 92, x: 180, y: 260, details: 'Verified in Manfree & WhatsApp Agri IoT' },
  { id: 'n_sk_py', label: 'Python & Data Analytics', type: 'skill', category: 'Skill', score: 89, x: 380, y: 180, details: 'Verified in NPTEL Certification' },
  { id: 'n_prj_cb', label: 'CareerBridge Web App (PROJECT-2)', type: 'project', category: 'Project', x: 460, y: 460, details: 'dinesh37518/PROJECT-2' },
  { id: 'n_int_neuro', label: 'Neuro Global Internship', type: 'internship', category: 'Internship', x: 680, y: 220, details: 'Full Stack Development Intern' }
];

export const INITIAL_EDGES: GraphEdge[] = [
  { id: 'e1', source: 'n_dinesh', target: 'n_doc_res', relationship: 'OWNED_BY' },
  { id: 'e2', source: 'n_dinesh', target: 'n_doc_infosys', relationship: 'OWNED_BY' },
  { id: 'e3', source: 'n_dinesh', target: 'n_doc_agri', relationship: 'OWNED_BY' },
  { id: 'e4', source: 'n_dinesh', target: 'n_doc_ideathon', relationship: 'OWNED_BY' },
  { id: 'e5', source: 'n_doc_infosys', target: 'n_sk_angular', relationship: 'VALIDATED_BY_CERT' },
  { id: 'e6', source: 'n_doc_agri', target: 'n_sk_embedded', relationship: 'USED_IN_PROJECT' },
  { id: 'e7', source: 'n_int_neuro', target: 'n_sk_angular', relationship: 'GAINED_AT_INTERNSHIP' },
  { id: 'e8', source: 'n_doc_ideathon', target: 'n_dinesh', relationship: 'AWARDED_TO' }
];

export const INITIAL_JOBS: import('../types').JobApplication[] = [
  {
    id: 'job_01',
    company: 'Google',
    role: 'Associate Software Engineer - AI / Embedded Systems',
    location: 'Bengaluru / Hybrid',
    salary: '₹18 - ₹24 LPA',
    status: 'Interviewing',
    appliedDate: '2026-01-15',
    jobUrl: 'https://careers.google.com',
    requiredSkills: ['Python & Data Analytics', 'Embedded C & Arduino IDE', 'Computer Networks & IP Protocol', 'System Design'],
    notes: 'Technical Interview round scheduled. Focus on IoT project architecture and Python background.'
  },
  {
    id: 'job_02',
    company: 'TCS Innovation Labs',
    role: 'Full Stack Engineer (Angular & Node)',
    location: 'Chennai, TN',
    salary: '₹8 - ₹12 LPA',
    status: 'Offer',
    appliedDate: '2026-01-05',
    jobUrl: 'https://tcs.com/careers',
    requiredSkills: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL', 'REST APIs'],
    notes: 'Offer letter received! Reviewing compensation package.'
  },
  {
    id: 'job_03',
    company: 'Neuro Global Solutions',
    role: 'Junior Full Stack Developer',
    location: 'Remote',
    salary: '₹6 - ₹9 LPA',
    status: 'Applied',
    appliedDate: '2026-01-20',
    jobUrl: 'https://neuroglobal.example.com',
    requiredSkills: ['Angular & Frontend Development', 'TypeScript', 'Node.js, Express.js & MySQL'],
    notes: 'Applied following successful 1-month internship completion.'
  },
  {
    id: 'job_04',
    company: 'Infosys Springboard',
    role: 'AI & Data Engineering Scholar',
    location: 'Mysuru, KA',
    salary: 'Stipend ₹35k/mo',
    status: 'Saved',
    appliedDate: '2026-01-28',
    jobUrl: 'https://infosys.com/springboard',
    requiredSkills: ['Python & Data Analytics', 'Machine Learning Core', 'SQL'],
    notes: 'Preparing portfolio docs from NPTEL & Infosys certs.'
  }
];

