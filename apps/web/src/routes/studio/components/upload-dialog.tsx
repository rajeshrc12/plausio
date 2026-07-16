import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Upload } from "lucide-react"
import UploadVideo from "@/routes/studio/components/upload-video"
import PreviewVideo from "@/routes/studio/components/preview-video"
import VideoForm from "@/routes/studio/components/video-form"

const UploadDialog = () => {
  const [video, setVideo] = useState<File>()

  return (
    <Dialog
      disablePointerDismissal={true}
      onOpenChange={(open) => {
        if (!open) setVideo(undefined)
      }}
    >
      <DialogTrigger
        render={
          <Button variant={"outline"} className="h-10 w-10 rounded-full">
            <Upload className="h-6! w-6!" />
          </Button>
        }
      />
      <DialogContent className={"max-w-200!"}>
        <DialogHeader>
          <DialogTitle>{!video ? "Upload File" : video.name}</DialogTitle>
        </DialogHeader>
        <div>
          {!video ? (
            <UploadVideo handleFile={setVideo} />
          ) : (
            <div className="flex">
              <VideoForm file={video} />
              <PreviewVideo file={video} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
