'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
        textAlign: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #01579b 0%, #0288d1 50%, #03a9f4 100%)',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -50,
          left: 0,
          right: 0,
          height: '100px',
          bgcolor: 'background.default',
          borderRadius: '50% / 100%',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      }}
    >
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h1"
          color="inherit"
          gutterBottom
          sx={{ 
            fontWeight: 900, 
            letterSpacing: '-1px',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            fontSize: { xs: '3rem', md: '4rem' }
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="h5" 
          color="inherit" 
          paragraph 
          sx={{ 
            opacity: 0.9, 
            maxWidth: '600px', 
            mx: 'auto',
            fontWeight: 300,
            mb: 4
          }}
        >
          {subtitle}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            href="#levels"
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', boxShadow: 3 }}
            startIcon={<PlayArrowIcon />}
          >
            Start Learning
          </Button>
          <Button 
            variant="outlined" 
            color="inherit" 
            size="large" 
            href="#about"
            sx={{ px: 4, border: '2px solid' }}
          >
            Our Story
          </Button>
        </Box>
      </Container>
    </Box>
  );
}