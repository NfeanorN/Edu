export interface ContactLink {
  icon: string;
  label: string;
  href: string;
  external?: boolean;
}

export interface JobExperience {
  company: string;
  dates: string;
  role: string;
  /** Short product / domain context under the company name */
  context?: string;
  responsibilities: readonly string[];
}

export interface Education {
  institution: string;
  degree: string;
  focus: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface CvProfile {
  fullName: string;
  headline: string;
  contacts: readonly ContactLink[];
  workFormat: string;
  about: string;
  experienceLabel: string;
  jobs: readonly JobExperience[];
  skills: readonly string[];
  education: readonly Education[];
  languages: readonly Language[];
  additional: string;
}
