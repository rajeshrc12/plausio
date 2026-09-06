import LoginButton from "@/components/login"

const Navbar = () => {
  return (
    <header className="flex h-16 w-full items-center border-b bg-background">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            P
          </div>

          <span className="text-base font-semibold tracking-tight text-foreground">
            Plausio
          </span>
        </div>

        <LoginButton />
      </div>
    </header>
  )
}

export default Navbar
