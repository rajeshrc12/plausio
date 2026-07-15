import { addVideo, getVideos } from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.get("/", getVideos)
router.post("/", addVideo)

export default router
