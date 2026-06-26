import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  sendVerification,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getUsers,
} from "./authentication.controller";
import { requireAuth, requireAdmin } from "./authentication.middleware";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/me", requireAuth, me);
router.post("/auth/send-verification", requireAuth, sendVerification);
router.post("/auth/verify-email", requireAuth, verifyEmail);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);
router.get("/auth/users", requireAdmin, getUsers);

export default router;
