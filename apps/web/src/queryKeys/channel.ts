export const channelKeys = {
  all: ["channel"] as const,
  me: () => [...channelKeys.all, "me"] as const,
  detail: (handle: string) => [...channelKeys.all, handle] as const,
}
