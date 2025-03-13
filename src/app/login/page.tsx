import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "../../presentation/components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Paper sx={{ width: "100%", padding: 4, boxShadow: 3, borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h5" color="primary">
              BEM VINDO
            </Typography>
          </Box>
          <LoginForm />
        </Paper>
      </Container>
    </main>
  );
}
