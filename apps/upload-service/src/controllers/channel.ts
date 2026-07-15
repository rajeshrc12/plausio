import { Channel, prisma } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request<Channel>, res: Response) => {
  try {
    const { handle } = req.params

    const channels = await prisma.channel.findFirst({
      where: { handle },
    })
    res.status(200).json(channels)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
