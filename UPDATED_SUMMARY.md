# Sharp AC Remote - Updated for Phone IR Support

## 🎉 What's New

Your Sharp CV-P12LX remote control app now supports **direct IR transmission from your phone**! No external hardware needed if you have a phone with an IR blaster.

## 🚀 Quick Start (Updated)

### Option 1: Use Your Phone's IR (Easiest!)

**If you have a phone with IR blaster** (Xiaomi, Huawei, Samsung S6/S7, etc.):

1. Deploy to your server (port **5004**):
   ```bash
   cd ~/projects/sharp-ac-remote
   cp .env.example .env
   nano .env  # Add your Cloudflare tunnel token
   docker-compose up -d
   ```

2. Open on your phone:
   ```
   https://remote.cloudmc.online
   ```

3. Look for **"Phone IR Ready"** status
4. Point phone at AC and press Power!

**That's it!** No ESP8266, no wiring, no hardware needed.

### Option 2: Use ESP8266/ESP32 (For phones without IR)

If your phone doesn't have IR, you can still use the app with an ESP8266/ESP32:
- See `HARDWARE_SETUP.md` for wiring
- Costs about $5
- Works from any device (iPhone, iPad, etc.)

## 📱 Phone IR Support

### Phones That Work

**Xiaomi:**
- Redmi Note 8, 9, 10, 11
- Mi 10, Mi 11
- Poco F3, F4

**Huawei/Honor:**
- P30, P40, Mate 20-40
- Honor 20, 30 series

**Samsung:**
- Galaxy S6, S7
- Note 4, Note 5

**LG:**
- G5, G6, V20, V30

See `PHONE_IR_SETUP.md` for complete list and setup guide.

## 🔧 Configuration Changes

### Port Updated to 5004

All configurations now use port **5004** (was 5000):

**Files Updated:**
- `.env.example` - PORT=5004
- `docker-compose.yml` - Port mapping 5004:5004
- `server/index.js` - Default port 5004
- `client/vite.config.js` - Proxy to 5004
- `Dockerfile` - Expose 5004

### Serial Port Now Optional

ESP8266/ESP32 is now optional:
- If `SERIAL_PORT` is not set, runs in phone IR mode
- No errors if no serial device connected
- Automatically falls back to server mode

## 📁 New Files

1. **`client/src/utils/sharpIR.js`**
   - Sharp AC IR protocol implementation
   - Phone IR detection
   - IR code generation

2. **`PHONE_IR_SETUP.md`**
   - Complete guide for phone IR usage
   - Troubleshooting
   - Phone compatibility list

3. **`UPDATED_SUMMARY.md`** (this file)
   - Summary of changes
   - Quick reference

## 🎯 How It Works

### With Phone IR:
```
Phone → IR Blaster → AC Unit
```
- Instant response
- No network needed
- Works offline

### Without Phone IR:
```
Phone → Server → ESP8266 → IR LED → AC Unit
```
- Works from any device
- Remote access via Cloudflare
- Always-on automation

### Best of Both:
```
Phone IR for direct control
+ ESP8266 for automation
= Complete smart AC system
```

## 🚀 Deployment Steps

### 1. On Your Server

```bash
# Navigate to project
cd ~/projects/sharp-ac-remote

# Configure environment
cp .env.example .env
nano .env
```

Add to `.env`:
```env
NODE_ENV=production
PORT=5004
# SERIAL_PORT=/dev/ttyUSB0  (Optional - only if using ESP8266)
TUNNEL_TOKEN=your_cloudflare_tunnel_token_here
```

### 2. Set Up Cloudflare Tunnel

```bash
cloudflared tunnel create sharp-ac-remote
cloudflared tunnel route dns sharp-ac-remote remote.cloudmc.online
cloudflared tunnel token sharp-ac-remote
# Copy token to .env file
```

### 3. Deploy

```bash
docker-compose up -d
```

### 4. Access from Phone

Open: **https://remote.cloudmc.online**

## ✅ Status Indicators

**"Phone IR Ready"** 🟢
- Your phone has IR blaster
- Commands sent directly from phone
- No server needed for IR transmission

**"Server Connected"** 🟢
- Connected to server
- Using ESP8266/ESP32 for IR
- Or phone doesn't have IR

**"Ready"** 🟡
- Server mode
- Waiting for commands

## 📊 Feature Comparison

| Feature | Phone IR | ESP8266 | Both |
|---------|----------|---------|------|
| Cost | Free | $5 | $5 |
| Setup Time | 0 min | 30 min | 30 min |
| Portability | ✅ Mobile | ❌ Fixed | ✅ |
| Remote Access | Via Server | ✅ | ✅ |
| Automation | ❌ | ✅ | ✅ |
| Always On | ❌ | ✅ | ✅ |
| Works Offline | ✅ | ❌ | ✅ |

## 🎨 UI Updates

The web interface now shows:
- Phone IR detection status
- Smartphone icon when IR is available
- Automatic fallback to server mode
- Real-time transmission feedback

## 🔍 Testing

### Test Phone IR:
1. Open https://remote.cloudmc.online
2. Check for "Phone IR Ready" status
3. Press Power button
4. Point phone at AC
5. AC should respond

### Test Server Mode:
1. Check logs: `docker logs -f sharp-ac-remote`
2. Commands should show in console
3. If ESP8266 connected, IR should transmit

## 📚 Documentation

- **`README.md`** - Main documentation
- **`PHONE_IR_SETUP.md`** - Phone IR guide (NEW)
- **`HARDWARE_SETUP.md`** - ESP8266 wiring
- **`DEPLOYMENT.md`** - Server deployment
- **`QUICK_START.md`** - Fast setup guide
- **`SHOPPING_LIST.md`** - Hardware shopping

## 🐛 Troubleshooting

### Phone Shows "Ready" Instead of "Phone IR Ready"

Your phone doesn't have an IR blaster:
- Check phone specs online
- Use ESP8266/ESP32 instead
- Still works via server mode

### "Phone IR Ready" But AC Not Responding

- Point phone at AC receiver (front panel)
- Move closer (1-3 meters)
- Check browser permissions
- Try Chrome for Android

### Server Not Accessible

- Check Cloudflare tunnel: `docker logs cloudflared-tunnel`
- Verify DNS: `nslookup remote.cloudmc.online`
- Check firewall allows port 5004

## 🎯 Next Steps

1. ✅ Deploy to your server
2. ✅ Access from phone
3. ✅ Test IR transmission
4. ✅ Add to home screen
5. ✅ Enjoy your smart AC!

**Optional:**
- Add ESP8266 for automation
- Set up schedules
- Create scenes

## 📞 Support

Check documentation:
- Phone IR not working? → `PHONE_IR_SETUP.md`
- Need hardware? → `HARDWARE_SETUP.md`
- Deployment issues? → `DEPLOYMENT.md`

---

**Built with ❤️ for the Sharp CV-P12LX**

Now with native phone IR support! 📱❄️
