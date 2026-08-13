import { Router } from "express";

import authRoutes from "../routes/auth.js";
import redisRoutes from "../routes/redis.js";
import userRoute from "./user.js";

const router = Router();

router.use("/redis", redisRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoute);

export default router;
