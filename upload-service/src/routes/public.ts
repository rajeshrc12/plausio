import { Router } from "express";
import { getMovies } from "../controllers/public.js";

const router = Router();

router.get("/movie", getMovies);

export default router;
