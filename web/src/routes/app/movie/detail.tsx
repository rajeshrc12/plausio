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
  if (!movie) return "Loading..."
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

      <div className="absolute top-16 flex w-full flex-col gap-5 px-14 pb-20">
        <div className="flex h-screen flex-col">
          <Breadcrumb>
            <BreadcrumbList>
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
          <div className="mt-20 flex flex-col gap-5">
            <div className="text-4xl font-bold">{movie.title}</div>

            <div className="w-full max-w-2xl space-y-1 text-sm">
              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Genre</span>
                <span className="text-muted-foreground">
                  {movie.genre.join(",")}
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Director</span>
                <span className="text-muted-foreground">{movie.director}</span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Starring</span>
                <span className="text-muted-foreground">{movie.starring}</span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Publisher</span>
                <span className="text-muted-foreground">{movie.publisher}</span>
              </div>

              <p className="pt-4 leading-relaxed text-muted-foreground">
                {movie.description}
              </p>
            </div>
            <div className="flex gap-2">
              {isError ? (
                <button
                  onClick={() => setDialog(true)}
                  className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85"
                >
                  <Play className="size-5 fill-current" />
                  Play
                </button>
              ) : (
                <Link to={`/play/${id}`}>
                  <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85">
                    <Play className="size-5 fill-current" />
                    Play
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="text-2xl">Recommended</div>
        <div className="grid grid-cols-4 gap-5">
          {movies?.map((movie, i) => (
            <MovieCard
              isUserLogged={!isError}
              key={i}
              movie={movie}
              setDialog={setDialog}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Detail
