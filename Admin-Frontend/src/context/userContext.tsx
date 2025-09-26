import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../data/data";
import { UserContext } from "../hooks/useUser";
import type { IUser } from "../@types/interface";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const refreshUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_DOMAIN}/api/v1/users/my-account`, {
        withCredentials: true,
      });
      setUser(res.data.data);
      return res.data.data;
    } catch (e) {
      setUser(null);

      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        console.error(err.response?.data?.message ?? "Login failed.");
      } else if (e instanceof Error) {
        console.error(e.message);
      }

      return null;
    }
  };

  return (
    <UserContext.Provider value={{ user, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
