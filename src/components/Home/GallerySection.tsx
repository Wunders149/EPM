'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';

interface GalleryItem {
  id: string;
  type: string;
  url: string;
  caption?: string | null;
}

interface GalleryProps {
  items: GalleryItem[];
}

export default function GallerySection({ items }: GalleryProps) {
  const videos = items.filter(item => item.type === 'VIDEO');
  const photos = items.filter(item => item.type === 'PHOTO');

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <Box id="gallery" sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom color="primary" fontWeight="bold">
          EPM Gallery
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Relive our past sessions and listen to our anthem.
        </Typography>

        {/* Video Section */}
        {videos.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>Community Anthem & Videos</Typography>
            <Grid container spacing={4}>
              {videos.map((video) => {
                const videoId = getYoutubeId(video.url);
                return (
                  <Grid key={video.id} size={{ xs: 12, md: 12 }}>
                    <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: 'black' }}>
                      <Box sx={{ position: 'relative', pt: '56.25%' /* 16:9 */ }}>
                        {videoId ? (
                          <iframe
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={video.caption || "YouTube video player"}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <Box sx={{ position: 'absolute', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', color: 'white' }}>
                            Invalid YouTube URL
                          </Box>
                        )}
                      </Box>
                    </Paper>
                    {video.caption && <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}>{video.caption}</Typography>}
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Photos Section */}
        {photos.length > 0 && (
          <Box>
            <Typography variant="h5" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>Past Session Photos</Typography>
            <Grid container spacing={3}>
              {photos.map((photo) => (
                <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card sx={{ borderRadius: 4, overflow: 'hidden', height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={photo.url}
                      alt={photo.caption || 'Session photo'}
                    />
                    {photo.caption && (
                      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <Typography variant="body2" color="text.secondary">{photo.caption}</Typography>
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
