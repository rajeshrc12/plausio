import { getVideoCreationDate } from "@/utils/date"
import type { Comment } from "@workspace/db"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="flex flex-col gap-4 pt-2">
      {comments?.map(({ id, channelId, content, createdAt }) => (
        <div className="flex gap-5" key={id}>
          <Avatar className={"h-10 w-10"}>
            <AvatarImage src={`https://i.pravatar.cc/150?img=${id}`} />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-sm font-medium">
              <div> @{channelId}</div>
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
