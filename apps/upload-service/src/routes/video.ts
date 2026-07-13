import {
  initUpload,
  getVideos,
  getRecommendedVideos,
  getVideo,
} from "@/controllers/video"
import { authenticateToken, getUserDataFromCookie } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/recommend", getRecommendedVideos)
router.get("/:id", getUserDataFromCookie, getVideo)

router.use(authenticateToken)

router.post("/init", initUpload)
router.get("/", getVideos)

export default router
