import { useChats } from "@/queries/chat"
import { cn } from "cn"
import { Link, useLocation } from "react-router"

const ChatHistory = () => {
  const { data } = useChats()
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-0 flex-1 flex-col px-3">
      <div className="mb-2 flex items-center justify-between px-2">
        <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
          Recent chats
        </span>

        {data?.length ? (
          <span className="text-[10px] text-muted-foreground">
            {data.length}
          </span>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-0.5">
          {data?.length ? (
            data.map((chat) => {
              const chatPath = `chat/${chat.id}`
              const isActive = pathname.includes(chatPath)

              return (
                <Link
                  key={chat.id}
                  to={chatPath}
                  className={cn(
                    "group flex h-9 items-center rounded-lg px-3 text-sm transition-colors",
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  )}
                >
                  <span className="truncate">{chat.title || "New chat"}</span>
                </Link>
              )
            })
          ) : (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-muted-foreground">No recent chats</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHistory
