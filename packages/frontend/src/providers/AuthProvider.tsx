import { useState, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<AuthContextType, "setUser"> | null>(
    null
  );

  const value: AuthContextType | null = user
    ? { ...user, setUser }
    : { email: "", firstName: "", lastName: "", token: "", setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
