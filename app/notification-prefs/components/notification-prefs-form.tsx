import { useState, useEffect } from "react";
import { useNotificationPrefs, type PrefItem } from "../hooks/use-notification-prefs";
import {
  NOTIFICATION_TYPES,
  NOTIFICATION_TYPE_LABELS,
  NOTIFICATION_TYPE_DESCRIPTIONS,
  type NotificationType,
  type NotificationFrequency,
} from "../notification-prefs.constants";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

const FREQUENCIES: NotificationFrequency[] = ["Instant", "Daily", "Weekly", "Monthly"];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const NOTIFICATION_ICONS: Record<NotificationType, string> = {
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

export function NotificationPrefsForm() {
  const { prefs, loading, saving, error, savePrefs } = useNotificationPrefs();
  const [localPrefs, setLocalPrefs] = useState<Record<NotificationType, PrefItem> | null>(null);
  const [preferredTime, setPreferredTime] = useState("09:00");
  const [preferredDays, setPreferredDays] = useState<string[]>(["Monday", "Wednesday", "Friday"]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (prefs) {
      const extracted: Record<string, PrefItem> = {};
      for (const type of NOTIFICATION_TYPES) {
        extracted[type] = prefs[type] as PrefItem;
      }
      setLocalPrefs(extracted as Record<NotificationType, PrefItem>);
      setPreferredTime(prefs.preferredTime ?? "09:00");
      setPreferredDays(prefs.preferredDays ?? ["Monday", "Wednesday", "Friday"]);
    }
  }, [prefs]);

  const toggleEnabled = (type: NotificationType) => {
    if (!localPrefs) return;
    setLocalPrefs({
      ...localPrefs,
      [type]: { ...localPrefs[type], enabled: !localPrefs[type].enabled },
    });
    setSaved(false);
  };

  const setFrequency = (type: NotificationType, frequency: NotificationFrequency) => {
    if (!localPrefs) return;
    setLocalPrefs({
      ...localPrefs,
      [type]: { ...localPrefs[type], frequency },
    });
    setSaved(false);
  };

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
    setSaved(false);
  };

  const handleSave = async () => {
    if (!localPrefs) return;
    const ok = await savePrefs({ prefs: localPrefs, preferredTime, preferredDays });
    if (ok) setSaved(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  if (!localPrefs) return null;

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {saved && (
        <div className="rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary font-medium">
          Preferences saved successfully.
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Notification Types</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose which coaching emails you receive and how often.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {NOTIFICATION_TYPES.map((type) => {
            const item = localPrefs[type];
            return (
              <div
                key={type}
                className={`rounded-xl border p-4 transition-all ${
                  item.enabled ? "border-border bg-card" : "border-border/50 bg-muted/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-lg">
                    {NOTIFICATION_ICONS[type]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{NOTIFICATION_TYPE_LABELS[type]}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {NOTIFICATION_TYPE_DESCRIPTIONS[type]}
                        </p>
                      </div>
                      {/* Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleEnabled(type)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          item.enabled ? "bg-secondary" : "bg-muted"
                        }`}
                        aria-label={item.enabled ? "Disable" : "Enable"}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-card shadow-lg transform transition-transform ${
                            item.enabled ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>

                    {item.enabled && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {FREQUENCIES.map((freq) => (
                          <button
                            key={freq}
                            type="button"
                            onClick={() => setFrequency(type, freq)}
                            className={`rounded-full px-3 py-1 text-xs font-medium border transition-all ${
                              item.frequency === freq
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                            }`}
                          >
                            {freq}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Delivery Schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            Set your preferred time and days for email delivery.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="preferred-time">Preferred Time</Label>
            <input
              id="preferred-time"
              type="time"
              value={preferredTime}
              onChange={(e) => {
                setPreferredTime(e.target.value);
                setSaved(false);
              }}
              className="flex h-10 w-48 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>

          <div className="space-y-3">
            <Label>Preferred Days</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                    preferredDays.includes(day)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="min-w-[140px]">
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  );
}
