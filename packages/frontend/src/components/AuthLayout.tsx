import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export function AuthLayout() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged in already
    if (user.token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <h1>
      Tempo: AuthLayout!
      <Outlet />
    </h1>
  );
}
