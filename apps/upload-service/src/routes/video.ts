import {
  initUpload,
  getVideos,
  getRecommendedVideos,
  getVideo,
  addComment,
  updateReaction,
  completeUpload,
} from "@/controllers/video"
import { authenticateToken, getUserDataFromCookie } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/recommend", getRecommendedVideos)
router.get("/:id", getUserDataFromCookie, getVideo)

router.use(authenticateToken)

router.post("/init", initUpload)
router.post("/complete", completeUpload)
router.get("/", getVideos)
router.post("/comment", addComment)
router.post("/reaction", updateReaction)

export default router
