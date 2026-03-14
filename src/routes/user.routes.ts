import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { userSchema, loginSchema } from "../models/user.model";

const router = Router();

router.post("/register", validate(userSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

export default router;