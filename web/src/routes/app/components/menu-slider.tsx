import { A11y, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import MovieCard from "@/routes/app/components/movie-card"

const MenuSlider = () => {
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
      {Array.from({ length: 12 }).map((_, index) => (
        <SwiperSlide key={index}>
          <MovieCard />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MenuSlider
