import { Button } from "@/components/ui/button"
import { useCreateMessage } from "@/mutation/message"
import { useMessages } from "@/queries/message"
import { cn } from "cn"
import { ArrowRight } from "lucide-react"
import { useParams } from "react-router"
import { useEffect, useRef, useState } from "react"
import { useChatConnectors } from "@/queries/chat-connector"
import Message from "@/routes/app/components/message"

const ChatId = () => {
  const { id } = useParams()
  const { data } = useMessages(Number(id))
  const createMessage = useCreateMessage(Number(id))
  const { data: chatConnectors } = useChatConnectors(Number(id))
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const handleMessage = async () => {
    const content = message.trim()

    if (!content || createMessage.isPending) return

    setMessage("")

    await createMessage.mutateAsync({
      content,
      role: "human",
      type: "text",
      chat_id: Number(id),
    })
  }

  // Always keep the latest message visible
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }, [data, createMessage.isPending])

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center border-b px-6">
        <div>
          <h1 className="text-sm font-semibold text-foreground">Chat Title</h1>
          <p className="text-xs text-muted-foreground">AI Assistant</p>
        </div>
      </header>

      {/* Messages */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
          {data?.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.role === "ai" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] text-sm leading-6 sm:max-w-[75%]",
                  message.role === "ai"
                    ? "rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-foreground"
                    : "rounded-2xl rounded-br-md bg-primary px-4 py-3 text-primary-foreground"
                )}
              >
                <Message>{message.content}</Message>
              </div>
            </div>
          ))}

          {/* Thinking indicator */}
          {createMessage.isPending && (
            <div className="flex w-full justify-start">
              <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-current" />
                </div>

                <span>Thinking...</span>
              </div>
            </div>
          )}

          {/* Scroll target */}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Composer */}
      <div className="shrink-0 px-4 pt-2 pb-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl border bg-background p-2 shadow-sm transition-shadow focus-within:shadow-md">
            <input
              disabled={createMessage.isPending}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleMessage()
                }
              }}
              type="text"
              placeholder="Tell me what you want to search..."
              className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="flex items-center justify-between px-1 pb-1">
              <div className="flex gap-2">
                {chatConnectors?.map((cc) => (
                  <div
                    key={cc.connector_id}
                    className="rounded-xl border px-2 py-1 text-sm"
                  >
                    {cc.connector.name}
                  </div>
                ))}
              </div>

              <Button
                type="button"
                size="icon"
                aria-label="Send"
                disabled={!message.trim() || createMessage.isPending}
                onClick={handleMessage}
                className="rounded-xl"
              >
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>

          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            AI can make mistakes. Check important information.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatId
