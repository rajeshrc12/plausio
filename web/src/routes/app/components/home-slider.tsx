import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

// import { useMovies } from "@/queries/public"
const data = [
  {
    id: 1,
    title: "The Avengers",
    description:
      "Earth's mightiest heroes come together when Loki and his alien army threaten to conquer Earth. Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye must put aside their differences and fight as one team to save humanity.",
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
    <div
      className="flex h-screen w-full flex-col justify-end gap-4 bg-cover bg-center px-14 pb-30"
      style={{
        backgroundImage: `url("${current.image}")`,
        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
      }}
    >
      <div className="text-4xl font-bold">{current.title}</div>

      <div className="w-100 font-medium">{current.description}</div>

      <div className="flex justify-between">
        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded bg-blue-400 px-4 py-3 font-bold">
            <Play />
            Play
          </button>

          <button className="flex items-center gap-2 rounded bg-primary/10 px-4 py-3 font-bold">
            More info
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {data.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${
                i === index ? "w-4 bg-current" : "bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 pr-20">
          <button onClick={prevSlide} className="rounded bg-primary/30 px-2">
            <ChevronLeft className="size-9" />
          </button>

          <button onClick={nextSlide} className="rounded bg-primary/30 px-2">
            <ChevronRight className="size-9" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeSlider
