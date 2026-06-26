export const NOTIFICATION_TYPES = [
  "resumeReminders",
  "skillSuggestions",
  "certRecommendations",
  "interviewPrep",
  "mockInterviews",
  "progressSummaries",
  "jobNudges",
  "atsTips",
  "milestones",
] as const;

export type NotificationType = typeof NOTIFICATION_TYPES[number];
export type NotificationFrequency = "Instant" | "Daily" | "Weekly" | "Monthly";

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  resumeReminders: "Resume Update Reminders",
  skillSuggestions: "Skill Learning Suggestions",
  certRecommendations: "Certification Recommendations",
  interviewPrep: "Interview Prep Reminders",
  mockInterviews: "Mock Interview Invitations",
  progressSummaries: "Progress Summaries",
  jobNudges: "Job Application Nudges",
  atsTips: "ATS Optimization Tips",
  milestones: "Milestone Celebrations",
};

export const NOTIFICATION_TYPE_DESCRIPTIONS: Record<NotificationType, string> = {
  resumeReminders: "Get reminded to keep your resume fresh and updated",
  skillSuggestions: "Receive curated skill learning paths based on your target roles",
  certRecommendations: "AI-recommended certifications to boost your profile",
  interviewPrep: "Timely reminders to prepare for upcoming interviews",
  mockInterviews: "Invitations to practice with AI-powered mock interviews",
  progressSummaries: "Weekly and monthly summaries of your job search progress",
  jobNudges: "Nudges to follow up on applications and stay active",
  atsTips: "Tips to optimize your resume for Applicant Tracking Systems",
  milestones: "Celebrate your achievements and career milestones",
};
