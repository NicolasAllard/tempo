import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const user = useAuth();

  return (
    <div>
      <h1>Tempo: Dashboard!</h1>
      <span>Welcome {user.firstName}</span>
    </div>
  );
}
