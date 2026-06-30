import { BarChart3, UploadIcon } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="min-h-[calc(100vh-56px)] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Channel dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back! Here's what's happening with your channel.
            </p>
          </div>
          <button className="rounded-full border p-2">
            <UploadIcon className="size-6" />
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Latest video */}
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="mb-5 font-semibold">Latest video performance</h2>

            <div className="mb-4 aspect-video rounded-xl bg-muted" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Views</span>
                <span className="font-medium">2.3K</span>
              </div>

              <div className="flex justify-between">
                <span>Watch time</span>
                <span className="font-medium">142 hrs</span>
              </div>

              <div className="flex justify-between">
                <span>Likes</span>
                <span className="font-medium">187</span>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="rounded-2xl border bg-background p-6">
            <div className="mb-5 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="font-semibold">Channel analytics</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-3xl font-bold">12.4K</p>
                <p className="text-sm text-muted-foreground">
                  Views (last 28 days)
                </p>
              </div>

              <div>
                <p className="text-3xl font-bold">+54</p>
                <p className="text-sm text-muted-foreground">Subscribers</p>
              </div>

              <div>
                <p className="text-3xl font-bold">486 hrs</p>
                <p className="text-sm text-muted-foreground">Watch time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
