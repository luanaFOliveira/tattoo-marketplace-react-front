'use client';

import { AuthProvider } from "@/presentation/context/AuthContext";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}