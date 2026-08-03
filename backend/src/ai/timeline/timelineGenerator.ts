import { TimelineEvent, DocumentItem, ProjectItem, CertificationItem, InternshipItem } from '../../models/types';

export function generateTimelineEvents(
  docs: DocumentItem[] = [],
  projects: ProjectItem[] = [],
  certs: CertificationItem[] = [],
  internships: InternshipItem[] = []
): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  docs.forEach((doc, idx) => {
    events.push({
      id: `evt_doc_${doc.id || idx}`,
      date: doc.uploadDate || new Date().toISOString().split('T')[0],
      title: `Document Uploaded: ${doc.title}`,
      description: `Uploaded ${doc.fileName} under ${doc.category} category.`,
      category: doc.category,
      relatedDocId: doc.id,
      impactScore: 85
    });
  });

  certs.forEach((cert, idx) => {
    events.push({
      id: `evt_cert_${cert.id || idx}`,
      date: cert.date || new Date().toISOString().split('T')[0],
      title: `Certification Earned: ${cert.name}`,
      description: `Issued by ${cert.issuingOrganization}. Skills verified: ${cert.skillsVerified.join(', ')}.`,
      category: 'certification',
      impactScore: 92
    });
  });

  internships.forEach((intern, idx) => {
    events.push({
      id: `evt_intern_${intern.id || idx}`,
      date: new Date().toISOString().split('T')[0],
      title: `Internship Completed: ${intern.position} at ${intern.company}`,
      description: `${intern.description} (Skills: ${intern.skillsLearned.join(', ')})`,
      category: 'internship',
      impactScore: 95
    });
  });

  projects.forEach((proj, idx) => {
    events.push({
      id: `evt_proj_${proj.id || idx}`,
      date: proj.startDate || new Date().toISOString().split('T')[0],
      title: `Project Milestone: ${proj.name}`,
      description: `${proj.description} Tech stack: ${proj.technologies.join(', ')}`,
      category: 'project',
      impactScore: 90
    });
  });

  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
