'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Image 
                src="/logo.png" 
                alt="EPM Logo" 
                width={40} 
                height={40}
                priority
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </Box>
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
