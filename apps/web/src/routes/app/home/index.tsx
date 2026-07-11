import { Link } from "react-router"

const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {new Array(30).fill(0).map((_, i) => (
        <Link to={`/${i}`}>
          <div key={i} className="h-50 border">
            {i}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Home
