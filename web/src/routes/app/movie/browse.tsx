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
import useLogin from "@/hooks/use-login"
import { useMe } from "@/queries/user"

const Browse = () => {
  const [filters, setFilters] = useState<string[]>([])
  const { data } = useMovies(filters)
  const { setDialog } = useLogin()
  const { isError } = useMe()
  const handleFilters = (g: string) => {
    setFilters((prev) =>
      prev.includes(g) ? prev.filter((f) => f !== g) : [...prev, g]
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-8 sm:px-6 md:px-10 lg:px-14">
      <div className="mt-20 flex flex-wrap gap-2 sm:mt-16">
        {genre.map((g) => (
          <Button
            onClick={() => handleFilters(g)}
            key={g}
            variant={filters.includes(g) ? "default" : "secondary"}
            className="rounded-full px-3 py-2 text-xs sm:px-4 sm:py-2.5 sm:text-sm"
          >
            {g}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between overflow-x-auto">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap whitespace-nowrap">
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
      <div className="text-lg font-semibold sm:text-xl">Browse All Movies</div>
      <div className="max-w-2xl text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
        Browse All Movies Watch the latest movies 2026 and Hollywod/Bollywood
        movies online. Get free streaming of English movies, Hindi movies, HD
        movies and more on Plausio
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((movie) => (
          <MovieCard
            isUserLogged={!isError}
            setDialog={setDialog}
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  )
}

export default Browse
