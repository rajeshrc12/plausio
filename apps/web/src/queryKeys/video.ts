export const videoKeys = {
  all: ["videos"] as const,

  myVideos: () => [...videoKeys.all, "myVideos"] as const,
}
