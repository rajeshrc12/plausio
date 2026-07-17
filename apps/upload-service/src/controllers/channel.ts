import { AppError } from "@/utils/errorHandler"
import { Channel, prisma } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request, res: Response) => {
  const { handle } = req.params
  if (!handle) throw new AppError("Channel handle is required", 500, "fail")

  const channel = await prisma.channel.findFirst({
    where: { handle: String(handle.slice(1)) },
    include: { videos: true },
  })
  res.status(200).json(channel)
}
export const getMyChannel = async (req: Request, res: Response) => {
  const channel = req.channel as Channel

  const channels = await prisma.channel.findFirst({
    where: { id: channel.id },
  })
  res.status(200).json(channels)
}
