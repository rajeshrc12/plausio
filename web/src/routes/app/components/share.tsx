import { useState } from "react"
import { Check, Copy, Forward, Link2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { env } from "@/config/env"

type ShareProps = {
  id: number
}

const Share = ({ id }: ShareProps) => {
  const [copied, setCopied] = useState(false)

  const videoUrl = `${env.WEB_URL}/watch?v=${id}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Failed to copy link:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-medium transition-colors hover:bg-accent/80">
        <Forward className="size-4" />
        <span>Share</span>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="items-center text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10">
            <Link2 className="size-7 text-primary" />
          </div>

          <DialogTitle>Share this video</DialogTitle>

          <DialogDescription>
            Anyone with this link can watch the video.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 rounded-xl border bg-muted/40 p-3">
          <div className="flex items-center gap-3">
            <span className="flex-1 truncate text-sm text-muted-foreground">
              {videoUrl}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {copied && (
          <p className="mt-3 text-center text-sm font-medium">
            Link copied to clipboard!
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Share
