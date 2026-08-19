import { A11y, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import MovieCard from "@/routes/app/components/movie-card"
import type { Movie } from "@/types/schema"

const MenuSlider = ({
  movies,
  isUserLogged = false,
  setDialog,
}: {
  movies: Movie[]
  isUserLogged: boolean
  setDialog: (value: boolean) => void
}) => {
  return (
    <Swiper
      className="h-full w-full bg-background"
      modules={[Navigation, A11y]}
      spaceBetween={10}
      navigation
      slidesPerView={4}
      slidesOffsetBefore={60}
      slidesOffsetAfter={60}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <MovieCard
            setDialog={setDialog}
            isUserLogged={isUserLogged}
            movie={movie}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MenuSlider
