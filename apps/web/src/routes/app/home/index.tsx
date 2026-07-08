import { Button } from "@workspace/ui/components/button"
import { Link } from "react-router"

const Home = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 flex gap-2 bg-background p-5">
        {new Array(10).fill(0).map((_, i) => (
          <Button key={i}>Category</Button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 px-5">
        {new Array(30).fill(0).map((_, i) => (
          <Link to={`/${i}`}>
            <div key={i} className="h-40 border">
              {i}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
