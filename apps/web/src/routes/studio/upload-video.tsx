import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Button } from "@workspace/ui/components/button"
import { Upload, UploadIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"

const UploadVideo = () => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "video/*": [],
    },
    multiple: true,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
      // Upload your files here
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full border p-2 transition hover:bg-accent">
          <UploadIcon className="size-6" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl! overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-2xl font-semibold">
            Upload videos
          </DialogTitle>
        </DialogHeader>

        <div
          {...getRootProps()}
          className={`flex h-125 flex-col items-center justify-center px-8 transition-colors ${
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
              agree to Plausio's Terms of Service and Community Guidelines.
            </p>

            <p className="mt-2">
              Please be sure not to violate others' copyright or privacy rights.
              <button
                type="button"
                className="ml-1 text-primary hover:underline"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadVideo
