import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useConnector } from "@/queries/connector"
import { Link } from "react-router"

const Connector = () => {
  const { data } = useConnector()
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Connectors</div>
        <Link to={"create"}>
          <Button>Add connector</Button>
        </Link>
      </div>
      <div className="w-full overflow-hidden">
        <Table className="table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Sr</TableHead>
              <TableHead className="w-48">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-28">Type</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length ? (
              data?.map((connector, i) => (
                <TableRow key={connector.id}>
                  <TableCell>{i + 1}</TableCell>

                  <TableCell className="truncate">{connector.title}</TableCell>

                  <TableCell className="min-w-0">
                    <div className="truncate">{connector.description}</div>
                  </TableCell>

                  <TableCell>{connector.status}</TableCell>
                  <TableCell>{connector.type}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No connector available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Connector
