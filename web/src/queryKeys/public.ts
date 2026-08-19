export const publicKeys = {
  all: ["public"] as const,
  movies: (filters: string[]) =>
    [...publicKeys.all, "movies", { filters: [...filters].sort() }] as const,
  detail: (id: number) => [...publicKeys.all, "movie", id] as const,
}
