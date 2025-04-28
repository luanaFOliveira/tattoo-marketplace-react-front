import { Container, Box, Typography, Paper } from "@mui/material";
import SignUp from "@/presentation/pages/SignUp";
import AuthLayout from "@/presentation/pages/AuthLayout";

export default function SignUpPage() {
  return (
    <main>
      <AuthLayout content={<SignUp />} />
    </main>
  );
}
