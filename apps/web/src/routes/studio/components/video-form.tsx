import { useCallback, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { ImagePlus } from "lucide-react"

import { Button } from "@workspace/ui/components/button"
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
import { useAddVideo } from "@/mutations/video"

type FormValues = {
  title: string
  description: string
  visibility: "PUBLIC" | "PRIVATE"
  thumbnail: File | null
}

const VideoForm = ({ file }: { file: File }) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      visibility: "PUBLIC",
      thumbnail: null,
    },
  })
  const [thumbnailPreview, setThumbnailPreview] = useState<string>()
  const addVideo = useAddVideo()
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]

      if (!file) return

      setValue("thumbnail", file, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })

      setThumbnailPreview(URL.createObjectURL(file))
    },
    [setValue]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  })

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview)
      }
    }
  }, [thumbnailPreview])

  const onSubmit = (data: FormValues) => {
    const { name, type, size } = file
    const { title, description, visibility } = data
    addVideo.mutate({
      name,
      type,
      size,
      title,
      description,
      visibility,
      duration: 0,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col gap-2 p-2"
    >
      <div>Title</div>

      <Input
        placeholder="Video title"
        {...register("title", {
          required: "Title is required",
        })}
      />

      {errors.title && (
        <p className="text-sm text-red-500">{errors.title.message}</p>
      )}

      <div>Description</div>

      <Textarea
        rows={4}
        placeholder="Tell viewers about your video"
        className="field-sizing-fixed resize-none"
        {...register("description", { required: "Description is required" })}
      />
      {errors.description && (
        <p className="text-sm text-red-500">{errors.description.message}</p>
      )}
      <div>Visibility</div>

      <Controller
        name="visibility"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="PUBLIC">public</SelectItem>
                <SelectItem value="PRIVATE">private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      <div>
        <h3 className="text-xl font-semibold">Thumbnail</h3>

        <Controller
          name="thumbnail"
          control={control}
          rules={{
            required: "Thumbnail is required",
          }}
          render={() => (
            <>
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

              {errors.thumbnail && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.thumbnail.message}
                </p>
              )}
            </>
          )}
        />
      </div>
      <div className="relative left-84 flex justify-end">
        <Button disabled={addVideo.isPending} type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default VideoForm
