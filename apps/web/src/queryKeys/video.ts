export const videoKeys = {
  all: ["video"] as const,
  me: () => [...videoKeys.all, "me"] as const,
  detail: (id: string) => [...videoKeys.all, id] as const,
  reaction: (id: number) => [...videoKeys.all, "reaction", id] as const,
  myReaction: (id: number) => [...videoKeys.all, "reaction", id, "me"] as const,
}
