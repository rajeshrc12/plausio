import type { Movie } from "@/types/schema"
import { getThumbnailUrl } from "@/utils/movie"
import { Info, Play } from "lucide-react"
import { Link } from "react-router"

const HeroSlide = ({ movie }: { movie: Movie }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <img
        src={getThumbnailUrl(movie.id)}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-end pb-14 sm:items-center sm:pb-0">
        <div className="w-full max-w-2xl px-5 sm:px-8 md:px-14 lg:px-20">
          {/* Featured */}
          <div className="mb-2 flex items-center gap-2 sm:mb-4 sm:gap-3">
            <span className="rounded-md bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground uppercase sm:px-3 sm:text-xs">
              Featured
            </span>

            <span className="text-xs text-muted-foreground sm:text-sm">
              #1 in Movies Today
            </span>
          </div>

          {/* Title */}
          <h1 className="line-clamp-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          {/* Metadata */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs sm:mt-4 sm:gap-3 sm:text-sm">
            <span>2026</span>

            {movie.duration && (
              <>
                <span aria-hidden="true">•</span>
                <span>{movie.duration}</span>
              </>
            )}

            <span aria-hidden="true">•</span>
            <span>Sci-Fi</span>

            <span className="rounded border border-border bg-background/50 px-1.5 py-0.5 text-foreground backdrop-blur-sm sm:px-2">
              5
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 max-w-xl text-xs leading-5 sm:mt-4 sm:line-clamp-3 sm:text-sm sm:leading-6 md:text-base">
            {movie.description}
          </p>

          {/* Actions */}
          <div className="mt-4 flex items-center gap-2 sm:mt-6 sm:gap-3">
            <Link to={`/play/${movie.id}`}>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-6 sm:py-3"
              >
                <Play className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
                Play
              </button>
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-4 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground sm:px-6 sm:py-3"
            >
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlide
