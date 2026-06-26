import { Router } from "express";
import { getMyPrefs, updateMyPrefs, adminGetAllPrefs } from "./notification-prefs.controller";

const router = Router();

// User routes
router.get("/me", getMyPrefs);
router.put("/me", updateMyPrefs);

// Admin routes
router.get("/", adminGetAllPrefs);

export default router;
