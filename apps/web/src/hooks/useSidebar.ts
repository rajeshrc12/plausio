import { create } from "zustand"

interface SidebarStore {
  appSidebar: boolean
  setAppSidebar: (value: boolean) => void
}

export const useSidebar = create<SidebarStore>((set) => ({
  appSidebar: true,
  setAppSidebar: (value) => set({ appSidebar: value }),
}))
