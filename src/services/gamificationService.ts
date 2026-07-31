import { DocumentItem, CertificationItem, InternshipItem, ProjectItem, GamificationBadge } from '../types';

export function evaluateGamificationBadges(
  documents: DocumentItem[],
  certifications: CertificationItem[],
  internships: InternshipItem[],
  projects: ProjectItem[],
  profileCompletionPercent: number
): GamificationBadge[] {
  const docCount = documents.length;
  const certCount = certifications.length;
  const internCount = internships.length;
  const projCount = projects.length;

  return [
    {
      id: 'badge_first_upload',
      name: 'First Vault Upload',
      description: 'Uploaded your first document into MemoryVerse AI Store.',
      icon: 'Upload',
      unlocked: docCount >= 1,
      unlockedAt: docCount >= 1 ? '2026-02-01' : undefined,
      progress: Math.min(100, Math.round((docCount / 1) * 100))
    },
    {
      id: 'badge_vault_master',
      name: '10 Documents Vault Master',
      description: 'Indexed 10+ academic & professional records into your knowledge vault.',
      icon: 'FolderCheck',
      unlocked: docCount >= 10,
      unlockedAt: docCount >= 10 ? '2026-06-24' : undefined,
      progress: Math.min(100, Math.round((docCount / 10) * 100))
    },
    {
      id: 'badge_cert_collector',
      name: 'Certification Champion',
      description: 'Earned 5+ verified industry certifications (Infosys, Cisco, HP LIFE).',
      icon: 'Award',
      unlocked: certCount >= 5,
      unlockedAt: certCount >= 5 ? '2025-11-30' : undefined,
      progress: Math.min(100, Math.round((certCount / 5) * 100))
    },
    {
      id: 'badge_intern_veteran',
      name: 'Internship Veteran',
      description: 'Completed 3+ industry internships & in-plant technical trainings.',
      icon: 'Building2',
      unlocked: internCount >= 3,
      unlockedAt: internCount >= 3 ? '2026-06-30' : undefined,
      progress: Math.min(100, Math.round((internCount / 3) * 100))
    },
    {
      id: 'badge_project_architect',
      name: 'Project Architect',
      description: 'Built & documented 2+ major engineering projects with GitHub repositories.',
      icon: 'Briefcase',
      unlocked: projCount >= 2,
      unlockedAt: projCount >= 2 ? '2026-04-15' : undefined,
      progress: Math.min(100, Math.round((projCount / 2) * 100))
    },
    {
      id: 'badge_digital_identity',
      name: '100% Digital Twin Verified',
      description: 'Achieved complete identity completion score and full 3D graph linking.',
      icon: 'ShieldCheck',
      unlocked: profileCompletionPercent >= 95,
      unlockedAt: profileCompletionPercent >= 95 ? '2026-07-31' : undefined,
      progress: profileCompletionPercent
    }
  ];
}
