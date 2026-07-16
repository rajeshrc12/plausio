import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Upload } from "lucide-react"
import type { FileData } from "@/types/video"
import UploadVideo from "@/routes/studio/components/upload-video"
import PreviewVideo from "@/routes/studio/components/preview-video"
import { useMyVideos } from "@/queries/video"
import { useAddVideo } from "@/mutations/video"

const UploadDialog = () => {
  const [video, setVideo] = useState<File>()
  const [thumbnail, setThumbnail] = useState<File>()
  const [videoData, setVideoData] = useState<FileData>({
    title: "",
    description: "",
    visibility: "public",
  })
  const { data: myVideos } = useMyVideos()
  const addVideo = useAddVideo()
  console.log({ myVideos })
  const cleanup = () => {
    setVideo(undefined)
    setThumbnail(undefined)
    setVideoData({
      title: "",
      description: "",
      visibility: "public",
    })
  }
  const handleSave = () => {
    addVideo.mutate({
      title: "string",
      description: "string",
      name: "string",
      type: "string",
      duration: 1,
      size: 1,
    })
  }
  return (
    <Dialog disablePointerDismissal={true} onOpenChange={cleanup}>
      <DialogTrigger
        render={
          <Button variant={"outline"} className="h-10 w-10 rounded-full">
            <Upload className="h-6! w-6!" />
          </Button>
        }
      />
      <DialogContent showCloseButton={!video} className={"max-w-200!"}>
        <DialogHeader>
          <DialogTitle>{!video ? "Upload File" : video.name}</DialogTitle>
        </DialogHeader>
        <div className="sidebar-scrollbar max-h-[70vh] overflow-y-auto">
          {!video ? (
            <UploadVideo handleFile={setVideo} />
          ) : (
            <PreviewVideo
              file={video}
              thumbnail={thumbnail as File}
              handleThumbnail={setThumbnail}
              fileData={videoData as FileData}
              handleFileData={setVideoData}
            />
          )}
        </div>
        {video && (
          <DialogFooter className="border-none bg-background px-4">
            <DialogClose
              disabled={addVideo.isPending}
              render={<Button variant="outline">Cancel</Button>}
            />
            <Button disabled={addVideo.isPending} onClick={handleSave}>
              save
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
