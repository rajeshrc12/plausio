export const movieKeys = {
  all: ["movie"] as const,
  movies: () => [...movieKeys.all, "movies"] as const,
}
