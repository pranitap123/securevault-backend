import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { userSchema } from "../models/user.model";

const router = Router();

router.post("/register", validate(userSchema), registerUser);

export default router;