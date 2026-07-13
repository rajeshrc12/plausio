import { Router } from "express"
import {
  getChannel,
  getMyChannel,
  subscribeChannel,
  unsubscribeChannel,
} from "@/controllers/channel"
import { authenticateToken, getUserDataFromCookie } from "@/utils/middleware"

const router = Router()
router.get("/me", authenticateToken, getMyChannel)
router.post("/subscribe", authenticateToken, subscribeChannel)
router.post("/unsubscribe", authenticateToken, unsubscribeChannel)

router.get("/:name", getUserDataFromCookie, getChannel)

export default router
