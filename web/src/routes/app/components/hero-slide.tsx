import { Info, Play } from "lucide-react"

const HeroSlide = ({ movie }: { movie: any }) => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background */}
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Theme-aware overlays */}
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-background/20" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-2xl px-8 md:px-14 lg:px-20">
          {/* Featured */}
          {movie.featured && (
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-md bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
                Featured
              </span>

              {movie.trending && (
                <span className="text-sm text-muted-foreground">
                  #1 in Movies Today
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {movie.year && <span>{movie.year}</span>}

            {movie.duration && (
              <>
                <span aria-hidden="true">•</span>
                <span>{movie.duration}</span>
              </>
            )}

            {movie.genre && (
              <>
                <span aria-hidden="true">•</span>
                <span>{movie.genre}</span>
              </>
            )}

            {movie.rating && (
              <span className="rounded border border-border bg-background/50 px-2 py-0.5 text-foreground backdrop-blur-sm">
                {movie.rating}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
            {movie.description}
          </p>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={movie.onPlay}
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Play className="h-5 w-5 fill-current" />
              Play
            </button>

            <button
              type="button"
              onClick={movie.onMoreInfo}
              className="flex items-center gap-2 rounded-md border border-border bg-background/60 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Info className="h-5 w-5" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlide
