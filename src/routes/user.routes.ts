import { Router } from "express";
import { 
  registerUser, 
  loginUser, 
  refreshToken, 
  getProfile 
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

router.get("/me", authMiddleware, getProfile);

export default router;