import { useDashboard } from "@/queries/admin"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCreationDate } from "@/utils/date"

const DashboardHome = () => {
  const { data } = useDashboard()
  return (
    <div className="flex flex-col">
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="text-sm font-medium">Total Movies</div>
          <div className="mt-1 text-2xl font-semibold">{data?.movieCount}</div>
        </div>

        <div className="rounded-lg border bg-background p-4 shadow-sm">
          <div className="text-sm font-medium">Total Users</div>
          <div className="mt-1 text-2xl font-semibold">{data?.userCount}</div>
        </div>
      </div>
      <div className="w-full overflow-hidden px-10">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Sr</TableHead>
              <TableHead className="w-48">Name</TableHead>
              <TableHead>email</TableHead>
              <TableHead className="w-24">Joined</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.users?.length ? (
              data?.users?.map((user, i) => (
                <TableRow key={user.id}>
                  <TableCell>{i + 1}</TableCell>

                  <TableCell className="truncate">{user.name}</TableCell>

                  <TableCell className="min-w-0">
                    <div className="truncate">{user.email}</div>
                  </TableCell>

                  <TableCell>{getCreationDate(user.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No users available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashboardHome
