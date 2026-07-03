# 🚀 START HERE - Sharp AC Remote

## For Phone Users (No Hardware Needed!)

If you have a phone with IR blaster (Xiaomi, Huawei, Samsung S6/S7, etc.):

### 1. Deploy to Server (5 minutes)

**If you already have docker-compose.yml on your server:**
See `EXISTING_DOCKER_SETUP.md` for integration instructions.

**Otherwise:**
```bash
cd ~/projects/sharp-ac-remote
cp .env.example .env
nano .env  # Add Cloudflare tunnel token
docker-compose up -d
```

### 2. Open on Phone

Visit: **https://remote.cloudmc.online**

### 3. Done!

Look for "Phone IR Ready" status and start controlling your AC!

---

## For Everyone Else

### Check Your Phone

1. Google: "[your phone model] IR blaster"
2. Or just try the app - it auto-detects!

### If No Phone IR

You'll need an ESP8266 ($5):
- See `HARDWARE_SETUP.md` for wiring
- Takes 30 minutes to set up
- Works from any device (iPhone, iPad, etc.)

---

## Quick Links

- **Phone has IR?** → `PHONE_IR_SETUP.md`
- **Need hardware?** → `HARDWARE_SETUP.md`
- **Deploy to server?** → `DEPLOYMENT.md`
- **Just want to try?** → `QUICK_START.md`

---

## What You'll Get

✅ Control AC from your phone
✅ Beautiful modern interface  
✅ Works from anywhere (via remote.cloudmc.online)
✅ No monthly fees
✅ Open source

---

**Questions? Check `README.md` for full documentation.**
