import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

// import { useMovies } from "@/queries/public"
const data = [
  {
    id: 1,
    title: "The Avengers",
    description:
      "Earth's mightiest heroes come together when Loki and his alien army threaten to conquer Earth. Iron Man, Captain America, Thor, Hulk, background Widow, and Hawkeye must put aside their differences and fight as one team to save humanity.",
    image: "https://wallpapercave.com/wp/wp2613062.jpg",
  },
  {
    id: 2,
    title: "Spider-Man",
    description:
      "After being bitten by a genetically altered spider, Peter Parker develops incredible superhuman abilities. As he learns to control his powers, he takes on the responsibility of protecting his city while facing dangerous enemies and dealing with his personal life.",
    image: "https://wallpapercave.com/wp/bQcC3Cz.jpg",
  },
  {
    id: 3,
    title: "Batman VS Superman",
    description:
      "Batman becomes convinced that Superman is too powerful and dangerous to be left unchecked. As the two heroes prepare to face each other, a powerful new threat emerges, forcing them to confront their differences and protect the world from destruction.",
    image: "https://wallpapercave.com/wp/wp2869152.jpg",
  },
  {
    id: 4,
    title: "Iron Man",
    description:
      "After being captured by terrorists, billionaire inventor Tony Stark builds a powerful armored suit to escape captivity. Returning home, he upgrades his technology and becomes Iron Man, using his intelligence and advanced armor to fight dangerous threats.",
    image: "https://wallpapercave.com/wp/wp16155054.jpg",
  },
  {
    id: 5,
    title: "Inception",
    description:
      "A skilled thief who steals secrets through people's dreams is given a chance to erase his past by planting an idea in the mind of a powerful businessman. As the team descends through layers of dreams, reality begins to blur and the mission becomes increasingly dangerous.",
    image: "https://wallpapercave.com/wp/9vqnPS9.jpg",
  },
]

const HomeSlider = () => {
  const [index, setIndex] = useState(0)

  const current = data[index]

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  return (
    <div className="relative flex h-screen w-full flex-col justify-end overflow-hidden px-14 pb-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${current.image}")`,
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
          <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85">
            <Play className="size-5 fill-current" />
            Play
          </button>

          <button className="rounded-md bg-primary/15 px-6 py-3 font-semibold text-primary backdrop-blur-sm transition hover:bg-primary/25">
            More Info
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {data.map((item, i) => (
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
