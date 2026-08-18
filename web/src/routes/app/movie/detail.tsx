import { Link, useParams } from "react-router"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Play } from "lucide-react"
import MovieCard from "@/routes/app/components/movie-card"

const Detail = () => {
  const { id } = useParams()
  console.log(id)
  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 h-screen w-full bg-cover bg-center"
        style={{
          backgroundImage: `url("https://wallpapercave.com/wp/wp2613062.jpg")`,
          maskImage: `
      linear-gradient(to right, transparent 0%, black 20%),
      linear-gradient(to bottom, black 70%, transparent 100%)
    `,
          maskComposite: "intersect",
          WebkitMaskImage: `
      linear-gradient(to right, transparent 0%, black 20%),
      linear-gradient(to bottom, black 70%, transparent 100%)
    `,
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="absolute top-16 flex w-full flex-col gap-5 px-14">
        <div className="flex h-screen flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link to="/movies" />}>
                  Movies
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>The Avengers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="mt-20 flex flex-col gap-5">
            <div className="text-4xl font-bold">The Avengers</div>

            <div className="font-none w-100 text-sm">
              <div>
                <span className="font-semibold">Genre</span>
                <span> Action, Adventure, Sci-Fi, Superhero</span>
              </div>

              <div>
                <span className="font-semibold">Content Descriptor</span>
                <span>
                  {" "}
                  violence, fantasy violence, action sequences, mild language
                </span>
              </div>

              <div>
                <span className="font-semibold">Director</span>
                <span> Joss Whedon</span>
              </div>

              <div>
                <span className="font-semibold">Starring</span>
                <span>
                  {" "}
                  Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth,
                  Scarlett Johansson, Jeremy Renner, Tom Hiddleston, Samuel L.
                  Jackson
                </span>
              </div>

              <div>
                <span className="font-semibold">Publisher</span>
                <span> Marvel Studios</span>
              </div>

              <div className="mt-4">
                Earth's mightiest heroes must come together when the powerful
                Asgardian Loki steals the Tesseract and threatens to bring an
                alien army to Earth. Iron Man, Captain America, Thor, Hulk,
                Black Widow and Hawkeye must put aside their differences and
                unite to save the world from destruction.
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded bg-blue-400 px-4 py-3 font-bold">
                <Play />
                Play
              </button>

              <button className="flex items-center gap-2 rounded bg-primary/10 px-4 py-3 font-bold">
                More info
              </button>
            </div>
          </div>
        </div>

        <div className="text-2xl">Recommonded</div>
        <div className="grid grid-cols-4 gap-5">
          {new Array(10).fill(0).map((_, i) => (
            <MovieCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Detail
