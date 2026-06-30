import Profile from "@/components/profile"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Bell, Menu, Mic, Search } from "lucide-react"

const NavbarStudio = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-background px-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="size-5" />
        </Button>

        <h1 className="text-xl font-bold text-foreground">Plausio</h1>
      </div>

      {/* Center */}
      <div className="hidden flex-1 items-center justify-center px-8 md:flex">
        <div className="flex w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search"
            className="h-10 rounded-l-full rounded-r-none border-r-0 shadow-none focus-visible:ring-1"
          />

          <Button
            variant="outline"
            className="h-10 w-16 rounded-l-none rounded-r-full border-l bg-muted px-0 hover:bg-accent"
          >
            <Search className="size-5" />
          </Button>
        </div>

        <Button
          variant="secondary"
          size="icon"
          className="ml-4 h-10 w-10 rounded-full"
        >
          <Mic className="size-5" />
        </Button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
          <Bell className="size-5" />
        </Button>

        <Profile />
      </div>
    </header>
  )
}

export default NavbarStudio
