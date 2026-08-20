export const adminKeys = {
  all: ["admin"] as const,
  me: () => [...adminKeys.all, "me"] as const,
  dashboard: () => [...adminKeys.all, "dashboard"] as const,
}
