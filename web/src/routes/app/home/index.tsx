import HomeSlider from "@/routes/app/components/home-slider"
import MenuSlider from "@/routes/app/components/menu-slider"

const AppHome = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-[90vh] w-full">
        <HomeSlider />
      </div>
      <div>
        <div className="ml-20 text-xl font-bold">Movies</div>
        <div className="h-60 w-full">
          <MenuSlider />
        </div>
      </div>
      <div>
        <div className="ml-20 text-xl font-bold">Series</div>
        <div className="h-60 w-full">
          <MenuSlider />
        </div>
      </div>
    </div>
  )
}

export default AppHome
