import {
  addVideo,
  getPublicVideos,
  getRecommondVideos,
  getVideo,
} from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.get("/recommond", getRecommondVideos)
router.get("/public", getPublicVideos)
router.get("/:id", getVideo)

router.post("/", addVideo)

export default router
