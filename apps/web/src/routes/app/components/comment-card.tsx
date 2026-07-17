import { getVideoCreationDate } from "@/utils/date"
import { getProfileUrl } from "@/utils/video"
import type { Channel, Comment } from "@workspace/db"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"

const CommentCard = ({
  comment,
  channel,
}: {
  comment: Comment
  channel: Channel
}) => {
  return (
    <div className="flex gap-5">
      <Avatar className={"h-10 w-10"}>
        <AvatarImage src={getProfileUrl(channel?.id)} />
        <AvatarFallback>{channel?.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 text-sm font-medium">
          <div> @{channel?.handle}</div>
          <div className="text-xs font-thin text-muted-foreground">
            {getVideoCreationDate(comment?.createdAt)}
          </div>
        </div>
        <div className="text-sm">{comment?.content}</div>
      </div>
    </div>
  )
}

export default CommentCard
