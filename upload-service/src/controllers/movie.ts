import { Request, Response } from "express";
import { Admin, FileStatus } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { createS3Url } from "../services/video.js";
import { getThumbnailKey, getVideoKey } from "../utils/s3.js";
import { addToQueue } from "../services/bullmq.js";

export const initUpload = async (req: Request, res: Response) => {
  const admin = req.admin as Admin;

  const {
    title,
    description,
    fileName,
    fileType,
    fileSize,
    duration,
    genre,
    director,
    starring,
    year,
    publisher,
  } = req.body;
  const movie = await prisma.movie.create({
    data: {
      title,
      description,
      fileName,
      fileType,
      fileSize,
      duration,
      adminId: admin.id,
      genre,
      director,
      starring,
      year,
      publisher,
    },
  });
  const movieUrl = await createS3Url({
    key: getVideoKey({ id: movie.id }),
    contentType: fileType,
    expireTimeInMinutes: 1,
  });
  const thumbnailUrl = await createS3Url({
    key: getThumbnailKey({ id: movie.id }),
    contentType: fileType,
    expireTimeInMinutes: 1,
  });
  res.status(200).json({ ...movie, movieUrl, thumbnailUrl });
};
export const createMovieJob = async (req: Request, res: Response) => {
  const { id, type } = req.body;
  const movies = await prisma.movie.update({
    where: { id },
    data: { fileStatus: FileStatus.PROCESSING },
  });
  addToQueue({ id, type });
  res.status(200).json(movies);
};
export const getMovies = async (req: Request, res: Response) => {
  const admin = req.admin as Admin;
  const movies = await prisma.movie.findMany({ where: { adminId: admin.id } });
  res.status(200).json(movies);
};

export const changeStatus = async (req: Request, res: Response) => {
  const { id, status } = req.body;

  const video = await prisma.movie.update({
    where: {
      id,
    },
    data: {
      fileStatus: status,
    },
  });
  res.status(200).json(video);
};
