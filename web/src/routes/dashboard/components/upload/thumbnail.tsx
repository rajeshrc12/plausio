import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

const Thumbnail = ({
  title = "Thumbnail",
  value,
  onChange,
  accept,
  label,
}: {
  title?: string
  value?: File
  onChange: (file?: File) => void
  accept: Record<string, string[]>
  label: string
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    accept,
    noClick: true, // we'll control opening manually
    onDrop: (files) => {
      if (files[0]) onChange(files[0])
    },
  })
  const [previewUrl, setPreviewUrl] = useState<string>()

  useEffect(() => {
    if (!value) {
      setPreviewUrl(undefined)
      return
    }

    const url = URL.createObjectURL(value)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [value])
  return (
    <div className="flex h-50 flex-col gap-2">
      <div className="flex items-center gap-2">
        <div>{title}</div>
        {previewUrl && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-3 w-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onChange(undefined) // Delete
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
      {previewUrl ? (
        <img
          onClick={(e) => e.stopPropagation()}
          src={previewUrl}
          alt={value?.name}
          className="h-50 rounded object-cover"
        />
      ) : (
        <div
          className="flex h-50 cursor-pointer items-center justify-center rounded border border-dashed"
          {...getRootProps()}
          onClick={open}
        >
          <input {...getInputProps()} />
          <p>{label}</p>
        </div>
      )}
    </div>
  )
}

export default Thumbnail
