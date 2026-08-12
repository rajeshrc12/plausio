import { Navigation, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

const MenuSlider = () => {
  return (
    <Swiper
      className="h-full w-full"
      modules={[Navigation, A11y]}
      slidesPerView={6}
      spaceBetween={10}
      slidesOffsetBefore={80}
      slidesOffsetAfter={80}
      navigation
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <SwiperSlide key={index}>
          <img
            src={`https://picsum.photos/400/800?random=${index}`}
            alt={`Slide ${index + 1}`}
            className="h-full w-full rounded-md object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MenuSlider
