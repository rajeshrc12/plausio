import HomeSlider from "@/routes/app/components/home-slider"
import MenuSlider from "@/routes/app/components/menu-slider"

const AppHome = () => {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero */}
      <HomeSlider />
      <div className="flex flex-col gap-3">
        <div className="pl-16 text-2xl font-bold">Movies</div>
        <div className="h-50">
          <MenuSlider />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="pl-16 text-2xl font-bold">Movies</div>
        <div className="h-50">
          <MenuSlider />
        </div>
      </div>
    </div>
  )
}

export default AppHome
