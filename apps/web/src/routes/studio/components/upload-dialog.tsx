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
import { Upload } from "lucide-react"
import type { FileData } from "@/types/video"

const UploadDialog = () => {
  const [file, setFile] = useState<File>()
  const [thumbnail, setThumbnail] = useState<File>()
  const [fileData, setFileData] = useState<FileData>({
    title: "",
    description: "",
    visibility: "public",
  })

  const handleFile = (file: File) => {
    setFile(file)
  }
  const handleThumbnail = (file: File) => {
    setThumbnail(file)
  }
  const handleFileData = (file: FileData) => {
    setFileData(file)
  }
  const handleSave = () => {
    console.log({ fileData, file, thumbnail })
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
            <DialogClose render={<Button variant="outline">Close</Button>} />
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
