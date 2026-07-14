import { useSidebar } from "@/hooks/useSidebar"
import { useEffect, useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { CircleX, Forward, ThumbsDown, ThumbsUp } from "lucide-react"
import Description from "@/routes/app/components/description"
import AddComment from "@/routes/app/components/add-comment"
import Comments from "@/routes/app/components/comments"
import SideVideoRecommendation from "@/routes/app/components/side-video-recommendation"
import { useVideo } from "@/hooks/useVideo"
import { Link } from "react-router"
import { useMyChannel } from "@/hooks/useMyChannel"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { env } from "@/config/env"
import channelApi from "@/api/channel"
import videoApi from "@/api/video"
import { getProfileUrl, getVideoUrl } from "@/utils/video"

const View = ({ id }: { id: string }) => {
  const { data: video, refetch } = useVideo(id ?? "")
  const { data: channel, isError } = useMyChannel()
  const [loading, setLoading] = useState(false)
  const setAppSidebar = useSidebar((state) => state.setAppSidebar)
  useEffect(() => {
    setAppSidebar(false)
    return () => {
      setAppSidebar(true)
    }
  }, [])
  const login = () => {
    window.location.href = `${env.UPLOAD_API_URL}/auth/google`
  }

  const handleSubscribe = async () => {
    if (loading) return

    setLoading(true)
    try {
      await channelApi.post("/channel/subscribe", {
        channelId: video.channel.id,
      })
      await refetch()
    } finally {
      setLoading(false)
    }
  }

  const handleUnsubscribe = async () => {
    if (loading) return

    setLoading(true)
    try {
      await channelApi.post("/channel/unsubscribe", {
        channelId: video.channel.id,
      })
      await refetch()
    } finally {
      setLoading(false)
    }
  }

  const handleReaction = async (type: string) => {
    const videoReaction = video?.reaction?.type ? video.reaction?.type : null

    await videoApi.post("/video/reaction", {
      videoId: video.id,
      type: videoReaction === type ? "remove" : type,
    })
    refetch()
  }

  return (
    <div className="grid grid-cols-12 p-4">
      <div className="col-span-8 flex flex-col gap-4 p-2">
        <div className="aspect-video w-full overflow-hidden rounded-xl">
          <video
            className="h-full w-full object-cover"
            controls
            src={getVideoUrl(Number(id))}
          />
        </div>
        <div className="text-xl font-bold">{video?.title}</div>
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Link to={`/@${video?.channel?.handle}`} className="flex gap-3">
              <Avatar className={"h-10 w-10"}>
                <AvatarImage src={getProfileUrl(video?.channel?.id)} />
                <AvatarFallback>{video?.channel?.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-bold">{video?.channel?.name}</div>
                <div className="text-xs text-muted-foreground">
                  397k subscribers
                </div>
              </div>
            </Link>
            {isError ? (
              <Popover>
                <PopoverTrigger
                  render={
                    <Button className={"rounded-full p-5"}>Subscribe</Button>
                  }
                />
                <PopoverContent>
                  <PopoverHeader>
                    <PopoverTitle className={"text-xl"}>
                      Want to subscribe to this channel?
                    </PopoverTitle>
                    <PopoverDescription>
                      Sign in to subscribe to this channel.
                    </PopoverDescription>
                    <div>
                      <Button onClick={login}>Sign in</Button>
                    </div>
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            ) : channel?.handle === video?.channel?.handle ? (
              ""
            ) : video?.isSubscribed ? (
              <Button
                disabled={loading}
                variant={"secondary"}
                onClick={handleUnsubscribe}
                className={"rounded-full p-5"}
              >
                <CircleX />
                Unsubscribe
              </Button>
            ) : (
              <Button
                disabled={loading}
                onClick={handleSubscribe}
                className={"rounded-full p-5"}
              >
                Subscribe
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
              <button className={"flex items-center gap-2 font-medium"}>
                <ThumbsUp
                  className={
                    video?.reaction?.type === "like"
                      ? "fill-current"
                      : "fill-none"
                  }
                  onClick={() => handleReaction("like")}
                  size={20}
                />
                <span>{video?.likes}</span>
              </button>
              <span className="border"></span>
              <button className={"flex items-center gap-2 font-medium"}>
                <ThumbsDown
                  className={
                    video?.reaction?.type === "dislike"
                      ? "fill-current"
                      : "fill-none"
                  }
                  onClick={() => handleReaction("dislike")}
                  size={20}
                />
                <span>{video?.dislikes}</span>
              </button>
            </div>
            <div className="flex gap-2 rounded-full bg-accent px-4 py-2">
              <button className={"flex items-center gap-2 font-medium"}>
                <Forward />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        <Description
          views={video?.views}
          createdAt={video?.createdAt}
          text={video?.description}
        />
        <div className="text-xl font-bold">
          {video?.comments?.length} Comments
        </div>
        <AddComment
          videoId={video?.id}
          channelId={video?.channel?.id}
          refetch={refetch}
        />
        <Comments comments={video?.comments} />
      </div>
      <div className="col-span-4 flex flex-col gap-2 p-2">
        <SideVideoRecommendation />
      </div>
    </div>
  )
}

export default View
