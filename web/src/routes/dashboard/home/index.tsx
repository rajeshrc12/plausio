const DashboardHome = () => {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="text-sm font-medium">Total Movies</div>
        <div className="mt-1 text-2xl font-semibold">100</div>
      </div>

      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="text-sm font-medium">Total Users</div>
        <div className="mt-1 text-2xl font-semibold">100</div>
      </div>

      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="text-sm font-medium">Total Watch Time</div>
        <div className="mt-1 text-2xl font-semibold">100H</div>
      </div>
    </div>
  )
}

export default DashboardHome
