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
import { registerAccount, type RegisterBody } from "../api/auth";

export function Register() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const register = async (props: RegisterBody) => {
    setIsLoading(true);
    const response = await registerAccount(props);
    if (!response.success) {
      setError(response.message);
    } else {
      navigate("/auth/login");
    }
    setIsLoading(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formFields = Object.fromEntries(new FormData(event.currentTarget));

    const { confirmPassword, ...requiredFields } = formFields;

    if (confirmPassword != requiredFields.password) {
      setError("Password missmatch.");
      return;
    }

    setError("");

    register(requiredFields as RegisterBody);
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
              Register
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
                name="firstName"
                label="First name"
                type="text"
                fullWidth
                required
              />
              <TextField
                name="lastName"
                label="Last name"
                type="text"
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
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                required
              />
              <Link variant="caption" href="/auth/login">
                Already signed up?
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
