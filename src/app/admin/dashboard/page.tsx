'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box, Container, Typography, Tab, Tabs, Button, TextField,
  Card, CardContent, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Switch, FormControlLabel
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Data States
  const [content, setContent] = useState<any>({});
  const [sessionInfo, setSessionInfo] = useState<any>({});
  const [levels, setLevels] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Dialog States
  const [openLevelDialog, setOpenLevelDialog] = useState(false);
  const [currentLevel, setCurrentLevel] = useState<any>(null); 
  
  // Announcement Form State
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '', isActive: true });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contentRes, sessionRes, levelsRes, announcementsRes] = await Promise.all([
        fetch('/api/content'),
        fetch('/api/session'),
        fetch('/api/levels'),
        fetch('/api/announcements')
      ]);
      setContent(await contentRes.json());
      setSessionInfo(await sessionRes.json());
      setLevels(await levelsRes.json());
      setAnnouncements(await announcementsRes.json());
    } catch (e) {
      console.error(e);
      showSnackbar('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSaveContent = async (key: string, value: string) => {
    try {
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      showSnackbar('Content updated');
    } catch (e) {
      showSnackbar('Failed to update content', 'error');
    }
  };

  const handleSaveSession = async () => {
    try {
      await fetch('/api/session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionInfo),
      });
      showSnackbar('Session info updated');
    } catch (e) {
      showSnackbar('Failed to update session', 'error');
    }
  };

  const handleSaveLevel = async () => {
    const method = currentLevel.id ? 'PUT' : 'POST';
    const url = currentLevel.id ? `/api/levels/${currentLevel.id}` : '/api/levels';
    
    const body = {
        name: currentLevel.name,
        description: currentLevel.description,
        leaderName: currentLevel.leader?.name || currentLevel.leaderName,
        leaderBio: currentLevel.leader?.bio || currentLevel.leaderBio,
        leaderPhoto: currentLevel.leader?.photoUrl || currentLevel.leaderPhoto
    };

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      showSnackbar('Level saved');
      setOpenLevelDialog(false);
      fetchData();
    } catch (e) {
      showSnackbar('Failed to save level', 'error');
    }
  };

  const handleDeleteLevel = async (id: string) => {
    if (!confirm('Are you sure you want to delete this level?')) return;
    try {
      await fetch(`/api/levels/${id}`, { method: 'DELETE' });
      showSnackbar('Level deleted');
      fetchData();
    } catch (e) {
      showSnackbar('Failed to delete level', 'error');
    }
  };

  const handleCreateAnnouncement = async () => {
    try {
      await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnnouncement),
      });
      showSnackbar('Announcement created');
      setNewAnnouncement({ title: '', content: '', isActive: true });
      fetchData();
    } catch (e) {
      showSnackbar('Failed to create announcement', 'error');
    }
  };

  if (status === 'loading' || loading) return <Container sx={{ py: 4 }}><Typography>Loading...</Typography></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">Admin Dashboard</Typography>
        <Button variant="outlined" onClick={() => router.push('/')}>View Site</Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Content" />
          <Tab label="Session" />
          <Tab label="Levels" />
          <Tab label="Announcements" />
        </Tabs>
      </Box>

      {/* Content Tab */}
      <TabPanel value={tab} index={0}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <TextField
              fullWidth label="Hero Title"
              value={content.hero_title || ''}
              onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
              onBlur={() => handleSaveContent('hero_title', content.hero_title)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth label="Hero Subtitle"
              value={content.hero_subtitle || ''}
              onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
              onBlur={() => handleSaveContent('hero_subtitle', content.hero_subtitle)}
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth multiline rows={4} label="About Text"
              value={content.about_text || ''}
              onChange={(e) => setContent({ ...content, about_text: e.target.value })}
              onBlur={() => handleSaveContent('about_text', content.about_text)}
            />
          </Grid>
        </Grid>
      </TabPanel>

      {/* Session Tab */}
      <TabPanel value={tab} index={1}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth label="Day"
              value={sessionInfo.day || ''}
              onChange={(e) => setSessionInfo({ ...sessionInfo, day: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth label="Time Range"
              value={sessionInfo.timeRange || ''}
              onChange={(e) => setSessionInfo({ ...sessionInfo, timeRange: e.target.value })}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth label="Location"
              value={sessionInfo.location || ''}
              onChange={(e) => setSessionInfo({ ...sessionInfo, location: e.target.value })}
            />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" onClick={handleSaveSession}>Save Session</Button>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Levels Tab */}
      <TabPanel value={tab} index={2}>
        <Button startIcon={<AddIcon />} variant="contained" sx={{ mb: 2 }} onClick={() => { setCurrentLevel({}); setOpenLevelDialog(true); }}>
          Add Level
        </Button>
        <Grid container spacing={3}>
          {levels.map((level) => (
            <Grid size={{ xs: 12, md: 4 }} key={level.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{level.name}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>{level.description}</Typography>
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>Leader: {level.leader?.name}</Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => { setCurrentLevel(level); setOpenLevelDialog(true); }}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDeleteLevel(level.id)} color="error"><DeleteIcon /></IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Announcements Tab */}
      <TabPanel value={tab} index={3}>
        <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>Create New Announcement</Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField fullWidth label="Title" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} />
            </Grid>
            <Grid size={12}>
              <TextField fullWidth multiline rows={2} label="Content" value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})} />
            </Grid>
            <Grid size={12}>
              <FormControlLabel control={<Switch checked={newAnnouncement.isActive} onChange={(e) => setNewAnnouncement({...newAnnouncement, isActive: e.target.checked})} />} label="Active" />
            </Grid>
            <Grid size={12}>
              <Button variant="contained" onClick={handleCreateAnnouncement}>Post Announcement</Button>
            </Grid>
          </Grid>
        </Box>
        
        <Typography variant="h6" gutterBottom>Active Announcements</Typography>
        <Grid container spacing={2}>
            {announcements.map((ann) => (
                <Grid size={12} key={ann.id}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">{ann.title}</Typography>
                            <Typography variant="body2">{ann.content}</Typography>
                            <Typography variant="caption" color="text.secondary">{new Date(ann.createdAt).toLocaleDateString()}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
      </TabPanel>

      {/* Level Dialog */}
      <Dialog open={openLevelDialog} onClose={() => setOpenLevelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentLevel?.id ? 'Edit Level' : 'New Level'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense" label="Level Name" fullWidth
            value={currentLevel?.name || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, name: e.target.value })}
          />
          <TextField
            margin="dense" label="Description" fullWidth multiline rows={2}
            value={currentLevel?.description || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, description: e.target.value })}
          />
          <Typography variant="subtitle2" sx={{ mt: 2 }}>Leader Info</Typography>
          <TextField
            margin="dense" label="Leader Name" fullWidth
            value={currentLevel?.leader?.name || currentLevel?.leaderName || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderName: e.target.value, leader: { ...currentLevel?.leader, name: e.target.value } })}
          />
          <TextField
            margin="dense" label="Leader Bio" fullWidth
            value={currentLevel?.leader?.bio || currentLevel?.leaderBio || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderBio: e.target.value, leader: { ...currentLevel?.leader, bio: e.target.value } })}
          />
          <TextField
            margin="dense" label="Photo URL (Optional)" fullWidth
            value={currentLevel?.leader?.photoUrl || currentLevel?.leaderPhoto || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderPhoto: e.target.value, leader: { ...currentLevel?.leader, photoUrl: e.target.value } })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLevelDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveLevel} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}