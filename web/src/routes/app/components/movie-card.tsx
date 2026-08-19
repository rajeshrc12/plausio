import type { Movie } from "@/types/schema"
import { getThumbnailUrl } from "@/utils/movie"
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
    <div className="group relative h-40 overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
        style={{
          backgroundImage: `url("${getThumbnailUrl(movie.id)}")`,
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/35 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2">
          {isUserLogged ? (
            <Link to={`/play/${movie.id}`}>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background shadow-xl transition-all duration-200 hover:scale-110 hover:bg-primary/90 active:scale-95">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </button>
            </Link>
          ) : (
            <button
              onClick={() => setDialog(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background shadow-xl transition-all duration-200 hover:scale-110 hover:bg-primary/90 active:scale-95"
            >
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </button>
          )}

          <Link to={`/movie/${movie.id}`}>
            <button className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-background/40 text-primary shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-primary/20 active:scale-95">
              <Info className="h-5 w-5" />
            </button>
          </Link>
        </div>

        <h3
          className="absolute right-3 bottom-3 left-3 truncate text-center text-sm font-semibold text-primary drop-shadow-lg"
          title={movie.title}
        >
          {movie.title}
        </h3>
      </div>
    </div>
  )
}

export default MovieCard
