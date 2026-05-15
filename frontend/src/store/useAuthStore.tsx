// store/useAuthStore.ts
import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
