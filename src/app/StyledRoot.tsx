'use client';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/system';
import { Select } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9932cc', 
    },
    secondary: {
      main: '#2e2e2e', 
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

export const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',  
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',  
  },
  '& .MuiSelect-icon': {
      color: 'white', 
  },
}));