import {
  Card,
  CardHeader,
  Typography,
  CardContent,
  Stack,
  TextField,
  Button,
} from "@mui/material";

export function Login() {
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
          <form>
            <Stack spacing={2}>
              <TextField label="Email" type="email" fullWidth required />
              <TextField label="Password" type="password" fullWidth required />
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </h1>
  );
}
