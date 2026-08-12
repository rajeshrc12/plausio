import HomeSlider from "@/routes/app/components/home-slider"
import MenuSlider from "@/routes/app/components/menu-slider"

const AppHome = () => {
  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero */}
      <div className="h-[55vh] min-h-100 w-full md:h-[65vh] md:min-h-125 lg:h-[80vh] lg:min-h-150">
        <HomeSlider />
      </div>

      {/* Movies */}
      <section>
        <h2 className="mb-3 px-4 text-xl font-bold sm:px-6 md:px-8 lg:px-20">
          Movies
        </h2>

        <div className="h-52 w-full sm:h-56 md:h-60 lg:h-64">
          <MenuSlider />
        </div>
      </section>

      {/* Series */}
      <section>
        <h2 className="mb-3 px-4 text-xl font-bold sm:px-6 md:px-8 lg:px-20">
          Series
        </h2>

        <div className="h-52 w-full sm:h-56 md:h-60 lg:h-64">
          <MenuSlider />
        </div>
      </section>
    </div>
  )
}

export default AppHome
