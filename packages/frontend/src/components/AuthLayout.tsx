import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <h1>
      Tempo: AuthLayout!
      <Outlet />
    </h1>
  );
}
