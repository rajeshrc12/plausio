import type { Video, Channel, Comment } from "@workspace/db"
import { Prisma } from "@workspace/db"

export type AddVideoDto = {
  file: Omit<Prisma.VideoCreateInput, "channel">
  thumbnail: Omit<Prisma.ThumbnailCreateInput, "video">
}
