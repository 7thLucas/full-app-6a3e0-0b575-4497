/*
 * Default Configurable Data — seeded into Mongo on first boot.
 *
 * BEFORE EDITING: read ./RULES.md (especially R5: schema and defaults must
 * stay in sync) and ./configurables.schema.ts. For per-type schema and
 * default-value samples, see RULES.md §5 "Field Type Reference".
 */

export type TBrandColor = {
  // Base
  background: string;
  foreground: string;
  // Card
  card: string;
  cardForeground: string;
  // Popover
  popover: string;
  popoverForeground: string;
  // Primary
  primary: string;
  primaryForeground: string;
  // Secondary
  secondary: string;
  secondaryForeground: string;
  // Muted
  muted: string;
  mutedForeground: string;
  // Accent
  accent: string;
  accentForeground: string;
  // Destructive
  destructive: string;
  destructiveForeground: string;
  // Border / Input / Ring
  border: string;
  input: string;
  ring: string;
  // Charts
  chart1?: string;
  chart2?: string;
  chart3?: string;
  chart4?: string;
  chart5?: string;
  // Navbar
  navbarBackground: string;
  // Sidebar
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type TFont = {
  headingFont: string;
  textFont: string;
};

export type TDefaultConfigurableData = {
  appName: string;
  logoUrl: string;
  brandColor: TBrandColor;
  font: TFont;
  tagline?: string;
  aboutText?: string;
  heroHeading?: string;
  heroCta?: string;
  maxEmailsPerDay?: number;
  enableResumeReminders?: boolean;
  enableSkillSuggestions?: boolean;
  enableCertRecommendations?: boolean;
  enableInterviewPrep?: boolean;
  enableMockInterviews?: boolean;
  enableProgressSummaries?: boolean;
  enableJobNudges?: boolean;
  enableAtsTips?: boolean;
  enableMilestones?: boolean;
  defaultFrequency?: string;
};

export const defaultConfigurablesData: TDefaultConfigurableData = {
  appName: "Pathly",
  logoUrl: "",
  tagline: "Your always-on career mentor",
  aboutText: "Pathly monitors your career profile, activity, and progress to send personalized email coaching — proactively, without you having to ask.",
  heroHeading: "Land your next role with AI-powered career coaching",
  heroCta: "Get Started Free",
  maxEmailsPerDay: 5,
  enableResumeReminders: true,
  enableSkillSuggestions: true,
  enableCertRecommendations: true,
  enableInterviewPrep: true,
  enableMockInterviews: true,
  enableProgressSummaries: true,
  enableJobNudges: true,
  enableAtsTips: true,
  enableMilestones: true,
  defaultFrequency: "Weekly",
  brandColor: {
    // Base
    background:        "#F8FAFC",
    foreground:        "#0F172A",
    // Card
    card:              "#ffffff",
    cardForeground:    "#0F172A",
    // Popover
    popover:           "#ffffff",
    popoverForeground: "#0F172A",
    // Primary
    primary:           "#1D4ED8",
    primaryForeground: "#ffffff",
    // Secondary
    secondary:           "#0F766E",
    secondaryForeground: "#ffffff",
    // Muted
    muted:           "#F1F5F9",
    mutedForeground: "#64748B",
    // Accent
    accent:           "#7C3AED",
    accentForeground: "#ffffff",
    // Destructive
    destructive:           "#DC2626",
    destructiveForeground: "#ffffff",
    // Border / Input / Ring
    border: "#E2E8F0",
    input:  "#E2E8F0",
    ring:   "#1D4ED8",
    // Charts
    chart1: "#1D4ED8",
    chart2: "#0F766E",
    chart3: "#7C3AED",
    chart4: "#F59E0B",
    chart5: "#10B981",
    // Navbar
    navbarBackground: "#0F172A",
    // Sidebar
    sidebarBackground:        "#0F172A",
    sidebarForeground:        "#F8FAFC",
    sidebarPrimary:           "#1D4ED8",
    sidebarPrimaryForeground: "#ffffff",
    sidebarAccent:            "#1E293B",
    sidebarAccentForeground:  "#F8FAFC",
    sidebarBorder:            "#1E293B",
    sidebarRing:              "#1D4ED8",
  },
  font: {
    headingFont: "Plus Jakarta Sans",
    textFont: "Inter",
  },
};
