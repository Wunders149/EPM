'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          English Practice Mahajanga
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Community, Growth, and Opportunity.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 3 }}>
          <Link href="https://facebook.com/EPM.EnglishClub/" target="_blank" underline="hover" color="primary">
            Facebook
          </Link>
          <Typography color="text.secondary">•</Typography>
          <Link href="/auth/signin" underline="hover" color="primary">
            Admin Login
          </Link>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://facebook.com/EPM.EnglishClub/">
            EPM
          </Link>{' '}
          {year || '...'}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}