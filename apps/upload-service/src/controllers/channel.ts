import { Channel, prisma } from "@workspace/db"
import { Request, Response } from "express"

export const getChannel = async (req: Request<Channel>, res: Response) => {
  const { handle } = req.params

  const channels = await prisma.channel.findFirst({
    where: { handle },
  })
  res.status(200).json(channels)
}
