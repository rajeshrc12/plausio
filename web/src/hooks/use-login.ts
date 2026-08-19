import { create } from "zustand"

interface LoginStore {
  dialog: boolean
  setDialog: (value: boolean) => void
}

const useLogin = create<LoginStore>((set) => ({
  dialog: false,

  setDialog: (value: boolean) => set({ dialog: value }),
}))

export default useLogin
