import { connectorFormSchema } from "@/types/schema"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useAddConnector } from "@/mutation/connector"
import { useNavigate } from "react-router"
import { uploadFiles } from "@/services/upload"
import { useState } from "react"
import { createJob } from "@/api/celery"

const Create = () => {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const form = useForm<z.infer<typeof connectorFormSchema>>({
    resolver: zodResolver(connectorFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  const addConnector = useAddConnector()
  const onSubmit = async (data: z.infer<typeof connectorFormSchema>) => {
    setProgress(1)
    const { title, description, file } = data
    const connector = await addConnector.mutateAsync({
      name: file.name,
      type: file.type,
      title,
      description,
    })
    const upload = await uploadFiles({
      url: connector.url,
      file,
      setProgress: setProgress,
    })
    const job = await createJob({ id: connector.id, type: connector.type })

    if (upload && job.id) {
      navigate("/app/connector")
    }
  }
  return (
    <div className="mx-auto w-full max-w-4xl px-10 py-8">
      <div className="mb-6 text-2xl font-bold">Add connector</div>

      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-10" disabled={progress !== 0}>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Movie title"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-description">Description</FieldLabel>
                <Textarea
                  {...field}
                  id="form-description"
                  placeholder="Movie description"
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="file"
            control={form.control}
            render={({ field: { onChange, name, ref }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-file">File</FieldLabel>

                <Input
                  ref={ref}
                  name={name}
                  id="form-file"
                  type="file"
                  accept="application/pdf"
                  aria-invalid={fieldState.invalid}
                  onChange={(event) => {
                    onChange(event.target.files?.[0] ?? null)
                  }}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">
              {progress > 0 ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default Create
