export const chatConnectorKeys = {
  all: ["chatConnector"] as const,
  connectors: (id: number) =>
    [...chatConnectorKeys.all, "connectors", id] as const,
}
