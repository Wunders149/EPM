'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box, Container, Typography, Tab, Tabs, Button, TextField,
  Card, CardContent, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Snackbar, Alert, Switch, FormControlLabel,
  Paper, Divider, Chip
} from '@mui/material';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
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
        topic: currentLevel.topic,
        leaderName: currentLevel.leader?.name || currentLevel.leaderName,
        leaderBio: currentLevel.leader?.bio || currentLevel.leaderBio,
        leaderPhoto: currentLevel.leader?.photoUrl || currentLevel.leaderPhoto,
        leaderContact: currentLevel.leader?.contact || currentLevel.leaderContact
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed to save');
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

  if (status === 'loading' || loading) return <Container sx={{ py: 4 }}><Typography>Loading Admin...</Typography></Container>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f2f5' }}>
      <Paper elevation={0} sx={{ borderRadius: 0, bgcolor: 'primary.dark', color: 'white', py: 2, mb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LanguageIcon />
              <Typography variant="h5" fontWeight="900">EPM ADMIN</Typography>
            </Box>
            <Box>
              <Button color="inherit" onClick={() => router.push('/')} sx={{ mr: 2 }}>Site Home</Button>
              <Button color="error" variant="contained" startIcon={<LogoutIcon />} onClick={() => signOut()}>Logout</Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            <Tab label="Website Content" />
            <Tab label="Sunday Session" />
            <Tab label="Groups & Topics" />
            <Tab label="Alerts" />
          </Tabs>
        </Box>

        {/* Content Tab */}
        <TabPanel value={tab} index={0}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">Home Page Text</Typography>
            <Grid container spacing={4}>
              <Grid size={12}>
                <TextField
                  fullWidth label="Hero Title" variant="filled"
                  value={content.hero_title || ''}
                  onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
                  onBlur={() => handleSaveContent('hero_title', content.hero_title)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth label="Hero Subtitle" variant="filled"
                  value={content.hero_subtitle || ''}
                  onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
                  onBlur={() => handleSaveContent('hero_subtitle', content.hero_subtitle)}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth multiline rows={6} label="About EPM Description" variant="filled"
                  value={content.about_text || ''}
                  onChange={(e) => setContent({ ...content, about_text: e.target.value })}
                  onBlur={() => handleSaveContent('about_text', content.about_text)}
                />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Session Tab */}
        <TabPanel value={tab} index={1}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">General Schedule</Typography>
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
                  fullWidth label="Time (e.g. 3PM - 5PM)"
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
                <Button variant="contained" size="large" onClick={handleSaveSession}>Update Global Schedule</Button>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Levels Tab */}
        <TabPanel value={tab} index={2}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Learning Groups & Leaders</Typography>
            <Button startIcon={<AddIcon />} variant="contained" onClick={() => { setCurrentLevel({}); setOpenLevelDialog(true); }}>
              Add New Group
            </Button>
          </Box>
          <Grid container spacing={3}>
            {levels.map((level) => (
              <Grid size={{ xs: 12, md: 4 }} key={level.id}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h5" color="primary" fontWeight="bold">{level.name}</Typography>
                    <Box sx={{ my: 2, p: 1, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 1 }}>
                      <Typography variant="caption" display="block">CURRENT TOPIC:</Typography>
                      <Typography variant="body2" fontWeight="bold">{level.topic || 'No topic set'}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ height: '3em', overflow: 'hidden' }}>{level.description}</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2">Leader: {level.leader?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{level.leader?.contact || 'No contact info'}</Typography>
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
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom>New Alert</Typography>
                <TextField fullWidth label="Title" sx={{ mb: 2 }} value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})} />
                <TextField fullWidth multiline rows={3} label="Message" sx={{ mb: 2 }} value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})} />
                <FormControlLabel control={<Switch checked={newAnnouncement.isActive} onChange={(e) => setNewAnnouncement({...newAnnouncement, isActive: e.target.checked})} />} label="Display on Website" />
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCreateAnnouncement}>Publish Alert</Button>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h6" gutterBottom>Recent Alerts</Typography>
              {announcements.map((ann) => (
                <Card key={ann.id} sx={{ mb: 2, borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="subtitle1" fontWeight="bold">{ann.title}</Typography>
                      <Chip label={ann.isActive ? 'Active' : 'Hidden'} size="small" color={ann.isActive ? 'success' : 'default'} />
                    </Box>
                    <Typography variant="body2">{ann.content}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(ann.createdAt).toLocaleDateString()}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </TabPanel>
      </Container>

      {/* Level Dialog */}
      <Dialog open={openLevelDialog} onClose={() => setOpenLevelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          {currentLevel?.id ? 'Edit Learning Group' : 'Create Learning Group'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            margin="dense" label="Group Name (e.g. Beginner)" fullWidth
            value={currentLevel?.name || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, name: e.target.value })}
          />
          <TextField
            margin="dense" label="Group Description" fullWidth multiline rows={2}
            value={currentLevel?.description || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, description: e.target.value })}
          />
          <TextField
            margin="dense" label="CURRENT WEEKLY TOPIC" fullWidth sx={{ mt: 2 }}
            value={currentLevel?.topic || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, topic: e.target.value })}
            placeholder="e.g. Discussing the Future of AI"
          />
          
          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>LEADER ASSIGNMENT</Typography>
          <TextField
            margin="dense" label="Leader Name" fullWidth
            value={currentLevel?.leader?.name || currentLevel?.leaderName || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderName: e.target.value, leader: { ...currentLevel?.leader, name: e.target.value } })}
          />
          <TextField
            margin="dense" label="Leader Bio / Short Intro" fullWidth
            value={currentLevel?.leader?.bio || currentLevel?.leaderBio || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderBio: e.target.value, leader: { ...currentLevel?.leader, bio: e.target.value } })}
          />
          <TextField
            margin="dense" label="Leader Contact (Phone, FB, or Email)" fullWidth
            value={currentLevel?.leader?.contact || currentLevel?.leaderContact || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderContact: e.target.value, leader: { ...currentLevel?.leader, contact: e.target.value } })}
          />
          <TextField
            margin="dense" label="Leader Photo URL" fullWidth
            value={currentLevel?.leader?.photoUrl || currentLevel?.leaderPhoto || ''}
            onChange={(e) => setCurrentLevel({ ...currentLevel, leaderPhoto: e.target.value, leader: { ...currentLevel?.leader, photoUrl: e.target.value } })}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenLevelDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveLevel} variant="contained" size="large">Save Changes</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
