import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import HeroSlide from "@/routes/app/components/hero-slide"
import { useMovies } from "@/queries/public"

const HomeSlider = () => {
  const { data } = useMovies()

  return (
    <Swiper
      className="h-full w-full"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {data?.map((movie) => (
        <SwiperSlide key={movie.id}>
          <HeroSlide movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSlider
