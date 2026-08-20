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
      grabCursor
      breakpoints={{
        0: {
          slidesPerView: 2.3,
          slidesOffsetBefore: 12,
          slidesOffsetAfter: 12,
          spaceBetween: 8,
        },
        480: {
          slidesPerView: 2.8,
          slidesOffsetBefore: 16,
          slidesOffsetAfter: 16,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3.5,
          slidesOffsetBefore: 24,
          slidesOffsetAfter: 24,
          spaceBetween: 12,
        },
        768: {
          slidesPerView: 4.5,
          slidesOffsetBefore: 32,
          slidesOffsetAfter: 32,
          spaceBetween: 12,
        },
        1024: {
          slidesPerView: 5.5,
          slidesOffsetBefore: 40,
          slidesOffsetAfter: 40,
          spaceBetween: 14,
        },
        1280: {
          slidesPerView: 7,
          slidesOffsetBefore: 48,
          slidesOffsetAfter: 48,
          spaceBetween: 16,
        },
        1536: {
          slidesPerView: 8,
          slidesOffsetBefore: 60,
          slidesOffsetAfter: 60,
          spaceBetween: 16,
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
