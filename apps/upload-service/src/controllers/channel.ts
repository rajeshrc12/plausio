import { prisma } from "@workspace/db"
import { Request, Response } from "express"
type ChannelParams = {
  handle: string
}
export const getChannel = async (
  req: Request<ChannelParams>,
  res: Response
) => {
  try {
    const { handle } = req.params

    const channels = await prisma.channel.findMany({
      where: { handle },
    })
    res.status(200).json(channels)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
