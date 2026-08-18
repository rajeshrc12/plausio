import { Router } from "express";
import { getMovie, getMovies } from "../controllers/public.js";

const router = Router();

router.get("/movie", getMovies);
router.get("/movie/:id", getMovie);

export default router;
