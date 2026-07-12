import { initUpload } from "@/controllers/video"
import { Router } from "express"

const router = Router()

router.post("/init", initUpload)

export default router
