import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMovies } from "@/queries/movie"
import { formatFileSize, formatVideoDuration } from "@/utils/movie"
import { Link } from "react-router"

const MovieList = () => {
  const { data } = useMovies()

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Movies</div>
        <Link to={"create"}>
          <Button>Add movie</Button>
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
              <TableHead className="w-28">Duration</TableHead>
              <TableHead className="w-24">Size</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length ? (
              data.map((movie, i) => (
                <TableRow key={movie.id}>
                  <TableCell>{i + 1}</TableCell>

                  <TableCell className="truncate">{movie.title}</TableCell>

                  <TableCell className="min-w-0">
                    <div className="truncate">{movie.description}</div>
                  </TableCell>

                  <TableCell>{movie.fileStatus}</TableCell>
                  <TableCell>{formatVideoDuration(movie.duration)}</TableCell>

                  <TableCell>{formatFileSize(movie.fileSize)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No movies available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MovieList
