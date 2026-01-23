# Setup Keep-Alive on Windows Using Task Scheduler

Since Windows doesn't support PM2's `startup` command, use Windows Task Scheduler instead.

## Step-by-Step Setup

### 1. Open Task Scheduler

- Press `Windows Key + R`
- Type `taskschd.msc` and press Enter
- Or: Control Panel → Administrative Tools → Task Scheduler

### 2. Create a New Task

1. In the right panel, click **"Create Basic Task"**
2. Enter name: `EPM Keep-Alive Service`
3. Description: `Pings EPM app every 5 minutes to keep Render service awake`
4. Click **Next**

### 3. Set the Trigger (When to Run)

1. Select: **"At startup"**
2. Click **Next**
3. Check **"Repeat task every: 5 minutes"** (if available)
4. Check **"For a duration of: Indefinitely"**
5. Click **Next**

### 4. Set the Action (What to Run)

1. Select: **"Start a program"**
2. Fill in:
   - **Program/script:** `node`
   - **Add arguments:** `keep-alive.js`
   - **Start in:** `C:\Users\Admin\Documents\Wunders149\EPM`

3. Click **Next**

### 5. Set Additional Conditions

1. Leave defaults or customize:
   - Uncheck "Start the task only if the computer is on AC power" (if you want it to run on battery)
2. Click **Next**

### 6. Complete and Save

1. Check **"Open the Properties dialog"**
2. Click **Finish**

### 7. Advanced Settings (Optional but Recommended)

In the Properties dialog that opens:

**General tab:**
- Check: "Run whether user is logged in or not"
- Select: "Run with highest privileges"

**Conditions tab:**
- Uncheck: "Stop the task if it runs longer than:" (or set to a high value)
- Uncheck: "Stop if the computer switches to battery power"

**Settings tab:**
- Check: "Allow task to be run on demand"
- Uncheck: "Stop the task if it runs longer than: 72 hours"
- Select: "If the task fails, restart every: 1 minute"
- Set: "Attempt to restart up to: 3 times"

Click **OK** to save.

## Verify It's Working

1. **Check the Task is Running:**
   - Open Task Scheduler
   - Navigate to: Task Scheduler Library
   - Find **"EPM Keep-Alive Service"**
   - Click it, then check the "History" tab at the bottom

2. **Manual Test:**
   - Right-click the task → **"Run"**
   - It should start immediately

3. **Check Logs:**
   - Open Command Prompt in the EPM folder
   - Run: `node keep-alive.js`
   - You should see pings every 5 minutes

## Troubleshooting

### Task Doesn't Start on Reboot
- Make sure "Run with highest privileges" is checked
- Verify "Run whether user is logged in or not" is selected
- Restart your computer to test

### "Node not found" Error
- Ensure Node.js is installed: `node --version`
- Use full path to node if needed:
  - Find node path: `where node`
  - Example: `C:\Program Files\nodejs\node.exe keep-alive.js`

### Task Keeps Getting Disabled
- In Properties → General, uncheck "Enabled" and re-check it
- In Settings tab, increase retry attempts

### Want to Remove the Task
1. Right-click the task in Task Scheduler
2. Click **"Delete"**
3. Confirm deletion

## Manual Alternative (No Task Scheduler)

If you prefer manual control, just run:

```powershell
# From the EPM directory
node keep-alive.js

# Or in the background (won't survive reboot):
Start-Process node -ArgumentList "keep-alive.js" -WindowStyle Hidden
```

But this won't auto-start on reboot - Task Scheduler is the best solution on Windows.
