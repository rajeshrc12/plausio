import { Router } from "express"

import authRoutes from "@/routes/auth"
import channelRoutes from "@/routes/channel"

const router = Router()

router.use("/auth", authRoutes)
router.use("/channel", channelRoutes)

export default router
