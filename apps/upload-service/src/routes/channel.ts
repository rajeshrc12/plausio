import {
  getChannel,
  getMyChannel,
  getSubscriptionStatus,
  subscribeToChannel,
  unsubscribeChannel,
} from "@/controllers/channel"
import { authenticateToken } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/public/:handle", getChannel)

router.use(authenticateToken)
router.get("/me", getMyChannel)
router.post("/subscription", subscribeToChannel)
router.delete("/subscription/:id", unsubscribeChannel)
router.get("/subscription/:id", getSubscriptionStatus)

export default router
