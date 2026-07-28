import { useAddVideoReaction } from "@/mutations/video"
import { useMyReaction, useVideoReaction } from "@/queries/video"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import debounce from "lodash/debounce"
import { useMemo } from "react"

const Reaction = ({ id }: { id: number }) => {
  const addVideoReaction = useAddVideoReaction()
  const { data: video } = useVideoReaction(id)
  const { data: reaction, isError } = useMyReaction(id)
  const debouncedReaction = useMemo(
    () =>
      debounce((type: string) => {
        addVideoReaction.mutate({ id, type })
      }, 500),
    [id]
  )

  const handleReaction = (type: string) => {
    if (isError) return

    debouncedReaction(reaction?.type === type ? "REMOVE" : type)
  }
  return (
    <div className="flex">
      <button
        className={
          "flex items-center gap-2 rounded-l-full bg-accent px-3 py-2 font-medium hover:bg-primary/10"
        }
        onClick={() => handleReaction("LIKE")}
      >
        <ThumbsUp
          className={reaction?.type === "LIKE" ? "fill-current" : "fill-none"}
          size={20}
        />
        <span>{video?.likes}</span>
      </button>
      <span className="border"></span>
      <button
        className={
          "flex items-center gap-2 rounded-r-full bg-accent px-3 py-2 font-medium hover:bg-primary/10"
        }
        onClick={() => handleReaction("DISLIKE")}
      >
        <ThumbsDown
          className={
            reaction?.type === "DISLIKE" ? "fill-current" : "fill-none"
          }
          size={20}
        />
        <span>{video?.dislikes}</span>
      </button>
    </div>
  )
}

export default Reaction
