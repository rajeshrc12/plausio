import { ThumbsDown, ThumbsUp } from "lucide-react"

const Reaction = ({ likes, dislikes }: { likes: number; dislikes: number }) => {
  return (
    <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
      <button className={"flex items-center gap-2 font-medium"}>
        <ThumbsUp size={20} />
        <span>{likes}</span>
      </button>
      <span className="border"></span>
      <button className={"flex items-center gap-2 font-medium"}>
        <ThumbsDown size={20} />
        <span>{dislikes}</span>
      </button>
    </div>
  )
}

export default Reaction
