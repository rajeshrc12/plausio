import { Router } from "express"

import authRoutes from "@/routes/auth"
import channelRoutes from "@/routes/channel"
import videoRoutes from "@/routes/video"

const router = Router()

router.use("/auth", authRoutes)
router.use("/channel", channelRoutes)
router.use("/video", videoRoutes)

export default router
