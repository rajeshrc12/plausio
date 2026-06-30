import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileText,
  Globe,
} from "lucide-react"

const tabs = ["Videos", "Posts", "Playlists"]

const videos = [
  {
    id: 1,
    title: "MERN Stack Project | WhatsApp Clone",
    description: "Hey everyone, I've created a MERN stack...",
    thumbnail: "https://placehold.co/160x90",
    duration: "3:41",
    visibility: "Public",
    date: "May 4, 2024",
    status: "Premiered",
    views: 103,
    comments: 1,
    draft: false,
  },
  {
    id: 2,
    title: "Test video",
    description: "Test video",
    thumbnail: "https://placehold.co/160x90",
    duration: "0:31",
    visibility: "Public",
    date: "Jun 29, 2026",
    status: "Published",
    views: 2,
    comments: 2,
    draft: false,
  },
  {
    id: 3,
    title: "TextInMotion VideoSample",
    description: "Add description",
    thumbnail: "https://placehold.co/160x90",
    duration: "0:31",
    draft: true,
  },
]

export default function ChannelContent() {
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

              <th className="font-normal text-muted-foreground">Comments</th>
            </tr>
          </thead>

          <tbody>
            {videos.map((video) => (
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
                        src={video.thumbnail}
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute right-1 bottom-1 rounded bg-primary/80 px-1 text-xs text-white">
                        {video.duration}
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

                <td>
                  {video.draft ? (
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Draft
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Public
                    </div>
                  )}
                </td>

                <td>
                  {video.draft ? (
                    "-"
                  ) : (
                    <>
                      <div>{video.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {video.status}
                      </div>
                    </>
                  )}
                </td>

                <td>{video.views ?? "-"}</td>

                <td>
                  {video.draft ? (
                    <Button variant="secondary" className="rounded-full">
                      Edit draft
                    </Button>
                  ) : (
                    video.comments
                  )}
                </td>
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
