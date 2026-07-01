import { useVideos } from "@/hooks/getVideos"
import type { Video as VideoModel } from "@workspace/db"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

const tabs = ["Videos", "Posts", "Playlists"]

export default function ChannelContent() {
  const { data, isLoading } = useVideos()
  if (isLoading) return "loading"
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        {/* Title */}

        <h1 className="mb-8 text-4xl font-bold">Channel content</h1>

        {/* Tabs */}

        <div className="flex gap-10 border-b text-[15px]">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`border-b-2 pb-4 font-medium transition ${
                i === 0
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}

        <table className="w-full">
          <thead className="border-b">
            <tr className="h-12 text-left text-sm">
              <th className="w-14">
                <Checkbox />
              </th>

              <th>Video</th>

              <th className="font-normal text-muted-foreground">Notices</th>

              <th className="font-normal text-muted-foreground">Visibility</th>

              <th className="font-normal text-muted-foreground">Date</th>

              <th className="font-normal text-muted-foreground">Views</th>

              <th className="font-normal text-muted-foreground">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((video: VideoModel) => (
              <tr
                key={video.id}
                className="border-b transition hover:bg-muted/40"
              >
                <td className="py-3 align-top">
                  <Checkbox />
                </td>

                <td className="py-3">
                  <div className="flex gap-4">
                    <div className="relative h-18 w-32 overflow-hidden rounded-lg bg-muted">
                      <img
                        src={video.thumbnailUrl || undefined}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 bottom-1 rounded bg-primary/80 px-1 text-xs text-white">
                        {video.fileSize}
                      </span>
                    </div>

                    <div className="max-w-sm">
                      <h3 className="font-medium">{video.title}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {video.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-muted-foreground">—</td>

                <td></td>

                <td></td>

                <td></td>

                <td>{video.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}

        <div className="flex items-center justify-end gap-8 border-t py-5 text-sm">
          <div className="flex items-center gap-2">
            Rows per page
            <span className="font-medium">30</span>
            <ChevronDown className="h-4 w-4" />
          </div>

          <span>1 - 3 of 3</span>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
