'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

interface Announcement {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
}

interface AnnouncementsProps {
  announcements: Announcement[];
}

export default function AnnouncementsSection({ announcements }: AnnouncementsProps) {
  if (!announcements || announcements.length === 0) return null;

  return (
    <Box sx={{ py: 4, bgcolor: 'warning.light' }}>
      <Container maxWidth="md">
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Notices
        </Typography>
        {announcements.map((announcement) => (
          <Alert key={announcement.id} severity="info" sx={{ mb: 2 }}>
            <AlertTitle>{announcement.title}</AlertTitle>
            {announcement.content}
          </Alert>
        ))}
      </Container>
    </Box>
  );
}
