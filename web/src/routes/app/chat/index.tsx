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
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Intro */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            What can I help you find?
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Ask a question, search for something, or start a conversation.
          </p>
        </div>

        {/* Composer */}
        <div className="rounded-3xl border bg-background p-3 shadow-sm transition-all duration-200 focus-within:border-ring focus-within:shadow-md">
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
            placeholder="Ask anything..."
            className="w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          />

          <div className="mt-2 flex items-center justify-between px-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Add"
              disabled={createChat.isPending}
              className="size-9 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Plus className="size-5" />
            </Button>

            <Button
              disabled={!message.trim() || createChat.isPending}
              onClick={handleChat}
              type="button"
              size="icon"
              aria-label="Send"
              className="size-9 rounded-xl"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Hint */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Press{" "}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Enter
          </kbd>{" "}
          to send
        </p>
      </div>
    </div>
  )
}

export default Chat
