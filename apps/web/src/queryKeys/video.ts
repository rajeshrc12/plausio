export const videoKeys = {
  all: ["video"] as const,
  me: () => [...videoKeys.all, "me"] as const,
  detail: (id: string) => [...videoKeys.all, id] as const,
}
