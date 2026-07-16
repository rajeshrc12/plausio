import { getChannel, getMyChannel } from "@/controllers/channel"
import { authenticateToken } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/public/:handle", getChannel)

router.use(authenticateToken)
router.get("/me", getMyChannel)

export default router
