import {
  completeUpload,
  getMyVideos,
  getPublicVideo,
  getPublicVideos,
  getRecommondVideos,
  getVideo,
  initUpload,
} from "@/controllers/video"
import { authenticateToken } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/public", getPublicVideos)
router.get("/public/:id", getPublicVideo)

router.use(authenticateToken)

router.get("/recommond", getRecommondVideos)
router.get("/me", getMyVideos)
router.post("/init", initUpload)
router.post("/complete", completeUpload)

export default router
