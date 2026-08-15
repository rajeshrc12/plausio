import { Router } from "express";
import { createMovieJob, getMovies, initUpload } from "../controllers/movie.js";
const router = Router();

router.post("/", initUpload);
router.post("/job", createMovieJob);
router.get("/", getMovies);

export default router;
