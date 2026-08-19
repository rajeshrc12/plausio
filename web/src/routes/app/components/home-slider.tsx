import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"
import { getThumbnailUrl } from "@/utils/movie"
import { Link } from "react-router"
import type { Movie } from "@/types/schema"
import { useMe } from "@/queries/user"
import useLogin from "@/hooks/use-login"

const HomeSlider = ({ movies }: { movies: Movie[] }) => {
  const { isError } = useMe()
  const { setDialog } = useLogin()
  const [index, setIndex] = useState(0)

  const current = movies[index]

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length)
  }

  return (
    <div className="relative flex h-screen w-full flex-col justify-end overflow-hidden px-5 pb-6 sm:px-8 sm:pb-10 md:px-10 md:pb-14 lg:px-14 lg:pb-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${getThumbnailUrl(movies[index].id)}")`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-background/80 via-background/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/80 to-transparent sm:h-56" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-2 text-3xl font-extrabold tracking-tight text-primary sm:mb-3 sm:text-4xl md:text-5xl">
          {current.title}
        </div>

        <div className="mb-4 max-w-xl text-sm leading-6 text-primary/75 sm:mb-6 sm:text-base sm:leading-7">
          {current.description}
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {isError ? (
            <button
              onClick={() => setDialog(true)}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-primary/85 sm:px-6 sm:py-3 sm:text-base"
            >
              <Play className="size-4 fill-current sm:size-5" />
              Play
            </button>
          ) : (
            <Link to={`/play/${current.id}`}>
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-primary/85 sm:px-6 sm:py-3 sm:text-base">
                <Play className="size-4 fill-current sm:size-5" />
                Play
              </button>
            </Link>
          )}

          <Link to={`/movie/${current.id}`}>
            <button className="rounded-md bg-primary/15 px-4 py-2.5 text-sm font-semibold text-primary backdrop-blur-sm transition hover:bg-primary/25 sm:px-6 sm:py-3 sm:text-base">
              More Info
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between sm:mt-8">
        <div className="flex max-w-[60%] items-center gap-1.5 overflow-hidden sm:gap-2">
          {movies.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 shrink-0 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-primary sm:w-7"
                  : "w-1.5 bg-primary/40 hover:bg-primary/70 sm:w-2"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 sm:pr-2 lg:pr-6">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex size-9 items-center justify-center rounded-full border border-primary/20 bg-background/30 text-primary backdrop-blur-md hover:bg-primary/15 sm:size-10"
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex size-9 items-center justify-center rounded-full border border-primary/20 bg-background/30 text-primary backdrop-blur-md hover:bg-primary/15 sm:size-10"
          >
            <ChevronRight className="size-4 sm:size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeSlider
