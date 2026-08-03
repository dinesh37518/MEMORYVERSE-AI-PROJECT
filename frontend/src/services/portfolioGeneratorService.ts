import { UserProfile, ProjectItem, CertificationItem, InternshipItem, GeneratedPortfolio } from '../types';

export function generatePortfolioContent(
  user: UserProfile,
  projects: ProjectItem[],
  certifications: CertificationItem[],
  internships: InternshipItem[]
): GeneratedPortfolio {
  const topProjects = projects.slice(0, 3);

  const professionalBio = `${user.name} is a results-driven ${user.degree} student at ${user.college} (Class of ${user.graduationYear}) specializing in Full Stack Web Development, Embedded Systems, and IoT. With ${internships.length} industry internships and ${certifications.length} verified certifications (including Infosys Angular and Cisco IoT), ${user.name} builds robust, scalable web applications and real-time hardware-cloud solutions.`;

  const portfolioSummary = `Intelligent Digital Identity Portfolio of ${user.name} (B.E. ECE student at ${user.college}, Reg No: ${user.regNo || '922524106001'}). Featuring verified credentials in Angular, Node.js, Python, C/C++, Embedded C, and MySQL. Proven track record across ${projects.length} major engineering projects and ${internships.length} industry trainings.`;

  const projectSummaries = topProjects.map(p => ({
    name: p.name,
    description: `${p.description} Tech Stack: ${p.technologies.join(', ')}. Repository: ${p.githubLink || 'dinesh37518/PROJECT'}`,
    tech: p.technologies
  }));

  const linkedinAbout = `🚀 Passional Full-Stack Web Developer & IoT Embedded Engineer | B.E. ECE Student at ${user.college} (Class of ${user.graduationYear})\n\n` +
    `Hello! I'm ${user.name}, an Electronics & Communication Engineering undergrad with hands-on expertise in building modern web applications, REST APIs, and micro-controller IoT edge platforms.\n\n` +
    `🔑 Technical Highlights:\n` +
    `• Frontend & Web: Angular, TypeScript, HTML5, CSS3, JavaScript, Responsive UI\n` +
    `• Backend & Database: Node.js, Express.js, REST API Security, MySQL\n` +
    `• IoT & Embedded: Arduino IDE, Embedded C, Cisco IoT Networking, Sensor Integration\n` +
    `• Key Projects: WhatsApp Agriculture IoT System & CAREER BRIDGE Student Management System\n\n` +
    `📫 Let's connect! Email: ${user.email} | GitHub: ${user.github || 'github.com/dinesh37518'}`;

  const resumeSummary = `Enthusiastic and technically skilled B.E. ECE student with ${internships.length} internships in Full-Stack Web Development and Embedded Systems. Proficient in Angular, Node.js, Python, C/C++, and MySQL. Recognized for building real-time IoT polyhouse platforms and student management software. Target Roles: Software Engineer / Full Stack Developer / Embedded Engineer.`;

  const careerObjective = `To secure an impactful Software Development Engineer (SDE-1) or Full-Stack Web Developer position at a forward-thinking technology company where I can apply my web development, database management, and IoT engineering skills to deliver high-quality digital solutions.`;

  return {
    professionalBio,
    portfolioSummary,
    projectSummaries,
    linkedinAbout,
    resumeSummary,
    careerObjective
  };
}
