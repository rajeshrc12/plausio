import { Router } from "express";
import { getMe } from "../controllers/user.js";

const router = Router();

router.get("/me", getMe);

export default router;
