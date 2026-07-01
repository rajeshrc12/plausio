import { env } from "@/config/env"

import type { Video as VideoModel } from "@workspace/db"
import { DateTime } from "luxon"

const VideoCard = ({ ...video }: VideoModel) => {
  return (
    <div className="cursor-pointer rounded-xl p-2 hover:bg-gray-50">
      <img
        src={`${env.THUMBNAIL_PUBLIC_URL}/${video.thumbnailKey}` || undefined}
        alt={video.title}
        className="aspect-video w-full rounded-xl"
      />

      <div className="mt-3 flex gap-3">
        <img
          src={`https://i.pravatar.cc/100?img=${video.id}`}
          alt={""}
          className="h-10 w-10 rounded-full"
        />

        <div>
          <h3 className="line-clamp-2 font-semibold">{video.title}</h3>
          <p className="text-sm text-gray-600">Code Academy</p>
          <p className="text-sm text-gray-600">
            {100} views •{" "}
            {DateTime.fromISO(String(video.createdAt)).toRelative()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
