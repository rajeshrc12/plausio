import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"

import { Button } from "@workspace/ui/components/button"

const UploadVideo = ({ handleFile }: { handleFile: (file: File) => void }) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/x-matroska": [".mkv"],
    },
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      handleFile(acceptedFiles[0])
    },
  })
  console.log("UploadVideo")
  return (
    <div
      {...getRootProps()}
      className={`flex h-full flex-col items-center justify-center px-8 transition-colors ${
        isDragActive ? "bg-muted/40" : ""
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-muted">
        <Upload className="size-16 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <p className="mt-8 text-lg">
        {isDragActive
          ? "Drop your videos here"
          : "Drag and drop video files to upload"}
      </p>

      <Button type="button" className="mt-8 rounded-full px-8" onClick={open}>
        Select files
      </Button>

      <div className="mt-16 max-w-2xl text-center text-sm text-muted-foreground">
        <p>
          By submitting your videos to Plausio, you acknowledge that you agree
          to Plausio&apos;s Terms of Service and Community Guidelines.
        </p>

        <p className="mt-2">
          Please be sure not to violate others&apos; copyright or privacy
          rights.
          <button type="button" className="ml-1 text-primary hover:underline">
            Learn more
          </button>
        </p>
      </div>
    </div>
  )
}

export default UploadVideo
