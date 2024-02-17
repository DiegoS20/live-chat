import { create } from "zustand";
import { persist } from "zustand/middleware";

type TUserStore = {
  jwt?: string;
  setJWT: (jwt: string) => any;
};

const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      jwt: undefined,
      setJWT: (jwt?: string) => set({ jwt }),
    }),
    {
      name: "jwt",
    }
  )
);

export default function useAuth() {
  const { jwt } = useUserStore((state) => state);

  const login = () => {};

  const logout = () => {};

  return {
    login,
    logout,
    isAuthorized: !!jwt,
  };
}
