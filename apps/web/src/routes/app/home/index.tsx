import { Link } from "react-router"
import VideoCard from "@/routes/app/components/video-card"
const videos = [
  {
    id: 1,
    title: `
    
Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur voluptates tempore quibusdam non nulla eaque, quasi fuga, est ipsam distinctio cumque officia itaque obcaecati doloremque maiores aspernatur autem atque. Nam.
    
    How to use React?`,
    duration: "2:20",
    views: "300K",
    channelName: "Rajesh Charhajari",
    createdAt: "5 hours ago",
    thumbnail: "https://picsum.photos/seed/picsum/320/180",
  },
  {
    id: 2,
    title: "React Hooks Explained in 15 Minutes",
    duration: "15:42",
    views: "1.2M",
    channelName: "Code Master",
    createdAt: "2 days ago",
    thumbnail: "https://picsum.photos/seed/react/320/180",
  },
]
const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {videos.map((video) => (
        <Link to={`/${video.id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  )
}

export default Home
