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
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.length ? (
              data?.map((movie, i) => (
                <TableRow key={movie.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{movie.title}</TableCell>
                  <TableCell>{movie.description}</TableCell>
                  <TableCell>{formatVideoDuration(movie.duration)}</TableCell>
                  <TableCell>{formatFileSize(movie.fileSize)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No movies available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MovieList
