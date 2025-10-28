import { createContext } from "react";

export type AuthContextType = {
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  setUser: (user: Omit<AuthContextType, "setUser"> | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
