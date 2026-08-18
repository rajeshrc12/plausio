export const publicKeys = {
  all: ["public"] as const,
  movies: () => [...publicKeys.all, "movies"] as const,
  detail: (id: number) => [...publicKeys.all, "movie", id] as const,
}
