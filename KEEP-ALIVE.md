# Keep-Alive Service for Render Free Tier

This directory contains scripts to keep your Render free tier service awake and prevent auto-sleep after 15 minutes of inactivity.

## Problem
Render free tier services automatically sleep after ~15 minutes of inactivity, causing:
- Slow cold start times (30-60 seconds)
- Occasional timeout errors
- Poor user experience

## Solution
Run a keep-alive service that pings your app every 5 minutes to keep it active.

## Setup Options

### Option 1: Node.js Script (Recommended)

**Requirements:**
- Node.js installed
- PM2 (optional, but recommended for production)

**Quick Start:**
```bash
# Run the keep-alive service
npm run keep-alive

# Or run in the background
node keep-alive.js &
```

**With PM2 (Linux/macOS only - NOT supported on Windows):**
```bash
# This does NOT work on Windows - use Task Scheduler instead
npm install -g pm2

# Linux/macOS only:
pm2 start keep-alive.js --name "epm-keep-alive"
pm2 startup
pm2 save

# View logs
pm2 logs epm-keep-alive

# Stop the service
pm2 stop epm-keep-alive
```

**Note:** Windows users should skip PM2 and use Task Scheduler (see Option 3 above)

### Option 2: Shell Script (Bash)

**Requirements:**
- Bash shell (Linux/macOS)
- curl command-line tool

**Setup on Linux/macOS:**
```bash
# Make script executable
chmod +x keep-alive.sh

# Run directly
./keep-alive.sh

# Or run in the background
./keep-alive.sh &

# Add to crontab for auto-start on reboot
crontab -e

# Add this line:
@reboot /path/to/keep-alive.sh
```

### Option 3: Windows Task Scheduler

**Requirements:**
- Windows 10/11
- Node.js installed

⚠️ **Note:** PM2's `startup` command does NOT work on Windows. Use Task Scheduler instead.

**Setup (Detailed guide in WINDOWS-TASK-SCHEDULER.md):**

Quick version:
1. Open Task Scheduler (`taskschd.msc`)
2. Create Basic Task → Name: "EPM Keep-Alive"
3. Trigger: "At startup"
4. Action: Program `node`, Arguments: `keep-alive.js`
5. Set Start in: `C:\Users\Admin\Documents\Wunders149\EPM`
6. Run with highest privileges
7. Run whether user is logged in or not

**See WINDOWS-TASK-SCHEDULER.md for detailed step-by-step screenshots and troubleshooting.**

## Configuration

To use a different app URL, set the `APP_URL` environment variable:

```bash
# Node.js
APP_URL=https://your-custom-domain.com npm run keep-alive

# Shell script
./keep-alive.sh https://your-custom-domain.com
```

## Monitoring

**View logs:**
```bash
# PM2
pm2 logs epm-keep-alive

# Node.js directly
npm run keep-alive

# Shell script
./keep-alive.sh  # Shows pings in real-time
```

## Stopping the Service

```bash
# PM2
pm2 stop epm-keep-alive
pm2 delete epm-keep-alive

# Node.js background process
pkill -f keep-alive.js

# Shell script
pkill -f keep-alive.sh
```

## Verify it's Working

Check if your service stays awake:
1. Don't visit your app for 20 minutes
2. Check the logs to confirm pings are being sent
3. Visit your app - it should respond immediately (no cold start)

## Cost Impact
- **Free**: No cost. This keeps your existing free tier alive.
- **Data**: Minimal (~1KB per ping) = ~288KB/day
- **Processing**: Negligible CPU usage

## Troubleshooting

**"Connection refused":**
- Check if the APP_URL is correct
- Ensure your Render app is deployed

**"Keep-alive not starting on reboot (Linux):**
- Verify crontab: `crontab -l`
- Check cron logs: `grep CRON /var/log/syslog`

**"PM2 not persisting after reboot":**
```bash
pm2 startup
pm2 save
```

## Additional Resources
- [Render Documentation](https://render.com/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Cron Expression Syntax](https://crontab.guru/)
