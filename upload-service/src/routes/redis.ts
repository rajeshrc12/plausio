import { Router } from "express";
import { getAllCpuContainers, updateStatus } from "../controllers/redis.js";

const router = Router();

router.patch("/status", updateStatus);
router.get("/", getAllCpuContainers);

export default router;
