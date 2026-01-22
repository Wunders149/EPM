'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import Grid from '@mui/material/Grid';

interface SessionProps {
  session: {
    day: string;
    timeRange: string;
    location: string;
  } | null;
}

export default function SessionSection({ session }: SessionProps) {
  if (!session) return null;

  return (
    <Box id="session" sx={{ py: 6, mt: -6, position: 'relative', zIndex: 10 }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={10} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 6, 
            bgcolor: 'white',
            border: '1px solid #e0e0e0'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h5" color="primary" fontWeight="900" sx={{ mb: { xs: 2, md: 0 } }}>
                NEXT SESSION
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                justifyContent: 'space-between', 
                gap: 4 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TodayIcon color="secondary" sx={{ mr: 2, fontSize: 30 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">DATE</Typography>
                    <Typography variant="h6" fontWeight="bold">{session.day}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeFilledIcon color="secondary" sx={{ mr: 2, fontSize: 30 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">TIME</Typography>
                    <Typography variant="h6" fontWeight="bold">{session.timeRange}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon color="secondary" sx={{ mr: 2, fontSize: 30 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" fontWeight="bold">LOCATION</Typography>
                    <Typography variant="h6" fontWeight="bold">{session.location}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
