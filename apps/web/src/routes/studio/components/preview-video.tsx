import { useMemo } from "react"

const PreviewVideo = ({ file }: { file: File }) => {
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
  return (
    <div>
      <div className="m-5 w-76 overflow-hidden rounded-2xl border bg-muted">
        <div className="space-y-4 p-4">
          {video}

          <div>
            <p className="text-xs text-muted-foreground">Filename</p>
            <p className="truncate text-sm">{file.name}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">File size</p>
            <p className="text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewVideo
