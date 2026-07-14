import { useEffect, useState } from "react"
import UploadVideo from "@/routes/studio/components/upload-video"
import PreviewVideo from "@/routes/studio/components/preview-video"
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
import { CircleX, Loader, Upload } from "lucide-react"
import type { FileData } from "@/types/video"
import videoApi from "@/api/video"
import { getVideoDuration } from "@/utils/video"
import { useNavigate } from "react-router"
import { toast } from "@workspace/ui/components/sonner"
import { thumbnailUpload, videoUploadMultipart } from "@/service/file"

const UploadDialog = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File>()
  const [thumbnail, setThumbnail] = useState<File>()
  const [fileData, setFileData] = useState<FileData>({
    title: "",
    description: "",
    visibility: "public",
  })
  const [progress, setProgress] = useState(0)

  const handleFile = (file: File) => {
    setFile(file)
  }
  const handleThumbnail = (file: File) => {
    setThumbnail(file)
  }
  const handleFileData = (file: FileData) => {
    setFileData(file)
  }
  const handleSave = async () => {
    if (!file || !thumbnail || !fileData.title || !fileData.description) {
      toast.message(
        <div className="flex items-center gap-2">
          <CircleX className="text-destructive" />
          <div className="text-sm font-bold">Fill all details</div>
        </div>
      )
      return
    }
    setProgress(1)
    const { title, description, visibility } = fileData
    const { name, size, type } = file
    const { name: tn, size: ts, type: tt } = thumbnail
    const duration = await getVideoDuration(file)
    try {
      const response = await videoApi.post("/video/init", {
        file: { name, size, type, duration, title, description, visibility },
        thumbnail: { name: tn, size: ts, type: tt },
      })
      const {
        video: { id: videoId },
        videoKey,
        thumbnailKey,
        videoUploadId,
        thumbnailUploadId,
        videoUrls,
        thumbnailUrl,
        videoPartSize,
      } = response.data
      const videoResult = await videoUploadMultipart({
        file,
        partSize: videoPartSize,
        urls: videoUrls,
        contentType: type,
        onProgress: setProgress,
      })
      const thumbnailResult = await thumbnailUpload({
        thumbnailUrl: thumbnailUrl,
        file: thumbnail,
        contentType: tt,
      })
      const { data: completeData } = await videoApi.post("/video/complete", {
        videoParts: videoResult.parts,
        thumbnailParts: thumbnailResult,
        videoId,
        videoKey,
        videoUploadId,
        thumbnailUploadId,
        thumbnailKey,
      })
      console.log(completeData)
      if (completeData.message) navigate("/studio/content")
    } catch (err) {
      console.error(err)
      console.log("Upload failed")
    } finally {
      setProgress(0)
    }
  }
  const cleanup = () => {
    setFile(undefined)
    setThumbnail(undefined)
    setFileData({
      title: "",
      description: "",
      visibility: "public",
    })
  }
  useEffect(() => {
    return cleanup
  }, [])
  return (
    <Dialog onOpenChange={cleanup}>
      <DialogTrigger
        render={
          <button className="rounded-full border p-2">
            <Upload />
          </button>
        }
      />
      <DialogContent className={"max-w-200!"}>
        <DialogHeader>
          <DialogTitle>
            {!file && "Upload file"}
            {file && file.name}
          </DialogTitle>
        </DialogHeader>
        <div className="sidebar-scrollbar max-h-[70vh] overflow-y-auto px-4">
          {!file && <UploadVideo handleFile={handleFile} />}
          {file && (
            <PreviewVideo
              file={file}
              thumbnail={thumbnail as File}
              handleThumbnail={handleThumbnail}
              fileData={fileData as FileData}
              handleFileData={handleFileData}
            />
          )}
        </div>
        {file && (
          <DialogFooter className="bg-background px-4">
            <DialogClose
              render={
                <Button disabled={progress !== 0} variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button disabled={progress !== 0} onClick={handleSave}>
              {progress === 0 ? (
                "Save"
              ) : (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  {progress}%
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
