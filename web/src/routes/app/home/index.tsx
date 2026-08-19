import { useMovies } from "@/queries/public"
import HomeSlider from "@/routes/app/components/home-slider"
import MenuSlider from "@/routes/app/components/menu-slider"
import { LoaderCircle } from "lucide-react"

const AppHome = () => {
  const { data: movies, isLoading } = useMovies()
  if (!movies || isLoading)
    return (
      <div className="fixed top-0 left-0 flex h-screen w-full items-center justify-center">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    )
  return (
    <div className="flex flex-col gap-5 pb-20">
      {/* Hero */}
      <HomeSlider movies={movies} />
      <div className="flex flex-col gap-3">
        <div className="pl-16 text-2xl font-bold">Trending movies</div>
        <div className="h-50">
          <MenuSlider movies={movies} />
        </div>
      </div>
    </div>
  )
}

export default AppHome
