import { Link, useParams } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Play } from "lucide-react"
import MovieCard from "@/routes/app/components/movie-card"
import { useMovie, useMovies } from "@/queries/public"
import { getThumbnailUrl } from "@/utils/movie"
import { useMe } from "@/queries/user"
import useLogin from "@/hooks/use-login"

const Detail = () => {
  const { isError } = useMe()
  const { data: movies } = useMovies()
  const { id } = useParams()
  const { data: movie } = useMovie(Number(id))
  const { setDialog } = useLogin()
  if (!movie) return null
  return (
    <div className="relative">
      <div className="absolute inset-0 h-screen w-full">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url("${getThumbnailUrl(movie.id)}")`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="absolute top-16 flex w-full flex-col px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="flex h-auto flex-col gap-6 md:h-screen">
          <Breadcrumb className="truncate pt-6">
            <BreadcrumbList className="flex-nowrap whitespace-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/movies" />}>
                  Movies
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{movie.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex max-w-3xl flex-col gap-5">
            <div className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {movie.title}
            </div>

            <div className="w-full max-w-2xl space-y-2 text-sm">
              <div className="grid grid-cols-[90px_1fr] gap-2 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
                <span className="font-semibold">Genre</span>
                <span className="text-muted-foreground">
                  {movie.genre.join(", ")}
                </span>
              </div>

              <div className="grid grid-cols-[90px_1fr] gap-2 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
                <span className="font-semibold">Director</span>
                <span className="text-muted-foreground">{movie.director}</span>
              </div>

              <div className="grid grid-cols-[90px_1fr] gap-2 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
                <span className="font-semibold">Starring</span>
                <span className="text-muted-foreground">{movie.starring}</span>
              </div>

              <div className="grid grid-cols-[90px_1fr] gap-2 sm:grid-cols-[120px_1fr] md:grid-cols-[140px_1fr]">
                <span className="font-semibold">Publisher</span>
                <span className="text-muted-foreground">{movie.publisher}</span>
              </div>

              <p className="pt-3 text-sm leading-6 text-muted-foreground sm:pt-4 sm:leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {isError ? (
                <button
                  onClick={() => setDialog(true)}
                  className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-primary/85 sm:px-6 sm:py-3 sm:text-base"
                >
                  <Play className="size-4 fill-current sm:size-5" />
                  Play
                </button>
              ) : (
                <Link to={`/play/${id}`}>
                  <button className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-background transition hover:bg-primary/85 sm:px-6 sm:py-3 sm:text-base">
                    <Play className="size-4 fill-current sm:size-5" />
                    Play
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Recommended */}
        <section className="mt-4 sm:mt-8">
          <div className="mb-4 text-xl font-semibold sm:text-2xl">
            Recommended
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {movies?.map((movie) => (
              <MovieCard
                isUserLogged={!isError}
                key={movie.id}
                movie={movie}
                setDialog={setDialog}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Detail
