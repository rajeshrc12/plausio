import { Router } from "express"
import { getChannel } from "@/controllers/channel"

const router = Router()

router.get("/", getChannel)

export default router
