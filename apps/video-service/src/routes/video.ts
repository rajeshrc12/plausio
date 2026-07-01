import { completeUpload, initUpload } from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.post("/init", initUpload)
router.post("/complete", completeUpload)

export default router
