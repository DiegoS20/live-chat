import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as loginService } from "@/services/users";

type TUserStore = {
  jwt: string;
  setJWT: (jwt: string) => any;
};

const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      jwt: "",
      setJWT: (jwt: string) => set({ jwt }),
    }),
    {
      name: "jwt",
    }
  )
);

export default function useAuth() {
  const { jwt, setJWT } = useUserStore((state) => state);

  const login = async (email: string, password: string) => {
    const token = await loginService(email, password);
    if (token !== false) setJWT(token);

    return typeof token == "string";
  };

  return {
    login,
    logout: () => setJWT(""),
    isAuthorized: !!jwt,
  };
}
