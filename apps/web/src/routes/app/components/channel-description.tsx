import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Globe, Info, PersonStanding, Play, Video, View } from "lucide-react"

interface ChannelDescriptionProps {
  name: string
  description: string
  handle: string
  country: string
  createdAt: string
  subscribers: string
  videos: string
  views: string
}
const ChannelDescription = ({
  channel,
}: {
  channel: ChannelDescriptionProps
}) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <div className="flex cursor-pointer text-sm text-muted-foreground">
            {channel.description.slice(0, 100)}
            <div className="text-primary">...more</div>
          </div>
        }
      />
      <DialogContent className={"max-w-145! p-0"}>
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className={"text-2xl font-bold"}>
            {channel.name}
          </DialogTitle>
        </DialogHeader>
        <div className="sidebar-scrollbar flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-4 pb-4">
          <div className="text-xl font-bold">Description</div>
          <div>{channel.description}</div>
          <div className="flex flex-col gap-3">
            <div className="text-xl font-bold">More Info</div>
            <div className="flex items-center gap-2">
              <Play />
              <div>www.plausio.site/@{channel.handle}</div>
            </div>
            <div className="flex items-center gap-2">
              <Globe />
              <div>{channel.country}</div>
            </div>
            <div className="flex items-center gap-2">
              <Info />
              <div>Joined {channel.createdAt}</div>
            </div>
            <div className="flex items-center gap-2">
              <PersonStanding />
              <div>{channel.subscribers} Subscribers</div>
            </div>
            <div className="flex items-center gap-2">
              <Video />
              <div>{channel.videos} videos</div>
            </div>
            <div className="flex items-center gap-2">
              <View />
              <div>{channel.views} views</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChannelDescription
