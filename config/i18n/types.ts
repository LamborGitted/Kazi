export interface NavTranslations {
  home: string;
  about: string;
  blog: string;
  social: string;
  projects: string;
  contact: string;
  music: string;
}

export interface HeroTranslations {
  subtitle: string;
  lines: string[];
  explore: string;
}

export interface InterestItem {
  label: string;
  emoji: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutCardsTranslations {
  bio: string;
  currently: string;
  philosophy: string;
  techStack: string;
  interests: string;
  journey: string;
  thingsToLearn: string;
  getInTouch: string;
  activeNow: string;
}

export interface AboutCtaTranslations {
  eyebrow: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

export interface AboutTranslations {
  sectionTitle: string;
  whoAmI: string;
  tagline: string;
  lines: string[];
  bio: string;
  philosophy: string;
  roles: string[];
  interests: InterestItem[];
  currently: string[];
  timeline: TimelineItem[];
  cards: AboutCardsTranslations;
  briefIntro: string;
  timelineSubtitle: string;
  timelineHeading: string;
  timelineDescription: string;
  techStack: {
    eyebrow: string;
    title: string;
    description: string;
    categories: {
      language: string;
      framework: string;
      tooling: string;
      runtime: string;
    };
  };
  cta: AboutCtaTranslations;
}

export interface BlogTranslations {
  sectionTitle: string;
  heading: string;
  description: string;
  searchPlaceholder: string;
  filteredBy: string;
  clear: string;
  noPostsFound: string;
  withTag: string;
  matching: string;
  clearAllFilters: string;
  minRead: string;
  backToBlog: string;
  morePosts: string;
  share: string;
  copyLink: string;
  copied: string;
}

export interface ContactTranslations {
  heading: string;
  subtitle: string;
  description: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  send: string;
  sending: string;
  sent: string;
  sentDescription: string;
  sendAnother: string;
  error: string;
}

export interface SocialTranslations {
  heading: string;
  subtitle: string;
  description: string;
}

export interface ProjectCategoriesTranslations {
  opensource: string;
  minecraft: string;
}

export interface ProjectsTranslations {
  heading: string;
  subtitle: string;
  description: string;
  filterAll: string;
  filterOpensource: string;
  filterMinecraft: string;
  viewProject: string;
  categories: ProjectCategoriesTranslations;
}

export interface MusicTranslations {
  heading: string;
  subtitle: string;
  description: string;
  download: string;
  noTracks: string;
}

export interface FooterTranslations {
  about: string;
  aboutDescription: string;
  online: string;
  navigation: string;
  home: string;
  connect: string;
  backToTop: string;
  designedWith: string;
}

export interface BaseTranslations {
  title: string;
  description: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  blog: BlogTranslations;
  contact: ContactTranslations;
  social: SocialTranslations;
  projects: ProjectsTranslations;
  music: MusicTranslations;
  footer: FooterTranslations;
  base: BaseTranslations;
}
