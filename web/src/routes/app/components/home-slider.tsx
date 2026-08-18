import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { useState } from "react"

// import { useMovies } from "@/queries/public"
const data = [
  {
    id: 1,
    title: "The Avengers",
    description:
      "Earth's mightiest heroes come together to stop an alien invasion and save the world from destruction.",
    image: "https://wallpapercave.com/wp/wp2613062.jpg",
  },
  {
    id: 2,
    title: "Obsession",
    description:
      "A gripping tale of love and revenge. Billionaire Ateş Karahan forces Mercan Yıldırım into a 187-day marriage to settle her family’s debts.",
    image: "https://picsum.photos/1600/900?random=2",
  },
  {
    id: 3,
    title: "Captain america",
    description:
      "A gripping tale of love and revenge. Billionaire Ateş Karahan forces Mercan Yıldırım into a 187-day marriage to settle her family’s debts.",
    image: "https://picsum.photos/1600/900?random=3",
  },
  {
    id: 4,
    title: "Final destination",
    description:
      "A gripping tale of love and revenge. Billionaire Ateş Karahan forces Mercan Yıldırım into a 187-day marriage to settle her family’s debts.",
    image: "https://picsum.photos/1600/900?random=4",
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
      className="flex h-screen w-full flex-col justify-end gap-4 bg-cover bg-center px-14 pb-40"
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
