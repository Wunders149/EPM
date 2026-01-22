'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CampaignIcon from '@mui/icons-material/Campaign';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!announcements || announcements.length === 0) return null;

  return (
    <Box sx={{ py: 4, background: 'linear-gradient(90deg, #fff 0%, #fff9c4 50%, #fff 100%)' }}>
      <Container maxWidth="md">
        {announcements.map((ann) => (
          <Paper 
            key={ann.id}
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 2, 
              borderRadius: 4, 
              border: '2px solid',
              borderColor: 'warning.main',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '6px',
                bgcolor: 'warning.main'
              }
            }}
          >
            <CampaignIcon color="warning" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6" fontWeight="bold" color="warning.dark">
                {ann.title}
              </Typography>
              <Typography variant="body1">
                {ann.content}
              </Typography>
              {mounted && (
                <Typography variant="caption" color="text.secondary">
                  Posted on {new Date(ann.createdAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Container>
    </Box>
  );
}
