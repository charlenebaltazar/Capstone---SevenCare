import { createContext, useContext } from "react";
import type { IUser } from "../@types/interface";

export type UserContextType = {
  user: IUser | null;
  refreshUser: () => Promise<IUser | null>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};