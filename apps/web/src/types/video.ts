import type { Video, Channel } from "@workspace/db"

export interface FileData {
  title: string
  description: string
  visibility: string
}
export type VideoWithChannel = Video & {
  channel: Channel
}
