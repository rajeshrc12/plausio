import { Router } from "express"
import { getChannel, getMyChannel } from "@/controllers/channel"
import { authenticateToken } from "@/utils/middleware"

const router = Router()
router.get("/me", authenticateToken, getMyChannel)

router.get("/:name", getChannel)

export default router
