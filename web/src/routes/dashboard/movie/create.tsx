import Thumbnail from "@/routes/dashboard/components/upload/thumbnail"
import Movie from "@/routes/dashboard/components/upload/movie"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { movieFormSchema } from "@/types/schema"
import { useAddMovie } from "@/mutation/movie"
import { getMovieDuration } from "@/utils/movie"

const CreateMovie = () => {
  const form = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })
  const addMovie = useAddMovie()
  const onSubmit = async (data: z.infer<typeof movieFormSchema>) => {
    try {
      const { movie, title, description } = data
      const { name: fileName, type: fileType, size: fileSize } = movie

      const duration = await getMovieDuration(movie)

      await addMovie.mutateAsync({
        title,
        description,
        fileName,
        fileType,
        fileSize,
        duration,
      })
    } catch (error) {
      console.error("Failed to add movie:", error)
    }
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-10 py-8">
      <div className="mb-6 text-2xl font-bold">Add movie</div>

      <form
        className="flex flex-col gap-6"
        id="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <fieldset disabled={addMovie.isPending}>
          <div className="grid h-70 grid-cols-1 gap-6 md:grid-cols-2">
            <Controller
              name="thumbnail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <Thumbnail
                      value={field.value}
                      onChange={field.onChange}
                      accept={{ "image/*": [] }}
                      label="Drop file here"
                    />
                    {fieldState.invalid && fieldState.error?.message}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="movie"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <Movie
                      value={field.value}
                      onChange={field.onChange}
                      accept={{ "video/*": [] }}
                      label="Drop file here"
                    />
                    {fieldState.invalid && fieldState.error?.message}
                  </FieldContent>
                </Field>
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
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
                  <FieldLabel htmlFor="form-description">
                    Description
                  </FieldLabel>
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
          </div>

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default CreateMovie
