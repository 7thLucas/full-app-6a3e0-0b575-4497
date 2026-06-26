import { NOTIFICATION_TYPE_LABELS } from "~/notification-prefs/notification-prefs.constants";

const MOCK_ANALYTICS = [
  { type: "resumeReminders", sent: 142, opened: 102, rate: 72 },
  { type: "skillSuggestions", sent: 138, opened: 83, rate: 60 },
  { type: "certRecommendations", sent: 125, opened: 75, rate: 60 },
  { type: "interviewPrep", sent: 98, opened: 64, rate: 65 },
  { type: "mockInterviews", sent: 87, opened: 52, rate: 60 },
  { type: "progressSummaries", sent: 210, opened: 143, rate: 68 },
  { type: "jobNudges", sent: 175, opened: 105, rate: 60 },
  { type: "atsTips", sent: 130, opened: 78, rate: 60 },
  { type: "milestones", sent: 62, opened: 50, rate: 81 },
] as const;

const ICONS: Record<string, string> = {
  resumeReminders: "📄",
  skillSuggestions: "🎯",
  certRecommendations: "🏆",
  interviewPrep: "💼",
  mockInterviews: "🎤",
  progressSummaries: "📊",
  jobNudges: "📬",
  atsTips: "🤖",
  milestones: "🎉",
};

export default function AdminNotificationsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Notification Analytics</h1>
        <p className="mt-1 text-muted-foreground">
          Delivery and open rates across all coaching email types
        </p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Sent (30d)</p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {MOCK_ANALYTICS.reduce((s, a) => s + a.sent, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Opened (30d)</p>
          <p className="mt-1 text-3xl font-bold text-foreground">
            {MOCK_ANALYTICS.reduce((s, a) => s + a.opened, 0).toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Avg Open Rate</p>
          <p className="mt-1 text-3xl font-bold text-primary">
            {Math.round(
              MOCK_ANALYTICS.reduce((s, a) => s + a.rate, 0) / MOCK_ANALYTICS.length,
            )}%
          </p>
        </div>
      </div>

      {/* Per-type table */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Breakdown by Type</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="py-3 px-6 text-left font-semibold text-muted-foreground">Type</th>
                <th className="py-3 px-6 text-right font-semibold text-muted-foreground">Sent</th>
                <th className="py-3 px-6 text-right font-semibold text-muted-foreground">Opened</th>
                <th className="py-3 px-6 text-left font-semibold text-muted-foreground w-48">Open Rate</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ANALYTICS.map((row, idx) => {
                const label = NOTIFICATION_TYPE_LABELS[row.type as keyof typeof NOTIFICATION_TYPE_LABELS];
                return (
                  <tr
                    key={row.type}
                    className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${
                      idx % 2 === 1 ? "bg-muted/10" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{ICONS[row.type]}</span>
                        <span className="font-medium text-foreground">{label}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-foreground font-medium">{row.sent}</td>
                    <td className="py-4 px-6 text-right text-foreground font-medium">{row.opened}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${row.rate}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary w-10 text-right">
                          {row.rate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
