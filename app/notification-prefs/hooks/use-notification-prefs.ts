import { useState, useEffect, useCallback } from "react";
import { apiRequest, apiGet } from "~/lib/api.client";
import type { NotificationType, NotificationFrequency } from "../notification-prefs.constants";

export interface PrefItem {
  enabled: boolean;
  frequency: NotificationFrequency;
}

export interface NotificationPrefsData {
  _id: string;
  userId: string;
  resumeReminders: PrefItem;
  skillSuggestions: PrefItem;
  certRecommendations: PrefItem;
  interviewPrep: PrefItem;
  mockInterviews: PrefItem;
  progressSummaries: PrefItem;
  jobNudges: PrefItem;
  atsTips: PrefItem;
  milestones: PrefItem;
  preferredTime: string;
  preferredDays: string[];
}

export function useNotificationPrefs() {
  const [prefs, setPrefs] = useState<NotificationPrefsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPrefs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiGet<NotificationPrefsData>("/api/notification-prefs/me");
      if (res.success && res.data) {
        setPrefs(res.data);
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to load preferences");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrefs();
  }, [fetchPrefs]);

  const savePrefs = useCallback(
    async (updates: {
      prefs: Partial<Record<NotificationType, PrefItem>>;
      preferredTime?: string;
      preferredDays?: string[];
    }) => {
      setSaving(true);
      setError(null);
      try {
        const res = await apiRequest<NotificationPrefsData>("/api/notification-prefs/me", {
          method: "PUT",
          data: updates,
        });
        if (res.success && res.data) {
          setPrefs(res.data);
          return true;
        } else {
          setError(res.error ?? "Save failed");
          return false;
        }
      } catch (err: any) {
        setError(err.message ?? "Save failed");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [],
  );

  return { prefs, loading, saving, error, savePrefs, refetch: fetchPrefs };
}
