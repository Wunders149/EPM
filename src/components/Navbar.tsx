'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              EPM
            </Link>
          </Typography>
          <Button color="inherit" component={Link} href="#about">About</Button>
          <Button color="inherit" component={Link} href="#session">Schedule</Button>
          <Button color="inherit" component={Link} href="#gallery">Gallery</Button>
          <Button color="inherit" component={Link} href="#levels">Levels</Button>
          
          {session ? (
            <Button color="primary" variant="contained" component={Link} href="/admin/dashboard" sx={{ ml: 2 }}>
              Dashboard
            </Button>
          ) : (
            <Button color="primary" variant="outlined" component={Link} href="/auth/signin" sx={{ ml: 2 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
