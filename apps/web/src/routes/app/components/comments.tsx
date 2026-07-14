import type { CommentWithChannel } from "@/types/video"
import { getVideoCreationDate } from "@/utils/date"
import { getProfileUrl } from "@/utils/video"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

const Comments = ({ comments }: { comments: CommentWithChannel[] }) => {
  return (
    <div className="flex flex-col gap-4 pt-2">
      {comments?.map(({ id, channel, content, createdAt }) => (
        <div className="flex gap-5" key={id}>
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={getProfileUrl(channel?.id)} />
            <AvatarFallback>{channel.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div> @{channel.handle}</div>
              <div className="text-xs font-thin text-muted-foreground">
                {getVideoCreationDate(createdAt)}
              </div>
            </div>
            <div className="text-sm">{content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
