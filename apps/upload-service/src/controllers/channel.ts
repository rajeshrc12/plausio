import { prisma } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request, res: Response) => {
  try {
    const channels = await prisma.channel.findMany()
    res.status(200).json(channels)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Channel not found",
    })
  }
}
