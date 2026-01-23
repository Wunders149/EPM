'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'session', 'gallery', 'levels'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Schedule', href: '#session', id: 'session' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Levels', href: '#levels', id: 'levels' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" elevation={1} sx={{ top: 0, zIndex: 1100 }}>
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
          
          {navItems.map((item) => (
            <Button 
              key={item.id}
              color={activeSection === item.id ? 'primary' : 'inherit'} 
              component={Link} 
              href={item.href}
              sx={{
                fontWeight: activeSection === item.id ? 'bold' : 'normal',
                borderBottom: activeSection === item.id ? '3px solid' : 'none',
                borderColor: 'primary.main',
                pb: activeSection === item.id ? '6px' : '8px',
                transition: 'all 0.3s ease'
              }}
            >
              {item.label}
            </Button>
          ))}
          
          {session && (
            <Button color="primary" variant="contained" component={Link} href="/admin/dashboard" sx={{ ml: 2 }}>
              Dashboard
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
