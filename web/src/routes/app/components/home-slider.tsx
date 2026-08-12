import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import HeroSlide from "@/routes/app/components/hero-slide"

const movies = [
  {
    id: 1,
    title: "The Last Horizon",
    backdrop: "https://picsum.photos/1200/600?random=1",
    year: 2026,
    duration: "2h 14m",
    genre: "Sci-Fi",
    rating: "16+",
    featured: true,
    trending: true,
    description:
      "After humanity's final colony loses contact with Earth, a lone pilot is sent across the galaxy to uncover what happened.",
  },
  {
    id: 2,
    title: "Shadow Protocol",
    backdrop: "https://picsum.photos/1200/600?random=2",
    year: 2025,
    duration: "1h 52m",
    genre: "Action",
    rating: "18+",
    featured: true,
    trending: false,
    description:
      "An undercover agent must expose a global conspiracy before the people closest to him become its next targets.",
  },
  {
    id: 3,
    title: "Beyond the Ocean",
    backdrop: "https://picsum.photos/1200/600?random=3",
    year: 2026,
    duration: "2h 02m",
    genre: "Adventure",
    rating: "13+",
    featured: true,
    trending: false,
    description:
      "A mysterious discovery beneath the ocean sends a team of explorers on the adventure of their lives.",
  },
]

const HomeSlider = () => {
  const handlePlay = (movie: any) => {
    console.log("Play:", movie)
  }

  const handleMoreInfo = (movie: any) => {
    console.log("More info:", movie)
  }
  return (
    <Swiper
      className="h-full w-full"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <HeroSlide
            movie={{
              ...movie,
              onPlay: () => handlePlay(movie),
              onMoreInfo: () => handleMoreInfo(movie),
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSlider
