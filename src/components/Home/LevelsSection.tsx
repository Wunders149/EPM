'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

interface Level {
  id: string;
  name: string;
  description: string;
  leader?: {
    name: string;
    bio: string | null;
    photoUrl: string | null;
  } | null;
}

interface LevelsProps {
  levels: Level[];
}

export default function LevelsSection({ levels }: LevelsProps) {
  return (
    <Box id="levels" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" align="center" gutterBottom color="primary">
          Our Levels
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph>
          Find the perfect group for your skill level.
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {levels.map((level) => (
            <Grid key={level.id} size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" color="primary">
                    {level.name}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {level.description}
                  </Typography>
                  
                  {level.leader && (
                    <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={level.leader.photoUrl || undefined} 
                        alt={level.leader.name}
                        sx={{ width: 56, height: 56, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Leader
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {level.leader.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {level.leader.bio}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
