import type { Video, Channel, Comment } from "@workspace/db"
import { Prisma } from "@workspace/db"

export interface FileData {
  title: string
  description: string
  visibility: string
}

export type AddVideoDto = Omit<Prisma.VideoCreateInput, "channel">
