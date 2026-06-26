import type { Request, Response } from "express";
import { NotificationPrefsService } from "./notification-prefs.service";

export async function getMyPrefs(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const prefs = await NotificationPrefsService.getOrCreate(userId);
    return res.json({ success: true, data: prefs });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateMyPrefs(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, error: "Unauthorized" });
    const prefs = await NotificationPrefsService.updatePrefs(userId, req.body);
    return res.json({ success: true, data: prefs });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: err.message });
  }
}

export async function adminGetAllPrefs(req: Request, res: Response) {
  try {
    const page = parseInt(String(req.query.page ?? "1"), 10);
    const limit = parseInt(String(req.query.limit ?? "20"), 10);
    const result = await NotificationPrefsService.getAllPrefs(page, limit);
    return res.json({ success: true, data: result });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
