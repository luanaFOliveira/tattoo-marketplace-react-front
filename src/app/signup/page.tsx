import { Container, Box, Typography, Paper } from "@mui/material";
import SignUpForm from "../../presentation/components/SignUpForm";

export default function SignUpPage() {
  return (
    <main>
      <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Paper sx={{ width: "100%", padding: 4, boxShadow: 3, borderRadius: 2 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Criar Conta
            </Typography>
          </Box>
          <SignUpForm />
        </Paper>
      </Container>
    </main>
  );
}
