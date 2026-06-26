import { NotificationPrefsModel } from "./notification-prefs.model";
import { NOTIFICATION_TYPES, type NotificationFrequency, type NotificationType } from "../notification-prefs.constants";

export interface UpdatePrefsDto {
  prefs: Partial<Record<NotificationType, { enabled: boolean; frequency: NotificationFrequency }>>;
  preferredTime?: string;
  preferredDays?: string[];
}

export class NotificationPrefsService {
  static async getOrCreate(userId: string) {
    let doc = await NotificationPrefsModel.findOne({ userId });
    if (!doc) {
      doc = await NotificationPrefsModel.create({ userId });
    }
    return doc;
  }

  static async updatePrefs(userId: string, dto: UpdatePrefsDto) {
    const update: Record<string, any> = {};

    for (const type of NOTIFICATION_TYPES) {
      if (dto.prefs[type] !== undefined) {
        update[type] = dto.prefs[type];
      }
    }

    if (dto.preferredTime !== undefined) {
      update.preferredTime = dto.preferredTime;
    }
    if (dto.preferredDays !== undefined) {
      update.preferredDays = dto.preferredDays;
    }

    const doc = await NotificationPrefsModel.findOneAndUpdate(
      { userId },
      { $set: update },
      { new: true, upsert: true },
    );

    return doc;
  }

  static async getAllPrefs(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      NotificationPrefsModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      NotificationPrefsModel.countDocuments(),
    ]);
    return { items, total, page, limit };
  }
}
