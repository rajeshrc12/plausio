import { Router } from "express";
import {
  changeStatus,
  createMovieJob,
  getMovies,
  initUpload,
} from "../controllers/movie.js";
import { authenticateAdminToken } from "../utils/middleware.js";
const router = Router();

router.post("/", authenticateAdminToken, initUpload);
router.post("/job", authenticateAdminToken, createMovieJob);
router.get("/", authenticateAdminToken, getMovies);
router.post("/status", changeStatus);
export default router;
