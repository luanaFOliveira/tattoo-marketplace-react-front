'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "next/link";
import { useAuth } from "@/presentation/context/AuthContext";  
import { useRouter } from 'next/navigation'
import StreamIcon from '@mui/icons-material/Stream';

const settings = ['Profile', 'Quotes', 'Logout'];

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth(); 
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: (theme) => theme.palette.secondary.main }}>
      <Box sx={{ width: '100%' }}>
        <Toolbar disableGutters>
          <StreamIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, ml:4 , color:"white"}} />
          <Typography
            variant="h6"
            noWrap
            component={Link} 
            href="/" 
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
           InkConnection
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , marginRight: 4 }}>
                  <Avatar alt={"User"} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user?.profilePicture}` || "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();
                    if (setting === "Logout"){
                      logout();
                      router.push("/");
                    }
                    if (setting === "Profile") router.push(`/user/${user?.id}`);
                    if (setting === "Quotes") router.push(`/quote/user/${user?.id}`);
                  }}>
                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                href="/login"
                variant="contained"
                sx={{
                  color: '#ffffff',
                  backgroundColor: (theme) => theme.palette.primary.main,
                  '&:hover': {
                    backgroundColor: '#b44ee6',
                  }
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                href="/signup"
                variant="contained"
                sx={{
                  backgroundColor: '#4b0082',
                  color: '#ffffff',
                  '&:hover': {
                    backgroundColor: '#5d1d9f',
                    color: '#ffffff'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Navbar;
