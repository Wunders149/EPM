@echo off
REM Keep Render service awake on Windows
REM Schedule this with Task Scheduler to run at startup

REM Change to the EPM project directory
cd /d "%~dp0"

REM Run the keep-alive service
node keep-alive.js

REM If it exits, log the event
echo %date% %time% - Keep-alive service stopped >> keep-alive.log
