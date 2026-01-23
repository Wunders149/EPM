'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface AboutProps {
  text: string;
  communityPhoto?: string;
}

export default function About({ text, communityPhoto }: AboutProps) {
  return (
    <Box id="about" sx={{ py: 12, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'text.secondary', mb: 4 }}>
              {text}
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Box>
                <Typography variant="h4" color="secondary" fontWeight="bold">Free</Typography>
                <Typography variant="body2" fontWeight="bold">Education</Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="secondary" fontWeight="bold">Youth</Typography>
                <Typography variant="body2" fontWeight="bold">Driven</Typography>
              </Box>
              <Box>
                <Typography variant="h4" color="secondary" fontWeight="bold">5+ yrs</Typography>
                <Typography variant="body2" fontWeight="bold">Experience</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                height: 400, 
                bgcolor: '#e3f2fd', 
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #90caf9',
                overflow: 'hidden',
                backgroundImage: communityPhoto ? `url(${communityPhoto})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {!communityPhoto && <Typography color="primary" variant="h6" sx={{ opacity: 0.5 }}>[ Inspiring Community Photo ]</Typography>}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
