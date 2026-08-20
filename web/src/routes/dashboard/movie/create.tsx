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
import { uploadFiles } from "@/services/upload"
import { useState } from "react"
import { createMovieJob } from "@/api/movie"
import { useNavigate } from "react-router"
import { Progress } from "@/components/ui/progress"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { genre } from "@/types/constant"
import Poster from "@/routes/dashboard/components/upload/poster"
const CreateMovie = () => {
  const navigate = useNavigate()
  const anchor = useComboboxAnchor()
  const form = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      description: "",
      director: "",
      publisher: "",
      year: 1900,
      starring: "",
      genre: [],
    },
  })
  const addMovie = useAddMovie()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const onSubmit = async (data: z.infer<typeof movieFormSchema>) => {
    try {
      setLoading(true)
      setProgress(1)

      const {
        movie,
        title,
        description,
        thumbnail,
        genre,
        director,
        starring,
        year,
        publisher,
        titleImage,
        poster,
      } = data

      const duration = await getMovieDuration(movie)

      const response = await addMovie.mutateAsync({
        title,
        description,
        fileName: movie.name,
        fileType: movie.type,
        fileSize: movie.size,
        duration,
        genre,
        director,
        starring,
        year,
        publisher,
        titleType: titleImage.type,
        posterType: poster.type,
        thumbnailType: thumbnail.type,
      })
      const files = [
        { url: response.thumbnailUrl, file: thumbnail, name: "thumbnail" },
        { url: response.titleUrl, file: titleImage, name: "title" },
        { url: response.posterUrl, file: poster, name: "poster" },
        { url: response.movieUrl, file: movie, name: "movie" },
      ]
      const upload = await uploadFiles({ files, setProgress: setProgress })
      if (upload.movie) {
        await createMovieJob({ id: response.id, type: movie.type })
      }
      navigate("/dashboard/movie")
      setLoading(false)
      setProgress(0)
    } catch (error) {
      console.error("Failed to add movie:", error)
    }
  }
  return (
    <div className="mx-auto w-full max-w-4xl px-10 py-8">
      <div className="mb-6 text-2xl font-bold">Add movie</div>

      <form id="form" onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          className="flex flex-col gap-10"

          disabled={loading}
        >
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="titleImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <Thumbnail
                        title="Title Image"
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
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Controller
                name="poster"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <Poster
                        title="Poster"
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

              <Controller
                name="director"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-director">Director</FieldLabel>
                    <Input
                      {...field}
                      id="form-director"
                      aria-invalid={fieldState.invalid}
                      placeholder="Movie director"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="publisher"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-publisher">Publisher</FieldLabel>
                    <Input
                      {...field}
                      id="form-publisher"
                      aria-invalid={fieldState.invalid}
                      placeholder="Movie publisher"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-year">Year</FieldLabel>

                    <Input
                      type="number"
                      id="form-year"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      aria-invalid={fieldState.invalid}
                      placeholder="Movie year"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="starring"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-starring">Cast</FieldLabel>
                    <Textarea
                      {...field}
                      id="form-starring"
                      placeholder="Movie cast"
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
                name="genre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-genre">Genre</FieldLabel>

                    <Combobox
                      multiple
                      autoHighlight
                      items={genre}
                      value={field.value ?? []}
                      onValueChange={field.onChange}
                    >
                      <ComboboxChips
                        ref={anchor}
                        id="form-genre"
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                      >
                        <ComboboxValue>
                          {(values) => (
                            <>
                              {values.map((value: string) => (
                                <ComboboxChip key={value}>{value}</ComboboxChip>
                              ))}
                              <ComboboxChipsInput />
                            </>
                          )}
                        </ComboboxValue>
                      </ComboboxChips>

                      <ComboboxContent anchor={anchor}>
                        <ComboboxEmpty>No genre found.</ComboboxEmpty>

                        <ComboboxList>
                          {(item) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {progress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Uploading files
                  </span>

                  <span className="text-sm font-medium tabular-nums">
                    {Math.round(progress)}%
                  </span>
                </div>

                <Progress value={progress} className="h-2" />
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit">
                {progress > 0 ? "Uploading..." : "Submit"}
              </Button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default CreateMovie
