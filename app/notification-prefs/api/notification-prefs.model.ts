import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { CommonTypegooseEntity } from "~/api/models/base/common-typegoose.entity";
import type { NotificationFrequency } from "../notification-prefs.constants";

export class NotificationPrefItem {
  @prop({ type: Boolean, default: true })
  enabled!: boolean;

  @prop({ type: String, default: "Weekly" })
  frequency!: NotificationFrequency;
}

@modelOptions({
  schemaOptions: {
    collection: "tbl_notification_prefs",
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
})
export class NotificationPrefs extends CommonTypegooseEntity {
  @prop({ type: String, required: true, unique: true })
  userId!: string;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  resumeReminders!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  skillSuggestions!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  certRecommendations!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  interviewPrep!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  mockInterviews!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Monthly" }) })
  progressSummaries!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  jobNudges!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Weekly" }) })
  atsTips!: NotificationPrefItem;

  @prop({ type: NotificationPrefItem, _id: false, default: () => ({ enabled: true, frequency: "Monthly" }) })
  milestones!: NotificationPrefItem;

  @prop({ type: String, default: "09:00" })
  preferredTime!: string;

  @prop({ type: [String], default: ["Monday", "Wednesday", "Friday"] })
  preferredDays!: string[];
}

export const NotificationPrefsModel = getModelForClass(NotificationPrefs);
