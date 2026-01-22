'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TodayIcon from '@mui/icons-material/Today';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

interface Level {
  id: string;
  name: string;
  topic?: string | null;
}

interface SessionProps {
  session: {
    day: string;
    timeRange: string;
    location: string;
  } | null;
  levels: Level[];
}

export default function SessionSection({ session, levels }: SessionProps) {
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
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="h5" color="primary" fontWeight="900" sx={{ mb: 2 }}>
                SESSION DETAILS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TodayIcon color="secondary" sx={{ mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">{session.day}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeFilledIcon color="secondary" sx={{ mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">{session.timeRange}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon color="secondary" sx={{ mr: 2 }} />
                  <Typography variant="h6" fontWeight="bold">{session.location}</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" color="primary" fontWeight="900" sx={{ mb: 2 }}>
                GROUPS & TOPICS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {levels.map((level, idx) => (
                  <Box key={level.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip label={level.name} variant="outlined" color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                      <Typography variant="body2" color="text.secondary">Starting @ {session.timeRange.split('–')[0].trim()}</Typography>
                    </Box>
                    <Typography variant="subtitle1" fontWeight="500">
                      {level.topic || 'Topic will be announced soon'}
                    </Typography>
                    {idx < levels.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}