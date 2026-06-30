import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, UploadIcon } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"

import VideoDetails from "@/routes/studio/video-detail"

const UploadVideo = () => {
  const [file, setFile] = useState<File[]>()
  const [openDialog, setOpenDialog] = useState(false)
  const cleanup = () => {
    setFile([])
    setOpenDialog(false)
  }
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "video/*": [],
    },
    multiple: true,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles)
    },
  })

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <button className="rounded-full border p-2 transition hover:bg-accent">
          <UploadIcon className="size-6" />
        </button>
      </DialogTrigger>

      <DialogContent className="flex h-[90vh] max-w-5xl! flex-col overflow-hidden rounded-3xl p-0">
        <DialogHeader className="shrink-0 border-b px-6 py-4">
          <DialogTitle className="text-2xl font-semibold">
            Upload video
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1">
          {file?.length ? (
            <VideoDetails file={file[0]} cleanup={cleanup} />
          ) : (
            <div
              {...getRootProps()}
              className={`flex h-full flex-col items-center justify-center px-8 transition-colors ${
                isDragActive ? "bg-muted/40" : ""
              }`}
            >
              <input {...getInputProps()} />

              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-muted">
                <Upload
                  className="size-16 text-muted-foreground"
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-8 text-lg">
                {isDragActive
                  ? "Drop your videos here"
                  : "Drag and drop video files to upload"}
              </p>

              <Button
                type="button"
                className="mt-8 rounded-full px-8"
                onClick={open}
              >
                Select files
              </Button>

              <div className="mt-16 max-w-2xl text-center text-sm text-muted-foreground">
                <p>
                  By submitting your videos to Plausio, you acknowledge that you
                  agree to Plausio&apos;s Terms of Service and Community
                  Guidelines.
                </p>

                <p className="mt-2">
                  Please be sure not to violate others&apos; copyright or
                  privacy rights.
                  <button
                    type="button"
                    className="ml-1 text-primary hover:underline"
                  >
                    Learn more
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadVideo
