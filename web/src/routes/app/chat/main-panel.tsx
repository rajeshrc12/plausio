import { Button } from "@/components/ui/button"
import type { Message } from "@/types/schema"
import { cn } from "cn"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const MainPanel = () => {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    content: Math.random().toString(36).slice(2, 10),
    role: Math.random() > 0.5 ? "ai" : "user",
    type: "text",
  })) as Message[]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    })
  }, [])

  return (
    <div className="col-span-5 flex min-h-0 flex-col border-r">
      {/* Header */}
      <div className="shrink-0 border-b py-4">title</div>

      {/* Messages */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6">
          {data.map((message) => (
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
                {message.content}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="m-2 shrink-0 rounded-2xl border bg-background p-2 shadow-sm transition-shadow focus-within:shadow-md">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
            }
          }}
          type="text"
          placeholder="Tell me what you want to search..."
          className="w-full bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        <div className="flex items-center justify-end px-1 pb-1">
          <Button
            type="button"
            size="icon"
            aria-label="Send"
            className="rounded-xl"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MainPanel
