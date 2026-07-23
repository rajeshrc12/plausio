import { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { uploadFiles } from "../services/video.js";
import { env } from "../config/env.js";
import { completeMultipartUpload } from "../services/s3.js";
import { addS3UrlToSQS } from "../services/sqs.js";
import { VideoStatus } from "../../generated/prisma/enums.js";
import { Id } from "../types/controller.js";
import { Channel } from "../../generated/prisma/client.js";

export const initUpload = async (req: Request, res: Response) => {
  const { video: v, thumbnail: t } = req.body;
  const channel = req.channel as Channel;

  const video = await prisma.video.create({
    data: {
      title: v.title,
      description: v.description,
      visibility: v.visibility.toUpperCase(),
      duration: v.duration,
      size: v.size,
      name: v.name,
      type: v.type,
      channelId: channel.id,
    },
  });
  const thumbnail = await prisma.thumbnail.create({
    data: {
      type: t.type,
      size: t.size,
      name: t.name,
      videoId: video.id,
    },
  });

  const {
    videoUrls,
    thumbnailUrl,
    videoKey,
    thumbnailKey,
    videoUploadId,
    thumbnailUploadId,
  } = await uploadFiles({
    videoId: video.id,
    videoType: v.type,
    videoSize: v.size,
    thumbnailType: thumbnail.type,
  });

  res.status(201).json({
    video,
    thumbnail,
    videoKey,
    thumbnailKey,
    videoUploadId,
    thumbnailUploadId,
    videoUrls,
    thumbnailUrl,
    videoPartSize: env.AWS_S3_PART_SIZE_IN_MB,
  });
};

export const completeUpload = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    videoId,
    videoKey,
    videoUploadId,
    videoParts,
    thumbnailKey,
    thumbnailUploadId,
    thumbnailParts,
  } = req.body;

  await completeMultipartUpload({
    key: videoKey,
    parts: videoParts,
    uploadId: videoUploadId,
  });
  await completeMultipartUpload({
    key: thumbnailKey,
    parts: thumbnailParts,
    uploadId: thumbnailUploadId,
  });
  const video = await prisma.video.update({
    where: {
      id: videoId,
    },
    data: {
      status: VideoStatus.PROCESSING,
    },
  });
  addS3UrlToSQS({ id: video.id, key: videoKey, type: video.type });
  res.status(201).json({
    video,
    message: "Upload completed successfully",
  });
};

export const getRecommondVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany({
    where: { status: VideoStatus.UPLOADED },
  });
  res.status(200).json(videos);
};

export const getPublicVideos = async (_req: Request, res: Response) => {
  const videos = await prisma.video.findMany({
    include: { channel: true },
    where: { status: VideoStatus.UPLOADED },
  });
  res.status(200).json(videos);
};
export const getPublicVideo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params;

  const video = await prisma.video.findFirst({
    where: { id: Number(id) },
    include: {
      channel: true,
      comments: {
        include: {
          channel: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  res.status(200).json(video);
};
export const updateView = async (req: Request<Id>, res: Response) => {
  const { id } = req.body;

  const video = await prisma.video.update({
    data: {
      views: {
        increment: 1,
      },
    },
    where: { id: Number(id) },
  });
  res.status(201).json(video);
};
export const getMyVideos = async (req: Request, res: Response) => {
  const channel = req.channel as Channel;
  const videos = await prisma.video.findMany({
    where: { channelId: channel.id },
    include: {
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json(videos);
};

export const getVideo = async (req: Request<Id>, res: Response) => {
  const { id } = req.params;
  const video = await prisma.video.findFirst({ where: { id: Number(id) } });
  res.status(200).json(video);
};

export const addReaction = async (req: Request<Id>, res: Response) => {
  const { id, type } = req.body;
  const channel = req.channel as Channel;
  let reaction;
  if (type === "LIKE" || type === "DISLIKE") {
    reaction = await prisma.reaction.upsert({
      where: {
        videoId_channelId: {
          videoId: id,
          channelId: channel.id,
        },
      },
      update: {
        type: type,
      },
      create: {
        videoId: id,
        channelId: channel.id,
        type: type,
      },
    });
  }
  if (type === "REMOVE") {
    reaction = await prisma.reaction.delete({
      where: {
        videoId_channelId: {
          videoId: id,
          channelId: channel.id,
        },
      },
    });
  }
  res.status(201).json(reaction);
};

export const getReaction = async (req: Request<Id>, res: Response) => {
  const { id } = req.params;
  const reactions = await prisma.reaction.groupBy({
    by: ["type"],
    where: {
      videoId: Number(id),
    },
    _count: {
      _all: true,
    },
  });
  const reaction = {
    likes: 0,
    dislikes: 0,
  };
  for (const r of reactions) {
    if (r["type"] === "LIKE") reaction["likes"] += r["_count"]["_all"];
    if (r["type"] === "DISLIKE") reaction["dislikes"] += r["_count"]["_all"];
  }
  res.status(200).json(reaction);
};

export const getMyReaction = async (req: Request<Id>, res: Response) => {
  const { id } = req.params;
  const channel = req.channel as Channel;
  const reaction = await prisma.reaction.findFirst({
    where: {
      videoId: Number(id),
      channelId: channel.id,
    },
  });
  res.status(200).json(reaction);
};

export const addComment = async (req: Request, res: Response) => {
  const { videoId, content } = req.body;
  const channel = req.channel as Channel;
  const comment = await prisma.comment.create({
    data: {
      content,
      videoId,
      channelId: channel.id,
    },
  });
  res.status(200).json(comment);
};
