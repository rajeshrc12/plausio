import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableVideoCard from "@/routes/studio/components/table-video-card"
import { getVideoCreationDate } from "@/utils/date"
import { getThumbnailUrl } from "@/utils/video"
import { useMyVideos } from "@/queries/video"

const Content = () => {
  const { data: videos, isLoading } = useMyVideos()
  if (isLoading) return "Loading..."
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

        <Table className="lg:w-full lg:table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="lg:w-130">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="lg:w-14">Views</TableHead>
              <TableHead className="lg:w-20">Comments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos?.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="lg:w-130">
                  <TableVideoCard
                    src={getThumbnailUrl(video.id)}
                    title={video.title}
                    description={video.description}
                    duration={video.duration}
                  />
                </TableCell>
                <TableCell>{video.visibility}</TableCell>
                <TableCell>{video.status}</TableCell>
                <TableCell>{getVideoCreationDate(video.createdAt)}</TableCell>
                <TableCell className="lg:w-14">{video.views}</TableCell>
                <TableCell className="lg:w-20">
                  {video?.comments?.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Content
