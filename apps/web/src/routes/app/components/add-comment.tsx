import videoApi from "@/api/video"
import { getProfileUrl } from "@/utils/video"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { useState } from "react"

const AddComment = ({
  videoId,
  channelId,
  refetch,
}: {
  videoId: number
  channelId: number
  refetch: () => void
}) => {
  const [btn, setBtn] = useState(false)
  const [content, setContent] = useState("")
  const handleComment = async () => {
    const comment = await videoApi.post("/video/comment", { content, videoId })
    setBtn(false)
    setContent("")
    refetch()
    console.log(comment)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Avatar className={"h-6 w-6"}>
          <AvatarImage src={getProfileUrl(channelId)} />
          <AvatarFallback>name</AvatarFallback>
        </Avatar>
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
    </div>
  )
}

export default AddComment
