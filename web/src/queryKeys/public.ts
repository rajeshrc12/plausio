export const publicKeys = {
  all: ["public"] as const,
  movies: () => [...publicKeys.all, "movies"] as const,
}
