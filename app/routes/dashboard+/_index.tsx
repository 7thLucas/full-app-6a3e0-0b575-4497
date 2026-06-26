import { useAuth } from "~/modules/authentication/use-authentication";
import { useConfigurables } from "~/modules/configurables";
import { Link } from "react-router";

const COACHING_CARDS = [
  {
    icon: "📄",
    title: "Resume Update Reminders",
    desc: "Keep your resume fresh and competitive",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: "🎯",
    title: "Skill Suggestions",
    desc: "Curated learning paths for your target roles",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: "🏆",
    title: "Cert Recommendations",
    desc: "AI-picked certifications to boost your profile",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: "💼",
    title: "Interview Prep",
    desc: "Timely reminders before your interviews",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: "📊",
    title: "Progress Summaries",
    desc: "Weekly snapshots of your job search progress",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: "🤖",
    title: "ATS Tips",
    desc: "Optimize your resume for applicant tracking systems",
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

export default function DashboardIndex() {
  const { user } = useAuth();
  const { config } = useConfigurables();

  const tagline = config?.tagline ?? "Your always-on career mentor";

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.username ?? "Job Seeker"}
        </h1>
        <p className="mt-1 text-muted-foreground">{tagline}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Emails Received</p>
          <p className="mt-2 text-3xl font-bold text-foreground">24</p>
          <p className="mt-1 text-xs text-secondary font-medium">+6 this week</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Active Notifications</p>
          <p className="mt-2 text-3xl font-bold text-foreground">9</p>
          <p className="mt-1 text-xs text-muted-foreground">All types enabled</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Days in Search</p>
          <p className="mt-2 text-3xl font-bold text-foreground">42</p>
          <p className="mt-1 text-xs text-accent font-medium">Keep going!</p>
        </div>
      </div>

      {/* Coaching Types */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Coaching Program</h2>
        <Link
          to="/dashboard/notification-preferences"
          className="text-sm text-primary font-medium hover:underline underline-offset-4"
        >
          Manage preferences
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COACHING_CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl ${card.bg}`}>
              {card.icon}
            </div>
            <h3 className={`font-semibold ${card.color}`}>{card.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-primary p-8 text-primary-foreground">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold">Customize your coaching experience</h3>
            <p className="mt-1 text-primary-foreground/80">
              Control which emails you receive, when, and how often.
            </p>
          </div>
          <Link
            to="/dashboard/notification-preferences"
            className="shrink-0 rounded-lg bg-card text-primary px-5 py-2.5 text-sm font-semibold hover:bg-card/90 transition-colors"
          >
            Set Preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
