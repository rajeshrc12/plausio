import { getChannel } from "@/controllers/channel"
import { Router } from "express"

const router = Router()

router.get("/:handle", getChannel)

export default router
