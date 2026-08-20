import type { Movie } from "@/types/schema"
import { getImageUrl } from "@/utils/movie"
import { Info, Play } from "lucide-react"
import { Link } from "react-router"

const MovieCard = ({
  movie,
  isUserLogged = false,
  setDialog,
}: {
  movie: Movie
  isUserLogged: boolean
  setDialog: (value: boolean) => void
}) => {
  return (
    <div className="group relative aspect-2/3 w-full overflow-hidden rounded-md">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out sm:group-hover:scale-110"
        style={{
          backgroundImage: `url("${getImageUrl(movie.id, "poster")}")`,
        }}
      />
      <div className="absolute bottom-5 left-0 px-2">
        <img src={getImageUrl(movie.id, "title")} alt="" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/35 opacity-100 backdrop-blur-[1px] transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
        <div className="flex items-center gap-2 sm:gap-3">
          {isUserLogged ? (
            <Link to={`/play/${movie.id}`}>
              <button
                aria-label={`Play ${movie.title}`}
                className="flex size-9 items-center justify-center rounded-full bg-primary text-background shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95 sm:size-11"
              >
                <Play className="ml-0.5 size-4 fill-current sm:size-5" />
              </button>
            </Link>
          ) : (
            <button
              onClick={() => setDialog(true)}
              aria-label={`Play ${movie.title}`}
              className="flex size-9 items-center justify-center rounded-full bg-primary text-background shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95 sm:size-11"
            >
              <Play className="ml-0.5 size-4 fill-current sm:size-5" />
            </button>
          )}

          <Link to={`/movie/${movie.id}`}>
            <button
              aria-label={`More information about ${movie.title}`}
              className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-background/40 text-primary shadow-xl backdrop-blur-md transition-transform duration-200 hover:scale-110 active:scale-95 sm:size-11"
            >
              <Info className="size-4 sm:size-5" />
            </button>
          </Link>
        </div>

        <h3
          className="absolute right-2 bottom-2 left-2 truncate text-center text-xs font-semibold text-primary drop-shadow-lg sm:right-3 sm:bottom-3 sm:text-sm"
          title={movie.title}
        >
          {movie.title}
        </h3>
      </div>
    </div>
  )
}

export default MovieCard
