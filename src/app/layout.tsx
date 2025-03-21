import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ToastProvider from "./ToastProvider";
import ClientAuthProvider from "./ClientAuthProvider";
import Navbar from "@/presentation/components/Navbar"; 
import { Container } from "@mui/material";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tattoo Marketplace",
  description: "Encontre os melhores tatuadores perto de você!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppRouterCacheProvider>
          <ToastProvider>
            <ClientAuthProvider>
              <Navbar /> 
              <Container maxWidth="xl" sx={{ marginTop: 5 }}>
                {children} 
              </Container>
            </ClientAuthProvider>
          </ToastProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
