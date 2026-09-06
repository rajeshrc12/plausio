import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCreateChat } from "@/mutation/chat"
import { useState } from "react"
import { useNavigate } from "react-router"

const Chat = () => {
  const navigate = useNavigate()
  const createChat = useCreateChat()
  const [message, setMessage] = useState("")
  const handleChat = async () => {
    const chat = await createChat.mutateAsync({ message })
    navigate(`chat/${chat.id}`)
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border bg-background p-3 shadow-sm transition-shadow focus-within:shadow-md">
        <input
          disabled={createChat.isPending}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleChat()
            }
          }}
          type="text"
          placeholder="Tell me what you want to search..."
          className="w-full bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        <div className="mt-2 flex items-center justify-between">
          <Button type="button" variant="ghost" size="icon" aria-label="Add">
            <Plus className="size-5" />
          </Button>

          <Button
            disabled={createChat.isPending}
            onClick={handleChat}
            type="button"
            size="icon"
            aria-label="Search"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
