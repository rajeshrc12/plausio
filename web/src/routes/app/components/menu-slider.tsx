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
      spaceBetween={8}
      navigation
      slidesOffsetBefore={20}
      slidesOffsetAfter={20}
      breakpoints={{
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesOffsetBefore: 24,
          slidesOffsetAfter: 24,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 12,
          slidesOffsetBefore: 32,
          slidesOffsetAfter: 32,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 12,
          slidesOffsetBefore: 40,
          slidesOffsetAfter: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 14,
          slidesOffsetBefore: 48,
          slidesOffsetAfter: 48,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 16,
          slidesOffsetBefore: 60,
          slidesOffsetAfter: 60,
        },
      }}
    >
      {movies?.map((movie) => (
        <SwiperSlide key={movie.id}>
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
