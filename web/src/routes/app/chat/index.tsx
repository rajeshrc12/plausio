import { ArrowRight, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCreateChat } from "@/mutation/chat"
import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useConnectors } from "@/queries/connector"
import type { Connector } from "@/types/schema"

const Chat = () => {
  const navigate = useNavigate()
  const createChat = useCreateChat()
  const [message, setMessage] = useState("")
  const { data } = useConnectors()
  const [connectors, setConnectors] = useState<Connector[]>([])
  const [open, setOpen] = useState(false)
  const handleChat = async () => {
    if (connectors.length) {
      const chat = await createChat.mutateAsync({
        message,
        connector_ids: connectors.map((c) => c.id),
      })
      navigate(`chat/${chat.id}`)
    }
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
          {connectors.length > 0 && (
            <div className="mb-1 flex flex-wrap gap-2 px-2 pt-1">
              {connectors.map((con) => (
                <div
                  key={con.id}
                  className="group inline-flex items-center gap-1.5 rounded-lg border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span className="max-w-45 truncate">{con.name}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setConnectors(connectors.filter((c) => c.id !== con.id))
                    }
                    disabled={createChat.isPending}
                    aria-label={`Remove ${con.name}`}
                    className="flex size-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

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
            <div className="flex items-center gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Add connector"
                    disabled={createChat.isPending}
                    className="size-9 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <Plus className="size-5" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-56 p-1.5">
                  <div className="flex flex-col gap-0.5">
                    {data?.map((con) => {
                      const alreadyAdded = connectors.some(
                        (connector) => connector.id === con.id
                      )

                      return (
                        <Button
                          key={con.id}
                          disabled={alreadyAdded}
                          onClick={() => {
                            setConnectors((prev) => [...prev, con])
                            setOpen(false)
                          }}
                          variant="ghost"
                          className="h-9 justify-between rounded-lg px-3 text-sm font-normal"
                        >
                          <span className="truncate">{con.name}</span>

                          {alreadyAdded && (
                            <span className="text-xs text-muted-foreground">
                              Added
                            </span>
                          )}
                        </Button>
                      )
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              disabled={
                !message.trim() || createChat.isPending || !connectors.length
              }
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
