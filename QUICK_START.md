# Quick Start Guide

Get your Sharp AC remote up and running in 30 minutes!

## What You Need

- ✅ NodeMCU ESP8266 board ($3-5)
- ✅ 940nm IR LED ($0.50)
- ✅ 100Ω resistor ($0.10)
- ✅ USB cable
- ✅ Dedicated server with Docker
- ✅ Domain: cloudmc.online (Cloudflare)

## 5-Step Setup

### Step 1: Build the Hardware (5 minutes)

```
ESP8266 D2 (GPIO4) → [100Ω Resistor] → IR LED (+) long leg
ESP8266 GND → IR LED (-) short leg
```

**That's it!** Just 2 wires.

### Step 2: Flash the Firmware (5 minutes)

1. Open Arduino IDE
2. Install libraries:
   - IRremoteESP8266
   - ArduinoJson
3. Open `arduino/sharp_ac_ir_bridge/sharp_ac_ir_bridge.ino`
4. Select Board: "NodeMCU 1.0 (ESP-12E Module)"
5. Click Upload

### Step 3: Deploy to Server (10 minutes)

```bash
# On your server
cd ~/projects
git clone <your-repo> sharp-ac-remote
cd sharp-ac-remote

# Setup Cloudflare Tunnel
cloudflared tunnel login
cloudflared tunnel create sharp-ac-remote
cloudflared tunnel route dns sharp-ac-remote remote.cloudmc.online
cloudflared tunnel token sharp-ac-remote

# Configure
cp .env.example .env
nano .env  # Add your tunnel token

# Deploy
docker-compose up -d
```

### Step 4: Test (5 minutes)

1. Open https://remote.cloudmc.online on your phone
2. Press the Power button
3. Your AC should turn on!

### Step 5: Position and Enjoy (5 minutes)

- Point IR LED at your AC
- Test all functions
- Mount ESP8266 permanently
- Add to home screen on phone

## Troubleshooting

**AC not responding?**
- Check IR LED polarity (long leg = +)
- Test with phone camera (IR LED should glow)
- Move closer to AC (within 7 meters)

**Can't access website?**
- Check tunnel: `docker logs cloudflared-tunnel`
- Verify DNS: `nslookup remote.cloudmc.online`
- Wait 2-3 minutes for DNS propagation

**ESP8266 not connecting?**
- Check USB cable (must support data)
- Try different USB port
- Check serial port: `ls /dev/ttyUSB*`

## Next Steps

- 📱 Add to phone home screen
- 🔧 Create enclosure for ESP8266
- 📊 Monitor with `docker logs -f sharp-ac-remote`
- 🎨 Customize the UI (edit `client/src/App.jsx`)

## Support

See full documentation:
- `README.md` - Complete guide
- `HARDWARE_SETUP.md` - Detailed wiring
- `DEPLOYMENT.md` - Server deployment

Enjoy your smart AC! ❄️
