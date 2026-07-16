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

const UploadDialog = () => {
  return (
    <Dialog disablePointerDismissal={true}>
      <DialogTrigger
        render={
          <Button variant={"outline"} className="h-10 w-10 rounded-full">
            <Upload className="h-6! w-6!" />
          </Button>
        }
      />
      <DialogContent className={"h-[80vh] max-w-200! overflow-y-auto"}>
        <DialogHeader>
          <DialogTitle className={"text-2xl"}>Upload video</DialogTitle>
        </DialogHeader>
        <UploadVideo />
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
