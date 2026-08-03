import { SkillItem, CertificationItem, ProjectItem, InternshipItem, CareerTargetRole, CareerGapAnalysis } from '../types';

export function analyzeCareerGap(
  targetRole: CareerTargetRole,
  skills: SkillItem[],
  certifications: CertificationItem[],
  projects: ProjectItem[],
  internships: InternshipItem[]
): CareerGapAnalysis {
  // Collect all verified tech keywords from user's vault with full null-safety
  const safeSkills = skills || [];
  const safeProjects = projects || [];
  const safeCerts = certifications || [];
  const safeInternships = internships || [];

  const userSkillNames = safeSkills.map(s => (s?.name || '').toLowerCase()).filter(Boolean);
  const projectTech = safeProjects.flatMap(p => [p?.title || '', ...(p?.technologies || []), p?.description || '']).map(t => (t || '').toLowerCase()).filter(Boolean);
  const certSkills = safeCerts.flatMap(c => [c?.name || '', c?.issuingOrganization || '', ...(c?.skillsGained || [])]).map(s => (s || '').toLowerCase()).filter(Boolean);
  const internshipSkills = safeInternships.flatMap(i => [i?.role || '', i?.company || '', ...(i?.skillsAcquired || [])]).map(s => (s || '').toLowerCase()).filter(Boolean);

  const userTechList = Array.from(new Set([
    ...userSkillNames,
    ...projectTech,
    ...certSkills,
    ...internshipSkills
  ]));

  let requiredSkills: string[] = [];
  let recommendedCerts: { title: string; provider: string; reason: string }[] = [];
  let recommendedProjects: { title: string; tech: string[]; description: string }[] = [];
  let learningRoadmap: { phase: string; title: string; details: string; duration: string }[] = [];

  switch (targetRole) {
    case 'AI Engineer':
      requiredSkills = ['python', 'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'rag architecture', 'langchain', 'vector dbs', 'rest api'];
      recommendedCerts = [
        { title: 'TensorFlow Developer Certificate', provider: 'Google / DeepLearning.AI', reason: 'Industry gold standard for ML neural network modeling.' },
        { title: 'Generative AI & LLM Engineering', provider: 'DeepLearning.AI', reason: 'Essential for building enterprise AI agents & RAG applications.' }
      ];
      recommendedProjects = [
        { title: 'Multi-Modal RAG Document Intelligence System', tech: ['Python', 'LangChain', 'Faiss', 'Groq API'], description: 'Build an enterprise vector search engine for complex PDF documents.' },
        { title: 'Autonomous Multi-Agent AI System', tech: ['Python', 'PyTorch', 'LangChain', 'FastAPI'], description: 'Implement autonomous decision-making agents with tool-use capabilities.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Python & Math Foundations', details: 'Master Linear Algebra, Vector Embeddings, NumPy, and PyTorch tensors.', duration: '3 Weeks' },
        { phase: 'Phase 2', title: 'Generative AI & RAG Systems', details: 'Build RAG pipelines, LangChain agents, and vector databases.', duration: '4 Weeks' },
        { phase: 'Phase 3', title: 'Deployment & MLOps', details: 'Deploy LLM microservices with FastAPI, Docker, and Cloud GPU endpoints.', duration: '3 Weeks' }
      ];
      break;

    case 'Full Stack Developer':
      requiredSkills = ['angular', 'node.js', 'express.js', 'typescript', 'mysql', 'rest api', 'html/css', 'docker', 'git'];
      recommendedCerts = [
        { title: 'AWS Certified Developer Associate', provider: 'Amazon Web Services', reason: 'Validates cloud backend deployment and serverless architecture.' },
        { title: 'Meta Front-End Developer Specialization', provider: 'Meta / Coursera', reason: 'Proves advanced frontend state management & UI optimization.' }
      ];
      recommendedProjects = [
        { title: 'Real-time Enterprise Microservices Portal', tech: ['Angular', 'Node.js', 'Socket.io', 'MySQL', 'Docker'], description: 'Full-stack application with real-time WebSockets and RBAC security.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Advanced Frontend State Management', details: 'Master RxJS observables, NgRx state, and custom CSS animations.', duration: '2 Weeks' },
        { phase: 'Phase 2', title: 'Scalable Microservice Backend', details: 'Design RESTful microservices with Node.js Express & PostgreSQL/MySQL indexing.', duration: '3 Weeks' },
        { phase: 'Phase 3', title: 'DevOps & Cloud Deployment', details: 'Configure Docker containers, Nginx reverse proxy, and AWS ECS/S3.', duration: '2 Weeks' }
      ];
      break;

    case 'Embedded Engineer':
      requiredSkills = ['embedded c', 'c/c++', 'arduino', 'microcontrollers', 'rtos', 'uart/spi/i2c', 'stm32', 'circuit design', 'matlab'];
      recommendedCerts = [
        { title: 'Embedded Systems & Real-Time Operating Systems (RTOS)', provider: 'ARM Education', reason: 'Essential for low-latency firmware design.' },
        { title: 'Cisco Certified Network Associate (CCNA)', provider: 'Cisco Systems', reason: 'Validates industrial networking and IoT edge architecture.' }
      ];
      recommendedProjects = [
        { title: 'RTOS-Based Industrial Edge Monitoring System', tech: ['STM32', 'FreeRTOS', 'Embedded C', 'MQTT'], description: 'Multi-tasking microcontroller firmware monitoring industrial sensors.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'ARM Cortex Architecture', details: 'Master ARM Cortex-M architecture, register configuration, and memory maps.', duration: '3 Weeks' },
        { phase: 'Phase 2', title: 'FreeRTOS & Multi-Tasking', details: 'Implement semaphores, message queues, and task scheduling.', duration: '3 Weeks' },
        { phase: 'Phase 3', title: 'Industrial Communication Protocols', details: 'Interface CAN bus, Modbus, and secure TLS MQTT edge telemetry.', duration: '2 Weeks' }
      ];
      break;

    case 'Data Scientist':
      requiredSkills = ['python', 'sql', 'data analytics', 'pandas', 'scikit-learn', 'data visualization', 'statistics', 'tableau', 'machine learning'];
      recommendedCerts = [
        { title: 'Google Data Analytics Professional Certificate', provider: 'Google', reason: 'Validates SQL queries, R/Python modeling, and dashboard creation.' },
        { title: 'IBM Data Science Professional Certificate', provider: 'IBM', reason: 'Deep dive into predictive analytics and ML algorithms.' }
      ];
      recommendedProjects = [
        { title: 'Predictive Yield Analytics & Dashboard', tech: ['Python', 'Pandas', 'Scikit-Learn', 'Streamlit', 'MySQL'], description: 'Machine learning model predicting crop yield from IoT sensor datasets.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Advanced SQL & Data Engineering', details: 'Master complex SQL joins, window functions, and ETL data pipelines.', duration: '2 Weeks' },
        { phase: 'Phase 2', title: 'Predictive Modeling & Scikit-Learn', details: 'Build regression, classification, and clustering models.', duration: '3 Weeks' },
        { phase: 'Phase 3', title: 'Interactive BI Dashboards', details: 'Publish interactive analytical dashboards using Streamlit & Tableau.', duration: '2 Weeks' }
      ];
      break;

    case 'Cyber Security Engineer':
      requiredSkills = ['network security', 'ethical hacking', 'cryptography', 'wireshark', 'linux', 'firewalls & vpns', 'siem / soc', 'web security (owasp)', 'python'];
      recommendedCerts = [
        { title: 'Certified Ethical Hacker (CEH)', provider: 'EC-Council', reason: 'Industry credential for penetration testing and vulnerability auditing.' },
        { title: 'CompTIA Security+ / CISSP', provider: 'CompTIA / ISC2', reason: 'Core benchmark for network defense & security architecture.' }
      ];
      recommendedProjects = [
        { title: 'Network Intrusion Detection & Traffic Analyzer System', tech: ['Python', 'Wireshark / Scapy', 'Linux', 'Snort'], description: 'Analyze live packet streams, detect port scans, and log security anomalies.' },
        { title: 'Automated Web Vulnerability & OWASP Audit Scanner', tech: ['Python', 'OWASP ZAP', 'Linux', 'Bash'], description: 'Build an automated pentesting script auditing SQLi and XSS vulnerabilities.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Network Security & Linux Hardening', details: 'Master TCP/IP packet inspection, Linux command line, IPTables, and Wireshark traffic analysis.', duration: '3 Weeks' },
        { phase: 'Phase 2', title: 'Penetration Testing & Web Security', details: 'Practice OWASP Top 10 vulnerabilities, Nmap scanning, Metasploit, and cryptography basics.', duration: '4 Weeks' },
        { phase: 'Phase 3', title: 'SOC Monitoring & SIEM Incident Response', details: 'Deploy Splunk / ELK SIEM stack, configure intrusion detection (IDS), and audit security logs.', duration: '3 Weeks' }
      ];
      break;

    default: // Software Engineer
      requiredSkills = ['data structures', 'algorithms', 'c/c++', 'java', 'python', 'sql', 'operating systems', 'computer networks', 'git', 'system design'];
      recommendedCerts = [
        { title: 'AWS Certified Solutions Architect', provider: 'Amazon Web Services', reason: 'Industry gold standard for backend systems architecture.' },
        { title: 'Oracle Certified Professional Java SE', provider: 'Oracle', reason: 'Validates enterprise object-oriented programming.' }
      ];
      recommendedProjects = [
        { title: 'High-Throughput Distributed Cache System', tech: ['C++', 'Java', 'TCP/IP Sockets', 'Multithreading'], description: 'Multi-threaded in-memory key-value store with LRU eviction.' }
      ];
      learningRoadmap = [
        { phase: 'Phase 1', title: 'Advanced DSA Problem Solving', details: 'Master Trees, Graphs, Dynamic Programming, and System Design.', duration: '4 Weeks' },
        { phase: 'Phase 2', title: 'System Design & Distributed Systems', details: 'Learn load balancing, database sharding, caching, and RPC protocols.', duration: '3 Weeks' },
        { phase: 'Phase 3', title: 'Security & Optimization', details: 'Audit secure memory management, OWASP top 10, and performance profiling.', duration: '2 Weeks' }
      ];
  }

  // Calculate matching & missing skills cleanly
  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  requiredSkills.forEach(req => {
    // Check user's verified tech list
    const found = userTechList.some(ut => {
      const u = ut.toLowerCase();
      const r = req.toLowerCase();
      if (u === r) return true;
      if (r === 'c/c++' && (u.includes('c++') || u.includes('c and c++') || u === 'c')) return true;
      if (r === 'embedded c' && (u.includes('embedded c') || u.includes('c and c++'))) return true;
      if (r === 'html/css' && (u.includes('html') || u.includes('css'))) return true;
      if (r === 'uart/spi/i2c' && (u.includes('uart') || u.includes('spi') || u.includes('i2c') || u.includes('embedded'))) return true;
      if (r === 'web security (owasp)' && (u.includes('security') || u.includes('owasp'))) return true;
      if (r === 'firewalls & vpns' && (u.includes('firewall') || u.includes('vpn') || u.includes('network'))) return true;
      if (r === 'siem / soc' && (u.includes('siem') || u.includes('soc') || u.includes('security'))) return true;
      if (r === 'network security' && (u.includes('network') || u.includes('security'))) return true;
      if (r === 'data analytics' && (u.includes('analytics') || u.includes('data'))) return true;
      if (r === 'circuit design' && (u.includes('circuit') || u.includes('hardware') || u.includes('ece'))) return true;
      return u.includes(r) || r.includes(u);
    });

    if (found) {
      matchedSkills.push(req.toUpperCase());
    } else {
      missingSkills.push(req.toUpperCase());
    }
  });

  // Calculate distinct scores per category
  const skillsScore = Math.round((matchedSkills.length / Math.max(requiredSkills.length, 1)) * 100);

  // Projects relevance calculation
  const relevantProjects = safeProjects.filter(p => {
    const projTechStr = [p?.title || '', ...(p?.technologies || []), p?.description || ''].join(' ').toLowerCase();
    return requiredSkills.some(req => projTechStr.includes((req || '').toLowerCase()));
  });
  const projectsScore = safeProjects.length > 0
    ? Math.min(100, Math.round((relevantProjects.length / safeProjects.length) * 100))
    : 0;

  // Certifications relevance calculation
  const relevantCerts = safeCerts.filter(c => {
    const certStr = [c?.name || '', c?.issuingOrganization || '', ...(c?.skillsGained || [])].join(' ').toLowerCase();
    return requiredSkills.some(req => certStr.includes((req || '').toLowerCase()));
  });
  const certsScore = safeCerts.length > 0
    ? Math.min(100, Math.round((relevantCerts.length / safeCerts.length) * 100))
    : 0;

  // Weighted overall Career Readiness Score:
  // 60% Skills + 25% Projects + 15% Certifications
  const rawWeightedScore = Math.round((skillsScore * 0.60) + (projectsScore * 0.25) + (certsScore * 0.15));
  const readinessScore = Math.min(100, Math.max(10, rawWeightedScore));

  return {
    targetRole,
    readinessScore,
    skillsScore,
    projectsScore,
    certsScore,
    totalRequiredCount: requiredSkills.length,
    matchedCount: matchedSkills.length,
    currentSkills: matchedSkills,
    missingSkills,
    recommendedCertifications: recommendedCerts,
    recommendedProjects,
    learningRoadmap
  };
}
