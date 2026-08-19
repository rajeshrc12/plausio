import AppNavbar from "@/routes/app/components/navbar"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppNavbar />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          <p className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Error 404
          </p>

          <h1 className="mt-4 text-7xl font-bold tracking-tight sm:text-8xl">
            404
          </h1>

          <h2 className="mt-6 text-2xl font-semibold">Page not found</h2>

          <p className="mt-3 text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <a
            href="/"
            className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to home
          </a>
        </div>
      </main>
    </div>
  )
}

export default NotFound
