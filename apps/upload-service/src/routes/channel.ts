import { getChannel } from "@/controllers/channel"
import { Router } from "express"

const router = Router()

router.get("/", getChannel)

export default router
