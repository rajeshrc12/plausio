import { useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { ImagePlus } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import type { FileData } from "@/types/video"

type PreviewVideoProps = {
  file: File
  thumbnail: File
  handleThumbnail: (file: File) => void
  fileData: FileData
  handleFileData: (fileData: FileData) => void
}

const PreviewVideo = ({
  file,
  thumbnail,
  handleThumbnail,
  fileData,
  handleFileData,
}: PreviewVideoProps) => {
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleThumbnail(acceptedFiles[0])
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
  console.log("PreviewVideo")
  return (
    <div className="flex gap-4 p-2">
      <div className="flex flex-1 flex-col gap-2">
        <div>Title</div>
        <Input
          value={fileData.title}
          onChange={(e) =>
            handleFileData({ ...fileData, title: e.target.value })
          }
          placeholder="Video title"
        />
        <div>Description</div>

        <Textarea
          value={fileData.description}
          onChange={(e) =>
            handleFileData({ ...fileData, description: e.target.value })
          }
          className="field-sizing-fixed resize-none"
          rows={4}
          placeholder="Tell viewers about your video"
        />
        <div>Visibility</div>
        <Select
          value={fileData.visibility}
          onValueChange={(value) => {
            if (value) handleFileData({ ...fileData, visibility: value })
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={"public"} value={"public"}>
                public
              </SelectItem>
              <SelectItem key={"private"} value={"private"}>
                private
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <h3 className="text-xl font-semibold">Thumbnail</h3>

          <div
            {...getRootProps()}
            className={`mt-4 flex h-24 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors ${
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
      <div className="sticky top-4 w-[320px] self-start">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewVideo
