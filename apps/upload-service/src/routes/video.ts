import {
  addComment,
  addReaction,
  completeUpload,
  getMyReaction,
  getMyVideos,
  getPublicVideo,
  getPublicVideos,
  getReaction,
  getRecommondVideos,
  initUpload,
} from "@/controllers/video"
import { authenticateToken } from "@/utils/middleware"
import { Router } from "express"

const router = Router()

router.get("/public", getPublicVideos)
router.get("/public/:id", getPublicVideo)
router.get("/public/reaction/:id", getReaction)

router.use(authenticateToken)

router.get("/recommond", getRecommondVideos)
router.get("/me", getMyVideos)
router.post("/init", initUpload)
router.post("/complete", completeUpload)
router.post("/reaction", addReaction)
router.get("/reaction/:id", getMyReaction)
router.post("/comment", addComment)

export default router
