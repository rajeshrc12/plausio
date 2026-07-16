import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"

import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"
import FileDropzone from "@/components/file-dropzone"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { useAddVideo } from "@/mutations/video"
import { Loader } from "lucide-react"
import { toast } from "@workspace/ui/components/sonner"

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  video: z.instanceof(File),
  thumbnail: z.instanceof(File),
})

type FormValues = z.infer<typeof schema>

const UploadVideo = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      visibility: "PUBLIC",
    },
  })
  const addVideo = useAddVideo()
  const onSubmit = async (values: FormValues) => {
    const { name, type, size } = values.video
    const { title, description, visibility, thumbnail } = values
    const response = await addVideo.mutateAsync({
      videoFile: values.video,
      thumbnailFile: thumbnail,
      videoData: {
        name,
        type,
        size,
        visibility,
        title,
        description,
        duration: 0,
      },
      thumbnailData: {
        name: thumbnail.name,
        type: thumbnail.type,
        size: thumbnail.size,
      },
    })
    if (response) toast.success("Video upload complete")
    else toast.error("Video upload failed")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={addVideo.isPending} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-3">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>

                  <FieldContent>
                    <Input {...field} placeholder="Video title" />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>

                  <FieldContent>
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="Video description"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="visibility"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Visibility</FieldLabel>

                  <FieldContent>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="PUBLIC">Public</SelectItem>
                        <SelectItem value="PRIVATE">Private</SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
            <Controller
              name="thumbnail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="h-30 w-40">
                  <FieldLabel>Thumbnail</FieldLabel>

                  <FieldContent>
                    <FileDropzone
                      value={field.value}
                      onChange={field.onChange}
                      accept={{ "image/*": [] }}
                      label="Drop a thumbnail"
                    />
                    {fieldState.invalid && "Select thumbnail"}
                  </FieldContent>
                </Field>
              )}
            />
          </div>

          {/* Right Side */}
          <div className="flex">
            <Controller
              name="video"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex w-full flex-col"
                >
                  <FieldLabel>Video</FieldLabel>

                  <FieldContent>
                    <FileDropzone
                      value={field.value}
                      onChange={field.onChange}
                      accept={{ "video/*": [] }}
                      label="Drag & drop a video or click"
                    />

                    {fieldState.invalid && "Select video"}

                    {field.value && (
                      <div className="mt-3 rounded-md border bg-muted/30 p-3 text-sm">
                        <div className="truncate font-medium">
                          Name: {field.value.name}
                        </div>
                        <div className="mt-1 text-muted-foreground">
                          size: {(field.value.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB
                        </div>
                      </div>
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>
        </div>

        <Button className={"float-right"} type="submit">
          {addVideo.isPending ? <Loader className="animate-spin" /> : "Save"}
        </Button>
      </fieldset>
    </form>
  )
}
export default UploadVideo
