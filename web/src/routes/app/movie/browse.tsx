import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link } from "react-router"
import { useState } from "react"
import MovieCard from "@/routes/app/components/movie-card"
import { useMovies } from "@/queries/public"
import { genre } from "@/types/constant"

const Browse = () => {
  const [filters, setFilters] = useState<string[]>([])
  const { data } = useMovies(filters)

  const handleFilters = (g: string) => {
    setFilters((prev) =>
      prev.includes(g) ? prev.filter((f) => f !== g) : [...prev, g]
    )
  }

  return (
    <div className="flex flex-col gap-4 px-14">
      <div className="mt-16 flex flex-wrap gap-2">
        {genre.map((g) => (
          <Button
            onClick={() => handleFilters(g)}

            key={g}
            variant={filters.includes(g) ? "default" : "secondary"}
            className={"rounded-full p-4"}
          >
            {g}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Browse All Movies</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="text-xl">Browse All Movies</div>
      <div className="w-[60%] text-xs">
        Browse All Movies Watch the latest movies 2026 and Hollywod/Bollywood
        movies online. Get free streaming of English movies, Hindi movies, HD
        movies and more on Plausio
      </div>
      <div className="grid grid-cols-4 gap-5">
        {data?.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Browse
