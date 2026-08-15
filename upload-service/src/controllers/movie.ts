import { Request, Response } from "express";
import { User } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export const initUpload = async (req: Request, res: Response) => {
  const admin = req.admin as User;
  const { title, description, fileName, fileType, fileSize, duration } =
    req.body;
  const movie = await prisma.movie.create({
    data: {
      title,
      description,
      fileName,
      fileType,
      fileSize,
      duration,
      adminId: admin.id,
    },
  });
  res.status(200).json(movie);
};
export const getMovies = async (req: Request, res: Response) => {
  const admin = req.admin as User;
  const movies = await prisma.movie.findMany({ where: { adminId: admin.id } });
  res.status(200).json(movies);
};
