import {
  initUpload,
  getVideos,
  getRecommendedVideos,
  getVideo,
} from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.post("/init", initUpload)
router.get("/", getVideos)
router.get("/recommend", getRecommendedVideos)
router.get("/:id", getVideo)

export default router
