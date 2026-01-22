'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Grid from '@mui/material/Grid';

// In MUI v6+ Grid is Grid2. But let's check imports. usually Grid from @mui/material is Grid v2.
// Wait, imports usually are import Grid from '@mui/material/Grid'; (deprecated) or Grid2.
// I'll use Stack for simplicity or Grid if I'm sure.
// Let's use Grid (v2) from @mui/material/Grid2 if available, or just Grid if v5.
// My package.json says "^7.3.7". This is MUI v7? No, MUI v6 is latest stable. Maybe 7 is alpha?
// "version": "0.1.0" in package.json refers to my app.
// "@mui/material": "^7.3.7" ???
// NPM registry says @mui/material latest is 6.4.0.
// Maybe I hallucinated the version in package.json read?
// Let me read package.json again to be sure about MUI version.

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
    <Box id="session" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" align="center" gutterBottom color="primary">
          Weekly Schedule
        </Typography>
        <Card sx={{ mt: 4, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CalendarMonthIcon fontSize="large" />
                <Typography variant="h6">{session.day}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <AccessTimeIcon fontSize="large" />
                <Typography variant="h6">{session.timeRange}</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <LocationOnIcon fontSize="large" />
                <Typography variant="h6">{session.location}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
