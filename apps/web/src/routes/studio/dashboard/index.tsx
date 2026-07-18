import { MessageSquareText, ThumbsUp, View } from "lucide-react"
import UploadDialog from "@/routes/studio/components/upload-dialog"
import { useMyChannel } from "@/queries/channel"
import { getThumbnailUrl } from "@/utils/video"

const Dashboard = () => {
  const { data: channel } = useMyChannel()
  return (
    <div>
      <div className="flex justify-between px-6 pt-10">
        <div className="text-3xl font-bold">Channel dashboard</div>
        <div>
          <UploadDialog />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">
        <div className="flex flex-col gap-3 rounded-xl border p-6">
          <div className="font-bold">Latest video performance</div>
          <div className="overflow-hidden rounded-xl">
            <img
              src={getThumbnailUrl(channel?.lastVideo?.id)}
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <View /> {channel?.lastVideo?.views || 0}
            <MessageSquareText /> {channel?.lastVideo?.comments || 0}
            <ThumbsUp /> {channel?.lastVideo?.likes || 0}
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-xl border p-6">
          <div className="font-bold">Channel analytics</div>
          <div>Current subscribers</div>
          <div className="text-4xl font-bold">{channel?.subscribers || 0}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
