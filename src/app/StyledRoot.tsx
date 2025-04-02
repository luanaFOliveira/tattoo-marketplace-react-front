'use client';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#800080', 
    },
    secondary: {
      main: '#2c2c2c', 
    },
    background: {
      default: '#000000', 
    },
  },
  typography: {
    fontFamily: '"Geist", "Geist_Mono", Arial, sans-serif', 
  },
});

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}