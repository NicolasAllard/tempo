import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Stack,
  TextField,
  Button,
  Alert,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { loginAccount, type LoginBody } from "../api/auth";

export function Login() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const login = async (props: LoginBody) => {
    setIsLoading(true);
    const response = await loginAccount(props);
    if (!response.success) {
      setError(response.message);
    } else {
      if (!response.user) {
        setError("An unexpected error occured");
        return;
      }

      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formFields = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as LoginBody;

    setError("");
    login(formFields);
  };
  return (
    <h1>
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          mx: "auto",
          mt: 8,
          p: 2,
          boxShadow: 3,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" align="center">
              Login
            </Typography>
          }
          sx={{ mb: 2 }}
        />
        <CardContent>
          <form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                required
              />
              <Link variant="caption" href="/auth/register">
                Don't have an account?
              </Link>
              {error && <Alert color="error">{error}</Alert>}
              <Button
                type="submit"
                disabled={isLoading}
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </h1>
  );
}
