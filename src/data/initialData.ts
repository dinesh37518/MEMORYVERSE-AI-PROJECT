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

// Male photo for student Dineshkumar M
export const INITIAL_USER: UserProfile = {
  id: 'usr_dinesh_01',
  name: 'Dineshkumar M',
  email: 'dineshguru0609@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
  college: 'VSB Engineering College, Karur',
  department: 'Electronics & Communication Engineering',
  degree: 'B.E. – Electronics & Communication Engineering',
  graduationYear: 2026,
  phone: '+91 7904554720',
  github: 'https://github.com/dinesh37518',
  linkedin: 'https://www.linkedin.com/in/dineshkumar-m-9a6ba2312',
  portfolio: 'https://github.com/dinesh37518',
  bio: 'Electronics & Communication Engineering student at VSB Engineering College passionate about Full-Stack Web Development, Embedded Systems, IoT, Data Analytics, and AI platforms.',
  role: 'student',
  createdAt: '2023-09-01T08:00:00Z',
  profileCompletionPercent: 98
};

// Female photo for Admin
export const ADMIN_USER: UserProfile = {
  id: 'usr_admin_01',
  name: 'MemoryVerse System Administrator',
  email: 'adminofmemoryverse@gmail.com',
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
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    title: 'Angular Full Stack Certification – Infosys Springboard',
    fileName: 'Infosys_Springboard_Angular_Full_Stack_Certificate.pdf',
    fileType: 'pdf',
    fileSize: 2100000,
    uploadDate: '2025-06-15',
    category: 'Certifications',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    hash: 'b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01',
    status: 'analyzed',
    originalName: 'Infosys_Springboard_Angular_Full_Stack_Certificate.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'Infosys Springboard',
      institution: 'Infosys Education Platform',
      certificateName: 'Angular Full Stack Certification',
      issueDate: '2025-06-15',
      credentialId: 'INFOSYS-ANG-FS-992014',
      verificationUrl: 'https://springboard.infosys.com/verify/INFOSYS-ANG-FS-992014',
      skills: ['Angular', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'REST API Architecture'],
      technologies: ['Web Architecture', 'Single Page Applications'],
      languages: ['TypeScript', 'JavaScript', 'HTML/CSS'],
      keywords: ['Infosys', 'Angular', 'Full Stack', 'Certificate'],
      summary: 'Verified Infosys Springboard certification demonstrating comprehensive knowledge in building enterprise Angular frontend apps integrated with Node.js & MySQL backends.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_nptel_py',
    title: 'Data Analytics with Python – NPTEL Certification',
    fileName: 'NPTEL_Data_Analytics_with_Python_Certificate.pdf',
    fileType: 'pdf',
    fileSize: 1850000,
    uploadDate: '2025-04-20',
    category: 'Certifications',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    hash: 'c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef012',
    status: 'analyzed',
    originalName: 'NPTEL_Data_Analytics_with_Python_Certificate.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'NPTEL / IIT Madras',
      institution: 'National Programme on Technology Enhanced Learning',
      certificateName: 'Data Analytics with Python',
      issueDate: '2025-04-20',
      credentialId: 'NPTEL25CS44S8820',
      verificationUrl: 'https://nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS44S8820',
      skills: ['Python', 'Data Analytics', 'Pandas', 'NumPy', 'Data Visualization', 'Statistical Analysis'],
      technologies: ['Jupyter Notebook', 'Python Data Stack'],
      languages: ['Python'],
      keywords: ['NPTEL', 'Data Analytics', 'Python', 'IIT Certification'],
      summary: 'National level NPTEL certification in Data Analytics with Python covering data processing, cleaning, statistical modeling, and insight visualization.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_cert_nptel_cn',
    title: 'Computer Networks & Internet Protocol – NPTEL Certification',
    fileName: 'NPTEL_Computer_Networks_Internet_Protocol_Certificate.pdf',
    fileType: 'pdf',
    fileSize: 1920000,
    uploadDate: '2024-11-10',
    category: 'Certifications',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    hash: 'd4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0123',
    status: 'analyzed',
    originalName: 'NPTEL_Computer_Networks_Internet_Protocol_Certificate.pdf',
    extractedMetadata: {
      category: 'Certifications',
      organization: 'NPTEL / IIT Kharagpur',
      institution: 'NPTEL IIT Learning Platform',
      certificateName: 'Computer Networks and Internet Protocol',
      issueDate: '2024-11-10',
      credentialId: 'NPTEL24CS91S3301',
      verificationUrl: 'https://nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS91S3301',
      skills: ['Computer Networks', 'TCP/IP Protocol Stack', 'Network Security', 'Routing Algorithms', 'Ethernet'],
      technologies: ['Wireshark', 'Packet Tracer', 'Network Architecture'],
      languages: ['C++', 'Python'],
      keywords: ['NPTEL', 'Computer Networks', 'IP Protocol', 'Networking'],
      summary: 'Core engineering certification verifying mastery of TCP/IP protocol suite, network socket programming, routing protocols, and internet infrastructure.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_intern_neuro',
    title: 'Neuro Global – Full Stack Development Internship Completion Letter',
    fileName: 'Neuro_Global_Full_Stack_Internship_Completion_Letter.pdf',
    fileType: 'pdf',
    fileSize: 1650000,
    uploadDate: '2025-08-30',
    category: 'Internships',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    hash: 'e5f67890123456789abcdef0123456789abcdef0123456789abcdef01234',
    status: 'analyzed',
    originalName: 'Neuro_Global_Full_Stack_Internship_Completion_Letter.pdf',
    extractedMetadata: {
      category: 'Internships',
      organization: 'Neuro Global Technologies',
      internshipCompany: 'Neuro Global (Online Division)',
      issueDate: '2025-08-30',
      duration: '1 Month',
      skills: ['Full Stack Development', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'Angular', 'Node.js', 'Express.js', 'MySQL'],
      technologies: ['Responsive Web Design', 'RESTful API Development', 'MySQL Database'],
      languages: ['JavaScript', 'HTML', 'CSS', 'SQL'],
      keywords: ['Full Stack Internship', 'Neuro Global', 'Web Development', 'Angular', 'Node.js'],
      summary: 'Internship letter confirming Dineshkumar M completed a 1-month intensive Full Stack Development internship designing responsive web apps using Angular, Express.js, and MySQL.',
      experienceLevel: 'Advanced'
    }
  },
  {
    id: 'doc_intern_manfree',
    title: 'Manfree Technologies Coimbatore – Embedded Systems Internship Letter',
    fileName: 'Manfree_Technologies_Coimbatore_Embedded_Internship.pdf',
    fileType: 'pdf',
    fileSize: 1540000,
    uploadDate: '2024-07-25',
    category: 'Internships',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    hash: 'f67890123456789abcdef0123456789abcdef0123456789abcdef012345',
    status: 'analyzed',
    originalName: 'Manfree_Technologies_Coimbatore_Embedded_Internship.pdf',
    extractedMetadata: {
      category: 'Internships',
      organization: 'Manfree Technologies – Coimbatore',
      internshipCompany: 'Manfree Technologies',
      issueDate: '2024-07-25',
      duration: 'In-Plant / Practical Training',
      skills: ['Embedded C', 'Arduino IDE', 'Electronic Components', 'Sensors Interfacing', 'Circuit Design'],
      technologies: ['Microcontrollers', 'Arduino Uno', 'Sensor Interfacing', 'MATLAB'],
      languages: ['Embedded C', 'C++'],
      keywords: ['Manfree Technologies', 'Embedded C', 'Arduino', 'Coimbatore', 'Sensors'],
      summary: 'Practical training certificate detailing hands-on development with Embedded C, sensor hardware interfacing, electronic circuit design, and microcontrollers.',
      experienceLevel: 'Intermediate'
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
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
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
    category: 'IoT & Smart Systems'
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
    category: 'Full-Stack Web App'
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
    category: 'Enterprise Web Portal'
  }
];

export const INITIAL_INTERNSHIPS: InternshipItem[] = [
  {
    id: 'int_neuro_global',
    company: 'Neuro Global Technologies',
    position: 'Full Stack Development Intern',
    duration: '1 Month (Aug 2025)',
    startDate: '2025-08-01',
    endDate: '2025-08-30',
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
    duration: '1 Month (July 2024)',
    startDate: '2024-07-01',
    endDate: '2024-07-25',
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
    duration: '2 Weeks (Dec 2023)',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
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
    name: 'Angular Full Stack Certification',
    issuingOrganization: 'Infosys Springboard',
    date: '2025-06-15',
    credentialId: 'INFOSYS-ANG-FS-992014',
    verificationLink: 'https://springboard.infosys.com/verify/INFOSYS-ANG-FS-992014',
    skillsGained: ['Angular & Frontend Development', 'Node.js, Express.js & MySQL'],
    documentId: 'doc_cert_infosys_01',
    status: 'Active'
  },
  {
    id: 'cert_nptel_py',
    name: 'Data Analytics with Python',
    issuingOrganization: 'NPTEL / IIT Madras',
    date: '2025-04-20',
    credentialId: 'NPTEL25CS44S8820',
    verificationLink: 'https://nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS44S8820',
    skillsGained: ['Python & Data Analytics'],
    documentId: 'doc_cert_nptel_py',
    status: 'Active'
  },
  {
    id: 'cert_nptel_cn',
    name: 'Computer Networks and Internet Protocol',
    issuingOrganization: 'NPTEL / IIT Kharagpur',
    date: '2024-11-10',
    credentialId: 'NPTEL24CS91S3301',
    verificationLink: 'https://nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS91S3301',
    skillsGained: ['Computer Networks & IP Protocol'],
    documentId: 'doc_cert_nptel_cn',
    status: 'Active'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach_ideathon_1st',
    title: 'Secured First Place in Inter-College Ideathon Competition',
    type: 'Competition',
    date: '2025-02-18',
    issuerOrEvent: 'Inter-College Innovation Forum',
    description: 'Awarded 1st Place for presenting an innovative IoT-based smart land monitoring project.',
    documentId: 'doc_ach_ideathon',
    impactScore: 98
  },
  {
    id: 'ach_hackathon_3rd',
    title: 'Secured Third Prize in Inter-College Hackathon',
    type: 'Hackathon',
    date: '2025-05-12',
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
    year: 2020,
    month: 'May',
    date: '2020-05-15',
    title: 'Completed SSLC with 86% at St. Antony\'s Matric HSS',
    category: 'Academics',
    description: 'Graduated secondary school with 86% aggregate score.',
    relatedIds: [],
    type: 'academic',
    impactScore: 80
  },
  {
    id: 'tl_hsc',
    year: 2022,
    month: 'May',
    date: '2022-05-20',
    title: 'Completed HSC with 77% at Bharani Park Matric HSS',
    category: 'Academics',
    description: 'Completed Higher Secondary Certificate studies focusing on Mathematics & Physics.',
    relatedIds: [],
    type: 'academic',
    impactScore: 82
  },
  {
    id: 'tl_college_enroll',
    year: 2022,
    month: 'Sep',
    date: '2022-09-15',
    title: 'Enrolled in B.E. ECE at VSB Engineering College, Karur',
    category: 'Academics',
    description: 'Joined VSB Engineering College pursuing B.E. Electronics & Communication Engineering.',
    relatedIds: [],
    type: 'academic',
    impactScore: 88
  },
  {
    id: 'tl_tneb_training',
    year: 2023,
    month: 'Dec',
    date: '2023-12-15',
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
    year: 2024,
    month: 'Jul',
    date: '2024-07-25',
    title: 'Completed Embedded Systems Training at Manfree Technologies',
    category: 'Internships',
    description: 'Hands-on training in Embedded C, Arduino hardware, and sensor circuit interfacing.',
    documentId: 'doc_intern_manfree',
    relatedIds: ['int_manfree', 'sk_embedded_arduino'],
    type: 'internship',
    impactScore: 89
  },
  {
    id: 'tl_nptel_cn',
    year: 2024,
    month: 'Nov',
    date: '2024-11-10',
    title: 'Earned NPTEL Certification in Computer Networks & IP',
    category: 'Certifications',
    description: 'Passed NPTEL IIT Kharagpur national certification exam.',
    documentId: 'doc_cert_nptel_cn',
    relatedIds: ['cert_nptel_cn', 'sk_networking'],
    type: 'cert',
    impactScore: 90
  },
  {
    id: 'tl_ideathon_win',
    year: 2025,
    month: 'Feb',
    date: '2025-02-18',
    title: 'Won 1st Place in Inter-College Ideathon Competition',
    category: 'Achievements',
    description: 'Secured First Place presenting IoT smart monitoring innovation.',
    documentId: 'doc_ach_ideathon',
    relatedIds: ['ach_ideathon_1st'],
    type: 'achievement',
    impactScore: 98
  },
  {
    id: 'tl_agri_project',
    year: 2025,
    month: 'Mar',
    date: '2025-03-10',
    title: 'Developed WhatsApp Agriculture & Polyhouse IoT System',
    category: 'Projects',
    description: 'Built Arduino-based smart agriculture system with WhatsApp bot alerts (dinesh37518/PROJECT-1).',
    documentId: 'doc_proj_agri',
    relatedIds: ['prj_whatsapp_agri', 'sk_embedded_arduino'],
    type: 'project',
    impactScore: 94
  },
  {
    id: 'tl_nptel_py',
    year: 2025,
    month: 'Apr',
    date: '2025-04-20',
    title: 'Earned NPTEL Certification in Data Analytics with Python',
    category: 'Certifications',
    description: 'Certified by NPTEL IIT Madras in Python data analytics.',
    documentId: 'doc_cert_nptel_py',
    relatedIds: ['cert_nptel_py', 'sk_python_analytics'],
    type: 'cert',
    impactScore: 92
  },
  {
    id: 'tl_infosys_ang',
    year: 2025,
    month: 'Jun',
    date: '2025-06-15',
    title: 'Earned Angular Full Stack Certification from Infosys Springboard',
    category: 'Certifications',
    description: 'Certified in Angular, Node.js, Express, and MySQL full stack web architecture.',
    documentId: 'doc_cert_infosys_01',
    relatedIds: ['cert_infosys_ang', 'sk_angular'],
    type: 'cert',
    impactScore: 96
  },
  {
    id: 'tl_neuro_intern',
    year: 2025,
    month: 'Aug',
    date: '2025-08-30',
    title: 'Completed Full Stack Internship at Neuro Global',
    category: 'Internships',
    description: '1-month full stack web development internship with Angular and Node.js.',
    documentId: 'doc_intern_neuro',
    relatedIds: ['int_neuro_global', 'sk_angular', 'sk_node_sql'],
    type: 'internship',
    impactScore: 95
  },
  {
    id: 'tl_career_bridge',
    year: 2025,
    month: 'Sep',
    date: '2025-09-20',
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

