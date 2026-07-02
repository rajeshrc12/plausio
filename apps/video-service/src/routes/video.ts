import {
  completeUpload,
  getVideo,
  getVideos,
  initUpload,
} from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.post("/init", initUpload)
router.post("/complete", completeUpload)
router.get("/", getVideos)
router.get("/:id", getVideo)

export default router
