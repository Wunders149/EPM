'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        pt: 8,
        pb: 8,
        textAlign: 'center',
        backgroundImage: 'linear-gradient(45deg, #0288d1 30%, #26c6da 90%)',
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          color="inherit"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color="inherit" paragraph sx={{ opacity: 0.9 }}>
          {subtitle}
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" size="large" href="#session">
            Join Next Session
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
