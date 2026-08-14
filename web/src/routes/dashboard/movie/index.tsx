import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const movies = [
  {
    id: 1,
    title: "The Avenger",
    description:
      "A fearless hero fights to protect the city from a powerful enemy.",
    duration: "2h 30m",
  },
  {
    id: 2,
    title: "Lost in Space",
    description:
      "A stranded astronaut searches for a way home across an unknown galaxy.",
    duration: "2h 10m",
  },
  {
    id: 3,
    title: "Shadow of the Past",
    description:
      "A detective uncovers a dark secret that changes everything he knows.",
    duration: "1h 55m",
  },
  {
    id: 4,
    title: "Beyond the Horizon",
    description:
      "A young explorer embarks on an unforgettable journey to a mysterious island.",
    duration: "2h 5m",
  },
  {
    id: 5,
    title: "The Last Kingdom",
    description:
      "A brave warrior rises to defend his kingdom against an invading army.",
    duration: "2h 40m",
  },
]

const DashboardMovie = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-bold">Movies</div>
        <Button>Add movie</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.map((movie, i) => (
              <TableRow key={movie.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.description}</TableCell>
                <TableCell>{movie.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DashboardMovie
