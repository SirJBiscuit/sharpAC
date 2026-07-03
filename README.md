# Sharp AC Remote Control - CV-P12LX

A modern, web-based IR remote control for the Sharp CV-P12LX air conditioner. Access your AC from anywhere via **remote.cloudmc.online**.

**GitHub Repository:** https://github.com/SirJBiscuit/sharpAC.git

**Optimized for:** Redmagic 11 Pro (and other phones with IR blasters)

## Features

- 🎨 **Beautiful Modern UI** - Responsive design with gradient backgrounds and smooth animations
- 📱 **Mobile-First** - Optimized for phones and tablets with touch-friendly controls
- 🌐 **Remote Access** - Control your AC from anywhere via Cloudflare Tunnel
- ❄️ **Full Feature Support** - All modes: Cool, Heat, Dry, Fan, Auto
- 🌡️ **Temperature Control** - Precise temperature adjustment (60-86°F)
- 💨 **Fan Speed Control** - Auto, Low, Med, High, Max
- ✨ **Special Features** - Turbo, Plasmacluster Ion, Swing, Lights
- 🔌 **Real-time Status** - Connection monitoring and command feedback

## Architecture

### Components

1. **Web Frontend** (React + Vite + TailwindCSS)
   - Modern, responsive UI
   - Real-time connection status
   - Touch-optimized controls

2. **Backend Server** (Node.js + Express)
   - REST API for command handling
   - Serial communication with IR device
   - Production-ready with Docker support

3. **IR Bridge** (ESP8266/ESP32 with Arduino)
   - Receives commands via serial
   - Transmits IR signals using IRremoteESP8266
   - Sharp AC protocol implementation

4. **Cloudflare Tunnel**
   - Secure remote access
   - No port forwarding required
   - SSL/TLS encryption

## Hardware Requirements

### Option 1: ESP8266/ESP32 (Recommended)
- **Board**: NodeMCU ESP8266 or ESP32 DevKit
- **IR LED**: 940nm IR LED
- **Resistor**: 100Ω resistor
- **Power**: USB power supply

### Option 2: Raspberry Pi
- Raspberry Pi (any model with GPIO)
- IR LED and transistor circuit
- USB IR transmitter (alternative)

### Wiring Diagram (ESP8266)

```
ESP8266 GPIO4 (D2) → 100Ω Resistor → IR LED (+)
                                      IR LED (-) → GND
```

## Installation

### 1. Clone or Download the Project

```bash
cd C:\Users\Jeremiah Payne\CascadeProjects\sharp-ac-remote
```

### 2. Install Dependencies

```bash
npm run install-all
```

### 3. Flash Arduino Code to ESP8266/ESP32

1. Open `arduino/sharp_ac_ir_bridge/sharp_ac_ir_bridge.ino` in Arduino IDE
2. Install required libraries:
   - IRremoteESP8266 (by crankyoldgit)
   - ArduinoJson (by Benoit Blanchon)
3. Select your board (NodeMCU 1.0 ESP-12E or ESP32 Dev Module)
4. Select the correct COM port
5. Upload the sketch

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set:
- `SERIAL_PORT` - Your ESP device port (e.g., `COM3` on Windows, `/dev/ttyUSB0` on Linux)
- `TUNNEL_TOKEN` - Your Cloudflare Tunnel token (see Cloudflare setup below)

### 5. Development Mode

```bash
npm run dev
```

Access at: http://localhost:3000

### 6. Production Deployment with Docker

```bash
docker-compose up -d
```

## Cloudflare Tunnel Setup

### 1. Install Cloudflared

**Windows:**
```powershell
winget install --id Cloudflare.cloudflared
```

**Linux:**
```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared
chmod +x cloudflared
sudo mv cloudflared /usr/local/bin/
```

### 2. Authenticate

```bash
cloudflared tunnel login
```

### 3. Create Tunnel

```bash
cloudflared tunnel create sharp-ac-remote
```

### 4. Configure DNS

```bash
cloudflared tunnel route dns sharp-ac-remote remote.cloudmc.online
```

### 5. Create Tunnel Configuration

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: remote.cloudmc.online
    service: http://sharp-ac-remote:5000
  - service: http_status:404
```

### 6. Get Tunnel Token

```bash
cloudflared tunnel token sharp-ac-remote
```

Copy the token to your `.env` file as `TUNNEL_TOKEN`.

### 7. Start with Docker Compose

```bash
docker-compose up -d
```

Your remote will be accessible at: **https://remote.cloudmc.online**

## Remote Control Features

### Power Control
- Toggle AC on/off
- Visual feedback with color changes

### Temperature Control
- Range: 60-86°F (15-30°C)
- Up/Down buttons for adjustment
- Large, easy-to-read display

### Operating Modes
- **Cool** - Cooling mode
- **Heat** - Heating mode
- **Dry** - Dehumidification
- **Fan** - Fan only (no cooling/heating)
- **Auto** - Automatic mode selection

### Fan Speeds
- Auto - Automatic fan speed
- Low - Quiet operation
- Med - Medium airflow
- High - Strong airflow
- Max - Maximum cooling/heating

### Special Features
- **Turbo** - Maximum cooling power
- **Ion** - Plasmacluster ion air purification
- **Swing** - Automatic louver movement
- **Lights** - Display panel lights toggle

## Troubleshooting

### Device Not Connecting

1. Check serial port in `.env` file
2. Verify ESP8266/ESP32 is connected via USB
3. Check Arduino serial monitor for errors
4. Restart the server

### IR Commands Not Working

1. Verify IR LED is connected correctly
2. Check IR LED polarity (long leg = +)
3. Test with physical remote to confirm AC is responsive
4. Ensure ESP8266 is within 7 meters of AC unit
5. Check for obstructions between IR LED and AC

### Cloudflare Tunnel Issues

1. Verify tunnel token is correct
2. Check tunnel status: `cloudflared tunnel info sharp-ac-remote`
3. Review logs: `docker logs cloudflared-tunnel`
4. Ensure DNS is properly configured in Cloudflare dashboard

### Web Interface Not Loading

1. Check if server is running: `docker ps`
2. Verify port 5000 is not in use
3. Check server logs: `docker logs sharp-ac-remote`
4. Clear browser cache and reload

## API Documentation

### GET /api/status

Returns connection status.

**Response:**
```json
{
  "connected": true,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### POST /api/command

Send IR command to AC.

**Request Body:**
```json
{
  "type": "temperature",
  "value": 72,
  "mode": "cool",
  "fanSpeed": "auto"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Command sent successfully",
  "command": { ... }
}
```

## Security Considerations

- Cloudflare Tunnel provides SSL/TLS encryption
- No exposed ports on your network
- Consider adding authentication for production use
- Keep tunnel token secure

## Future Enhancements

- [ ] User authentication
- [ ] Scheduling and timers
- [ ] Temperature history graphs
- [ ] Multiple AC unit support
- [ ] Voice control integration
- [ ] Energy usage tracking

## License

MIT License - Feel free to modify and distribute

## Support

For issues or questions, please check the troubleshooting section or review the Arduino serial output for debugging information.

---

**Built with ❤️ for the Sharp CV-P12LX Air Conditioner**
