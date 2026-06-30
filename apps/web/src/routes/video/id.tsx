import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Download, MoreHorizontal, Share2, ThumbsUp } from "lucide-react"
import VideoCardHorizontal from "@/routes/video/card-horizontal"
import VideoPlayer from "@/components/video-player"

export type Video = {
  id: number
  title: string
  thumbnail: string
  channel: string
  channelImage: string
  views: string
  uploaded: string
}

const videos: Video[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Learn React in ${i + 1} Minutes | Complete Tutorial`,
  thumbnail: `https://picsum.photos/400/225?random=${i + 1}`,
  channel: "Code Academy",
  channelImage: `https://i.pravatar.cc/100?img=${i + 1}`,
  views: `${Math.floor(Math.random() * 900) + 100}K`,
  uploaded: `${Math.floor(Math.random() * 11) + 1} months ago`,
}))

const VideoId = () => {
  return (
    <div className="mx-auto overflow-y-scroll p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left */}

        <div>
          {/* Video */}

          <div className="overflow-hidden rounded-xl bg-primary">
            <VideoPlayer />
          </div>

          {/* Title */}

          <h1 className="mt-4 text-xl font-bold">
            Learn React in 30 Minutes | Complete Beginner Tutorial
          </h1>

          {/* Channel */}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-11 w-11">
                <AvatarImage src="https://i.pravatar.cc/100" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold">Code Academy</h3>
                <p className="text-sm text-muted-foreground">
                  248K subscribers
                </p>
              </div>

              <Button className="rounded-full px-6">Subscribe</Button>
            </div>

            {/* Actions */}

            <div className="flex gap-2">
              <Button variant="secondary" className="rounded-full">
                <ThumbsUp className="mr-2 h-4 w-4" />
                12K
              </Button>

              <Button variant="secondary" className="rounded-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>

              <Button variant="secondary" className="rounded-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>

              <Button variant="secondary" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Description */}

          <div className="mt-5 rounded-xl bg-muted p-4">
            <p className="font-medium">1.2M views • 8 months ago</p>

            <p className="mt-3 text-sm leading-6">
              Learn everything you need to start building modern React
              applications. This tutorial covers components, hooks, props,
              state, routing and much more.
            </p>
          </div>

          {/* Comments */}

          <div className="mt-8">
            <h2 className="mb-5 text-xl font-semibold">1,248 Comments</h2>

            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/100?img=${20 + i}`}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">
                      User {i}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {i} day ago
                      </span>
                    </h4>

                    <p className="mt-1 text-sm">
                      Great tutorial! Looking forward to more videos.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggested */}

        <aside className="space-y-3">
          {videos.map((video) => (
            <VideoCardHorizontal key={video.id} video={video} />
          ))}
        </aside>
      </div>
    </div>
  )
}

export default VideoId
