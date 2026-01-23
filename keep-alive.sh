#!/bin/bash
# Keep Render service awake
# Usage: chmod +x keep-alive.sh && ./keep-alive.sh

APP_URL="${1:-https://epm-web.onrender.com}"

echo "Starting keep-alive service for $APP_URL"
echo "Pinging every 5 minutes to prevent sleep..."

while true; do
  curl -s -o /dev/null "$APP_URL"
  echo "$(date +'%Y-%m-%dT%H:%M:%S') Ping sent to $APP_URL"
  sleep 300
done
