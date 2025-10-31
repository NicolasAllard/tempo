import { useState, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";

function tokenValidatedUser(
  user: Omit<AuthContextType, "setUser">
): Omit<AuthContextType, "setUser"> | null {
  const decoded = jwtDecode(user.token);
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const notExpired = decoded.exp && decoded.exp > nowInSeconds;

  if (notExpired) {
    return user;
  } else {
    // Clear session storage
    sessionStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const cachedUser = sessionStorage.getItem("user");
  const [user, setUser] = useState<Omit<AuthContextType, "setUser"> | null>(
    cachedUser ? tokenValidatedUser(JSON.parse(cachedUser)) : null
  );

  const value: AuthContextType | null = user
    ? { ...user, setUser }
    : { email: "", firstName: "", lastName: "", token: "", setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
