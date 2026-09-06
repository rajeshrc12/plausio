export const messageKeys = {
  all: ["message"] as const,
  messages: (id: number) => [...messageKeys.all, "messages", id] as const,
}
