import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import TableVideoCard from "@/routes/studio/components/table-video-card"
const videos = [
  {
    id: 1,
    title: "How to use React?",
    duration: "2:20",
    views: "300K",
    channelName: "Rajesh Charhajari",
    createdAt: "5 hours ago",
    thumbnail: "https://picsum.photos/seed/picsum/320/180",
    description: "This is it",
    visibility: "public",
    comments: 20,
  },
  {
    id: 2,
    title: "React Hooks Explained in 15 Minutes",
    duration: "15:42",
    views: "1.2M",
    channelName: "Code Master",
    createdAt: "2 days ago",
    thumbnail: "https://picsum.photos/seed/react/320/180",
    description: "This is it",
    visibility: "private",
    comments: 10,
  },
]
const Content = () => {
  return (
    <div>
      <div className="flex justify-between px-6 pt-10">
        <div className="text-3xl font-bold">Channel content</div>
      </div>
      <div className="flex flex-col gap-1 px-6">
        <div className="border-b">
          <button className="border-b-2 border-primary py-4 font-medium">
            Videos
          </button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.map((video) => (
              <TableRow>
                <TableCell>
                  <TableVideoCard
                    src={video.thumbnail}
                    title={video.title}
                    description={video.description}
                    duration={video.duration}
                  />
                </TableCell>
                <TableCell>{video.visibility}</TableCell>
                <TableCell>{video.createdAt}</TableCell>
                <TableCell>{video.views}</TableCell>
                <TableCell>{video.comments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Content
