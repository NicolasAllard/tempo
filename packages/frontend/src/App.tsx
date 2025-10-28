import "./App.css";
import { AuthLayout } from "./components/AuthLayout";
import { Index } from "./components/Index";
import { AuthProvider } from "./providers/AuthProvider";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useAuth } from "./hooks/useAuth";
import { Dashboard } from "./components/Dashboard";

const router = createBrowserRouter([
  {
    index: true,
    Component: Index,
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    Component: ProtectedRoute,
    children: [{ path: "dashboard", Component: Dashboard }],
  },
]);

function ProtectedRoute() {
  const user = useAuth();

  if (!user?.token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
