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
import { X } from "lucide-react"
import MovieCard from "@/routes/app/components/movie-card"
import { useMovies } from "@/queries/public"

const category = [
  { name: "Crime" },
  { name: "Comedy" },
  { name: "Romance" },
  { name: "Drama" },
  { name: "Mystery" },
]
const Browse = () => {
  const { data } = useMovies()
  if (!data) return "Loading..."

  const [filter] = useState([{ name: "Crime" }, { name: "Comedy" }])
  return (
    <div className="flex flex-col gap-2 px-14">
      <div className="mt-16 flex gap-2">
        {category.map((c) => (
          <Button variant={"secondary"} className={"rounded-full p-4"}>
            {c.name}
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
        <div className="text-sm">
          {filter.map((c) => (
            <Button variant={"ghost"} className={"rounded-full p-4"}>
              {c.name}
              <X />
            </Button>
          ))}
        </div>
      </div>
      <div className="text-xl">Browse All Movies</div>
      <div className="w-[60%] text-xs">
        Browse All Movies Watch the latest movies 2026 and Hollywod/Bollywood
        movies online. Get free streaming of English movies, Hindi movies, HD
        movies and more on Plausio
      </div>
      <div className="grid grid-cols-4 gap-5">
        {data.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Browse
