'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TopicIcon from '@mui/icons-material/Topic';
import EventIcon from '@mui/icons-material/Event';

interface Level {
  id: string;
  name: string;
  description: string;
  topic?: string | null;
  topicDate?: string | null;
  leader?: {
    name: string;
    bio: string | null;
    photoUrl: string | null;
    contact?: string | null;
  } | null;
}

interface LevelsProps {
  levels: Level[];
}

export default function LevelsSection({ levels }: LevelsProps) {
  return (
    <Box id="levels" sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom color="primary" fontWeight="bold">
          Our Learning Groups
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Choose the level that matches your journey.
        </Typography>
        
        <Grid container spacing={4}>
          {levels.map((level) => (
            <Grid key={level.id} size={{ xs: 12, md: 4 }}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                },
                borderRadius: 4,
                overflow: 'visible'
              }}>
                <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <Chip 
                      label={level.name} 
                      color="primary" 
                      sx={{ 
                        position: 'absolute', 
                        top: -55, 
                        left: 0, 
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        px: 1
                      }} 
                    />
                    <Typography variant="body1" color="text.secondary" sx={{ minHeight: '3em' }}>
                      {level.description}
                    </Typography>
                  </Box>

                  {level.topic && (
                    <Box sx={{ mb: 4, p: 2, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TopicIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                          <Typography variant="subtitle2" fontWeight="bold">Today&apos;s Topic</Typography>
                        </Box>
                        {level.topicDate && (
                          <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.2)', px: 1, borderRadius: 1 }}>
                            <EventIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                            <Typography variant="caption" fontWeight="bold">{level.topicDate}</Typography>
                          </Box>
                        )}
                      </Box>
                      <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
                        {level.topic}
                      </Typography>
                    </Box>
                  )}
                  
                  {level.leader && (
                    <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid #eee' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={level.leader.photoUrl || undefined} 
                          alt={level.leader.name}
                          sx={{ width: 60, height: 60, mr: 2, border: '3px solid white', boxShadow: 2 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" color="primary" fontWeight="bold">
                            Level Leader
                          </Typography>
                          <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                            {level.leader.name}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {level.leader.contact && (
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                          <ContactSupportIcon sx={{ mr: 1, fontSize: '1rem' }} />
                          <Typography variant="body2" fontWeight="medium">
                            {level.leader.contact}
                          </Typography>
                        </Box>
                      )}
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
