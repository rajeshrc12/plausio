import { useAddVideoReaction } from "@/mutations/video"
import { useMyReaction, useVideoReaction } from "@/queries/video"
import { ThumbsDown, ThumbsUp } from "lucide-react"

const Reaction = ({ id }: { id: number }) => {
  const addVideoReaction = useAddVideoReaction()
  const { data: video } = useVideoReaction(id)
  const { data: reaction, isError } = useMyReaction(id)
  const handleReaction = (type: string) => {
    if (!isError)
      addVideoReaction.mutateAsync({
        type: reaction?.type === type ? "REMOVE" : type,
        id,
      })
  }
  return (
    <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
      <button className={"flex items-center gap-2 font-medium"}>
        <ThumbsUp
          className={reaction?.type === "LIKE" ? "fill-current" : "fill-none"}
          onClick={() => handleReaction("LIKE")}
          size={20}
        />
        <span>{video?.likes}</span>
      </button>
      <span className="border"></span>
      <button className={"flex items-center gap-2 font-medium"}>
        <ThumbsDown
          className={
            reaction?.type === "DISLIKE" ? "fill-current" : "fill-none"
          }
          onClick={() => handleReaction("DISLIKE")}
          size={20}
        />
        <span>{video?.dislikes}</span>
      </button>
    </div>
  )
}

export default Reaction
