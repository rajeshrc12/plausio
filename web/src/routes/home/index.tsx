import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-3xl py-24 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Enterprise Knowledge Platform
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Search your enterprise knowledge.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Connect your organization's data, ask questions in natural language,
            and get reliable answers grounded in your internal knowledge.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/app">
              <Button size="lg" className="px-6">
                Start a conversation
              </Button>
            </Link>

            <Link to="app/connector">
              <Button size="lg" variant="outline" className="px-6">
                Connect your data
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 divide-y rounded-xl border bg-muted/20 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-5">
              <p className="text-sm font-medium text-foreground">
                One knowledge layer
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Bring your enterprise sources together in one place.
              </p>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium text-foreground">
                Context-aware answers
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Retrieve relevant information before generating an answer.
              </p>
            </div>

            <div className="p-5">
              <p className="text-sm font-medium text-foreground">
                Built for teams
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Keep organizational knowledge accessible and searchable.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
