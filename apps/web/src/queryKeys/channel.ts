export const channelKeys = {
  all: ["channel"] as const,
  me: () => [...channelKeys.all, "me"] as const,
  detail: (handle: string) => [...channelKeys.all, handle] as const,
  subscriptionStatus: (id: number) => [...channelKeys.all, id] as const,
}
