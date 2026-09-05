import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const Chat = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border bg-background p-3 shadow-sm transition-shadow focus-within:shadow-md">
        <input
          type="text"
          placeholder="Tell me what you want to search..."
          className="w-full bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />

        <div className="mt-2 flex items-center justify-between">
          <Button type="button" variant="ghost" size="icon" aria-label="Add">
            <Plus className="size-5" />
          </Button>

          <Button type="button" size="icon" aria-label="Search">
            <Search className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
