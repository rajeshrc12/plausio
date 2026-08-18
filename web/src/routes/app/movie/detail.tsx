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
      <div className="absolute inset-0 h-screen w-full">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url("https://wallpapercave.com/wp/wp2613062.jpg")`,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      </div>

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

            <div className="w-full max-w-2xl space-y-1 text-sm">
              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Genre</span>
                <span className="text-muted-foreground">
                  Action, Adventure, Sci-Fi, Superhero
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Content Descriptor</span>
                <span className="text-muted-foreground">
                  Violence, fantasy violence, action sequences, mild language
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Director</span>
                <span className="text-muted-foreground">Joss Whedon</span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Starring</span>
                <span className="text-muted-foreground">
                  Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth,
                  Scarlett Johansson, Jeremy Renner, Tom Hiddleston, Samuel L.
                  Jackson
                </span>
              </div>

              <div className="grid grid-cols-[140px_1fr]">
                <span className="font-semibold">Publisher</span>
                <span className="text-muted-foreground">Marvel Studios</span>
              </div>

              <p className="pt-4 leading-relaxed text-muted-foreground">
                Earth's mightiest heroes must come together when the powerful
                Asgardian Loki steals the Tesseract and threatens to bring an
                alien army to Earth. Iron Man, Captain America, Thor, Hulk,
                Black Widow and Hawkeye must put aside their differences and
                unite to save the world from destruction.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-semibold text-background transition hover:bg-primary/85">
                <Play className="size-5 fill-current" />
                Play
              </button>

              <button className="rounded-md bg-primary/15 px-6 py-3 font-semibold text-primary backdrop-blur-sm transition hover:bg-primary/25">
                Add to list
              </button>
            </div>
          </div>
        </div>

        <div className="text-2xl">Recommended</div>
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
