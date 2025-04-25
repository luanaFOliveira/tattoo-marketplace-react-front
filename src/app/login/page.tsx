import { Container, Box, Typography, Paper } from "@mui/material";
import LoginForm from "../../presentation/components/LoginForm";
import BaseHomePage from "@/presentation/pages/BaseHomePage";
export default function LoginPage() {
  return (
    <main>
        <BaseHomePage content={<LoginForm />} />
    </main>
  );
}
