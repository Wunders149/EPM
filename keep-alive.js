// Keep Render service awake by pinging every 5 minutes
// This prevents the free tier from auto-sleeping after inactivity

const http = require('http');
const https = require('https');

const APP_URL = process.env.APP_URL || 'https://epm-web.onrender.com';
const INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function ping() {
  const protocol = APP_URL.startsWith('https') ? https : http;
  
  protocol.get(APP_URL, (res) => {
    console.log(`${new Date().toISOString()}: Pinged ${APP_URL} - Status ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`${new Date().toISOString()}: Error pinging ${APP_URL}`, err.message);
  });
}

// Initial ping
console.log(`Keep-alive service started. Pinging ${APP_URL} every 5 minutes.`);
ping();

// Schedule pings every 5 minutes
setInterval(ping, INTERVAL_MS);

// Keep the process running
process.on('SIGTERM', () => {
  console.log('Keep-alive service stopping...');
  process.exit(0);
});
