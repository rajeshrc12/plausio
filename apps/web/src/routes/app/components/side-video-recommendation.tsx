import SideVideoCard from "@/routes/app/components/side-video-card"
const videos = [
  {
    id: 1,
    title: "How to use React?",
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

const SideVideoRecommendation = () => {
  return videos.map((video) => <SideVideoCard video={video} />)
}

export default SideVideoRecommendation
