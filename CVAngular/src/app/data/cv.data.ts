import { CvProfile } from '../models/cv.model';

export const CV_PROFILE: CvProfile = {
  fullName: 'Nurzhan Zhorabayev',
  headline: 'Frontend Developer',
  contacts: [
    { icon: '📞', label: '+7 747 926-27-53', href: 'tel:+77479262753' },
    { icon: '✉️', label: 'zhorabayevn@gmail.com', href: 'mailto:zhorabayevn@gmail.com' },
    {
      icon: '🔗',
      label: 'GitHub',
      href: 'https://github.com/Zhorabayevv',
      external: true,
    },
    {
      icon: '🔗',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nurzhan-zhorabayev-224247259?utm_source=share&utm_campaign=share_via&utm_content=profile',
      external: true,
    },
  ],
  workFormat: 'Remote · Kazakhstan',
  about:
    'Frontend Developer with 4 years 11 months of commercial frontend experience. Specialized in Angular SPAs with TypeScript, JavaScript, RxJS and NgRx. Built and maintained multi-module enterprise and CRM UIs, integrated REST APIs, wrote unit tests, and improved performance through lazy loading and refactoring. Strong in reusable components, clean code, code review and team delivery of stable product interfaces.',
  experienceLabel: '4 years 11 months',
  jobs: [
    {
      company: 'Khan Group',
      dates: 'Aug 2024 — present',
      role: 'Frontend Developer',
      context: 'Industrial & business software · multi-module enterprise SPA',
      responsibilities: [
        'Delivered new features and maintained the Angular enterprise SPA used across internal business operations.',
        'Developed and supported 15+ Angular modules with RxJS, TypeScript and reusable UI components.',
        'Integrated REST APIs; stabilized production UI by fixing critical frontend bugs in release cycles.',
        'Implemented i18n and responsive layouts (HTML5, SCSS); optimized load with lazy-loaded routes.',
        'Refactored shared components and conducted code reviews to keep architecture and quality consistent.',
      ],
    },
    {
      company: 'Wisk Telecom Solutions',
      dates: 'May 2024 — Aug 2024',
      role: 'Frontend Developer',
      context: 'Telecom software · operations SPA built from scratch',
      responsibilities: [
        'Built the Angular SPA of a telecom operations product from scratch with modular architecture.',
        'Designed lazy-loaded module structure to reduce initial load time.',
        'Created custom UI components and integrated them with backend REST APIs.',
        'Improved maintainability through SCSS standards, shared patterns and peer code review.',
      ],
    },
    {
      company: 'Steps AI',
      dates: 'Mar 2023 — May 2024',
      role: 'Frontend Developer',
      context: 'B2B SaaS · admin / user dashboards · real-time chat',
      responsibilities: [
        'Scaled an Angular + NgRx SaaS SPA with Angular Material and real-time product features.',
        'Delivered new interfaces and extended existing functionality for B2B users in a product team.',
        'Integrated WebSocket chat and notifications; collaborated with Go/Java backend teams.',
        'Wrote and maintained unit tests (Jasmine/Karma); optimized key flows and fixed production issues.',
      ],
    },
    {
      company: 'NCRM Group',
      dates: 'May 2022 — Mar 2023',
      role: 'Frontend Developer',
      context: 'CRM platform · multi-language business users',
      responsibilities: [
        'Supported and extended the Angular CRM frontend for multi-language business users.',
        'Built CRM features with Angular, RxJS, Ng-Zorro and Angular Material; integrated Django REST.',
        'Implemented drag-and-drop UI, i18n and landing pages for product modules.',
        'Participated in CI/CD, production support and team code review.',
      ],
    },
    {
      company: 'Freelance',
      dates: 'Oct 2021 — Apr 2022',
      role: 'Frontend Developer',
      context: 'Client SPAs and landing projects',
      responsibilities: [
        'Delivered client SPAs with React, Redux, HTML5, CSS3 and REST API integration.',
      ],
    },
  ],
  skills: [
    'JavaScript',
    'TypeScript',
    'Angular',
    'Angular Material',
    'PrimeNG',
    'RxJS',
    'NgRx',
    'HTML5',
    'CSS3',
    'SCSS',
    'REST API',
    'WebSocket',
    'Unit testing (Jasmine / Karma)',
    'Reusable components',
    'Lazy loading',
    'Performance optimization',
    'Design patterns',
    'Git',
    'CI/CD',
    'Code review',
    'Scrum',
    'React (secondary)',
  ],
  education: [
    {
      institution: 'International University of Information Technologies (IITU), Almaty',
      degree: 'Information Systems · Bachelor · 2023',
      focus: 'Software development, databases, information systems design.',
    },
  ],
  languages: [
    { name: 'Russian', level: 'Native' },
    { name: 'Kazakh', level: 'Native' },
    { name: 'English', level: 'B2 (docs, work correspondence, team communication)' },
  ],
  additional:
    'Looking for Angular product teams with large SPA portfolios. Remote. Interested in clean architecture, performance and modern tooling.',
};
