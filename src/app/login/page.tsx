import LoginForm from "../../presentation/components/LoginForm";
import AuthLayout from "@/presentation/pages/AuthLayout";
export default function LoginPage() {
  return (
    <main>
        <AuthLayout content={<LoginForm />} />
    </main>
  );
}
