import { describe, it, expect } from 'vitest';
import { initialStudentProfile, sampleResume, upcomingHackathons, featuredCertifications } from '../lib/mockData';

describe('Navricon Infrastructure & Data Integrity', () => {
  it('should have valid initial student profile data', () => {
    expect(initialStudentProfile).toBeDefined();
    expect(initialStudentProfile.name).toBe('Alex Chen');
    expect(initialStudentProfile.skills.length).toBeGreaterThan(0);
  });

  it('should contain NPTEL, AWS, and Azure certifications', () => {
    expect(featuredCertifications).toBeDefined();
    expect(featuredCertifications.length).toBeGreaterThan(0);

    const nptelCerts = featuredCertifications.filter((c) => c.provider === 'NPTEL');
    const awsCerts = featuredCertifications.filter((c) => c.provider === 'AWS');
    const azureCerts = featuredCertifications.filter((c) => c.provider === 'Azure');

    expect(nptelCerts.length).toBeGreaterThan(0);
    expect(awsCerts.length).toBeGreaterThan(0);
    expect(azureCerts.length).toBeGreaterThan(0);
  });

  it('should contain upcoming hackathons with valid metadata', () => {
    expect(upcomingHackathons).toBeDefined();
    expect(upcomingHackathons.length).toBeGreaterThan(0);

    upcomingHackathons.forEach((h) => {
      expect(h.title).toBeTruthy();
      expect(h.prizePool).toBeTruthy();
      expect(h.techStack.length).toBeGreaterThan(0);
    });
  });

  it('should contain education and skills in sample resume', () => {
    expect(sampleResume.personalInfo.fullName).toBe('Alex Chen');
    expect(sampleResume.skills.languages).toContain('TypeScript');
  });
});
