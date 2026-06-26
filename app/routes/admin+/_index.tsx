import { useConfigurables } from "~/modules/configurables";

const STATS = [
  { label: "Total Users", value: "—", icon: "👥", color: "text-primary", bg: "bg-primary/10" },
  { label: "Emails Sent Today", value: "—", icon: "📧", color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Active Subscriptions", value: "—", icon: "🔔", color: "text-accent", bg: "bg-accent/10" },
  { label: "Open Rate", value: "—%", icon: "📬", color: "text-primary", bg: "bg-primary/10" },
];

const TOP_NOTIFICATIONS = [
  { type: "Resume Reminders", rate: "72%", icon: "📄" },
  { type: "Progress Summaries", rate: "68%", icon: "📊" },
  { type: "Milestone Celebrations", rate: "81%", icon: "🎉" },
  { type: "Interview Prep", rate: "65%", icon: "💼" },
  { type: "Skill Suggestions", rate: "60%", icon: "🎯" },
];

export default function AdminIndex() {
  const { config } = useConfigurables();
  const appName = config?.appName ?? "Pathly";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{appName} Admin</h1>
        <p className="mt-1 text-muted-foreground">Platform overview and coaching analytics</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Notification Types */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Notification Open Rates</h2>
          <div className="space-y-3">
            {TOP_NOTIFICATIONS.map((item) => (
              <div key={item.type} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{item.type}</span>
                    <span className="text-sm font-bold text-primary">{item.rate}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: item.rate }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: "View All Users", href: "/admin/users", icon: "👥" },
              { label: "Notification Analytics", href: "/admin/notifications", icon: "📈" },
              { label: "My Dashboard", href: "/dashboard", icon: "⚡" },
              { label: "My Preferences", href: "/dashboard/notification-preferences", icon: "🔔" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-all"
              >
                <span className="text-base">{action.icon}</span>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
