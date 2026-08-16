import { Request, Response } from "express";
import { FileStatus } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

export const getMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    where: { fileStatus: FileStatus.COMPLETED },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(movies);
};
