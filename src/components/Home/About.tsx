'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

interface AboutProps {
  text: string;
}

export default function About({ text }: AboutProps) {
  return (
    <Box id="about" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
            About EPM
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {text}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
