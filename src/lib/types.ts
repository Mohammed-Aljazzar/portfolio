export type Language = "ar" | "en";
export type Theme = "light" | "dark";

export interface SiteConfig {
  id: number;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  availabilityStatusAr: string;
  availabilityStatusEn: string;
  isAvailable: boolean;
  email: string;
  phone: string;
  locationAr: string;
  locationEn: string;
  cvUrlAr: string;
  cvUrlEn: string;
  avatarUrl: string;
  yearsOfExperience: number;
  completedProjects: number;
  trainingProgramsCount: number;
  workshopsCount: number;
  traineesCount: number;
  trainingHours: number;
}

export interface Pillar {
  number: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  technologies: string[];
  icon: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  category: "erp" | "backend" | "frontend" | "uiux";
  isFeatured: boolean;
  summaryAr: string;
  summaryEn: string;
  challengeAr?: string;
  challengeEn?: string;
  solutionAr?: string;
  solutionEn?: string;
  architectureAr?: string;
  architectureEn?: string;
  techStack: string[];
  githubUrl?: string | null;
  liveDemoUrl?: string | null;
  behanceUrl?: string | null;
  coverImage: string;
  order: number;
}

export interface Experience {
  id: string;
  roleAr: string;
  roleEn: string;
  companyAr: string;
  companyEn: string;
  locationAr: string;
  locationEn: string;
  type: "remote" | "onsite" | "hybrid";
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlightsAr: string[];
  highlightsEn: string[];
  techStack: string[];
  category: "engineering" | "operations";
  order: number;
}

export interface TrainingPartner {
  nameAr: string;
  nameEn: string;
  roleAr?: string;
  roleEn?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  logoUrl?: string;
  websiteUrl?: string | null;
}

export interface TrainingProgram {
  id: string;
  titleAr: string;
  titleEn: string;
  organizationAr: string;
  organizationEn: string;
  category: string;
  batchesCount: number;
  totalHours: number;
  traineesCount: number;
  descriptionAr: string;
  descriptionEn: string;
  topicsAr: string[];
  topicsEn: string[];
  order: number;
}

export interface Workshop {
  id: string;
  titleAr: string;
  titleEn: string;
  organizationAr: string;
  organizationEn: string;
  date: string;
  beneficiariesCount: number;
  topicsAr: string[];
  topicsEn: string[];
  order: number;
}

export interface SkillItem {
  nameAr: string;
  nameEn: string;
  level: string;
  isCore: boolean;
}

export interface EducationItem {
  id: string;
  degreeAr: string;
  degreeEn: string;
  fieldAr: string;
  fieldEn: string;
  institutionAr: string;
  institutionEn: string;
  locationAr: string;
  locationEn: string;
  period: string;
  gradeAr: string;
  gradeEn: string;
  detailsAr?: string;
  detailsEn?: string;
}

export interface CertificationItem {
  id: string;
  titleAr: string;
  titleEn: string;
  issuerAr: string;
  issuerEn: string;
  dateAr: string;
  dateEn: string;
  badge?: string;
}

export interface SocialLinkItem {
  platform: string;
  labelAr: string;
  labelEn: string;
  url: string;
  isVisible: boolean;
  order: number;
}

export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  requestType: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}
