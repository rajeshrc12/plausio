import { useAddComment } from "@/mutations/video"
import { useMyChannel } from "@/queries/channel"
import CommentCard from "@/routes/app/components/comment-card"
import type { CommentWithChannel } from "@/types/video"
import { getProfileUrl } from "@/utils/video"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { useState } from "react"

const AddComment = ({
  id,
  comments,
}: {
  id: number
  comments: CommentWithChannel[]
}) => {
  const { data: myChannel } = useMyChannel()
  const addComment = useAddComment()
  const [btn, setBtn] = useState(false)
  const [content, setContent] = useState("")
  const handleComment = () => {
    addComment.mutateAsync({ id, content })
    setContent("")
    setBtn(false)
  }
  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="text-xl font-bold">{comments?.length} Comments</div>
      <div className="flex gap-2">
        {myChannel?.id && (
          <Avatar className={"h-6 w-6"}>
            <AvatarImage src={getProfileUrl(myChannel.id)} />
            <AvatarFallback>name</AvatarFallback>
          </Avatar>
        )}

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setBtn(true)}
          type="text"
          className="w-full border-b outline-none focus:border-b-2 focus:border-primary focus:p-1"
          placeholder="Add a comment"
        />
      </div>
      {btn && (
        <div className="flex justify-end">
          <Button variant={"ghost"} onClick={() => setBtn(false)}>
            Cancel
          </Button>
          <Button onClick={handleComment}>Comment</Button>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            channel={comment.channel}
          />
        ))}
      </div>
    </div>
  )
}

export default AddComment
