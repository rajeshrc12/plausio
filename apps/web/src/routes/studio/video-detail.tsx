import { useCallback, useEffect, useMemo, useState } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

type VideoDetailsProps = {
  file: File
  cleanup: () => void
}

const VideoDetails = ({ file, cleanup }: VideoDetailsProps) => {
  if (!file) return
  const video = useMemo(() => {
    const videoPreview = URL.createObjectURL(file)

    return (
      <video
        src={videoPreview}
        controls
        className="aspect-video w-full bg-black"
      />
    )
  }, [file])

  const [thumbnail, setThumbnail] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setThumbnail(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    multiple: false,
  })

  const thumbnailPreview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  useEffect(() => {
    return cleanup
  }, [])
  return (
    <div className="relative flex h-full min-h-0 flex-col">
      {/* Body */}
      <div className="flex min-h-0 flex-1 gap-8 overflow-y-auto px-8 py-6">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <div className="rounded-xl border p-4">
            <label className="text-sm text-muted-foreground">
              Title (required)
            </label>

            <Input
              defaultValue={file.name.replace(/\.[^/.]+$/, "")}
              className="mt-2 border-0 px-0 text-xl shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="rounded-xl border p-4">
            <label className="text-sm text-muted-foreground">Description</label>

            <Textarea
              rows={8}
              placeholder="Tell viewers about your video"
              className="mt-2 resize-none border-0 px-0 shadow-none focus-visible:ring-0"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold">Thumbnail</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Set a thumbnail that stands out and draws viewers' attention.
            </p>

            <div
              {...getRootProps()}
              className={`mt-4 flex h-40 w-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary"
              }`}
            >
              <input {...getInputProps()} />

              {thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="h-full w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />

                  <p className="text-sm font-medium">
                    {isDragActive ? "Drop image here" : "Upload file"}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="sticky top-0 w-[320px]">
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <div className="space-y-4 p-4">
              {video}
              <div>
                <p className="text-xs text-muted-foreground">Filename</p>
                <p className="truncate text-sm">{file.name}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">File size</p>
                <p className="text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Visibility</p>
                <p className="text-sm">Public</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t px-8 py-4">
        <Button onClick={cleanup} variant={"outline"}>
          Cancel
        </Button>
        <Button>Upload</Button>
      </div>
    </div>
  )
}

export default VideoDetails
