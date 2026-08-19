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
    <div className="relative flex h-screen w-full flex-col justify-end overflow-hidden px-14 pb-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${getThumbnailUrl(movies[index].id)}")`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-background/80 via-background/35 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-background via-background/80 to-transparent" />

      <div className="relative z-10 max-w-2xl">
        <div className="mb-3 text-5xl font-extrabold tracking-tight text-primary">
          {current.title}
        </div>

        <div className="mb-6 max-w-xl text-base leading-7 text-primary/75">
          {current.description}
        </div>

        <div className="flex gap-3">
          {isError ? (
            <button
              onClick={() => setDialog(true)}
              className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85"
            >
              <Play className="size-5 fill-current" />
              Play
            </button>
          ) : (
            <Link to={`/play/${current.id}`}>
              <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85">
                <Play className="size-5 fill-current" />
                Play
              </button>
            </Link>
          )}

          <Link to={`/movie/${current.id}`}>
            <button className="rounded-md bg-primary/15 px-6 py-3 font-semibold text-primary backdrop-blur-sm transition hover:bg-primary/25">
              More Info
            </button>
          </Link>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {movies.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-7 bg-primary"
                  : "w-2 bg-primary/40 hover:bg-primary/70"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2 pr-6">
          <button
            onClick={prevSlide}
            className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-background/30 text-primary backdrop-blur-md hover:bg-primary/15"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            onClick={nextSlide}
            className="flex size-10 items-center justify-center rounded-full border border-primary/20 bg-background/30 text-primary backdrop-blur-md hover:bg-primary/15"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeSlider
