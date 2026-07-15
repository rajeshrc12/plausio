import { useEffect } from "react"
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

const UploadDialog = () => {
  const cleanup = () => {}
  useEffect(() => {
    return cleanup
  }, [])
  return (
    <Dialog onOpenChange={cleanup}>
      <DialogTrigger
        render={
          <Button variant={"outline"} className="h-10 w-10 rounded-full">
            <Upload className="h-6! w-6!" />
          </Button>
        }
      />
      <DialogContent className={"max-w-200!"}>
        <DialogHeader>
          <DialogTitle>Upload file</DialogTitle>
        </DialogHeader>
        <div className="sidebar-scrollbar max-h-[70vh] overflow-y-auto px-4">
          Hi
        </div>
        <DialogFooter className="bg-background px-4">
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadDialog
