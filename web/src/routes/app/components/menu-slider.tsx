import { A11y, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"

const MenuSlider = () => {
  return (
    <Swiper
      className="h-full w-full"
      modules={[Navigation, A11y]}
      spaceBetween={10}
      navigation
      breakpoints={{
        0: {
          slidesPerView: 2.2,
          slidesOffsetBefore: 16,
          slidesOffsetAfter: 16,
        },
        640: {
          slidesPerView: 3,
          slidesOffsetBefore: 24,
          slidesOffsetAfter: 24,
        },
        768: {
          slidesPerView: 4,
          slidesOffsetBefore: 32,
          slidesOffsetAfter: 32,
        },
        1024: {
          slidesPerView: 5,
          slidesOffsetBefore: 48,
          slidesOffsetAfter: 48,
        },
        1280: {
          slidesPerView: 6,
          slidesOffsetBefore: 80,
          slidesOffsetAfter: 80,
        },
      }}
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
