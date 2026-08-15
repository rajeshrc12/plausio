import { Router } from "express";
import { getMovies, initUpload } from "../controllers/movie.ts";

const router = Router();

router.post("/", initUpload);
router.get("/", getMovies);

export default router;
