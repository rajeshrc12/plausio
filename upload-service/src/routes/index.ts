import { Router } from "express";

import authRoutes from "../routes/auth.js";
import channelRoutes from "../routes/channel.js";
import videoRoutes from "../routes/video.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/channel", channelRoutes);
router.use("/video", videoRoutes);

export default router;
