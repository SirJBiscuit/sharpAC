# Sharp AC Remote - Web-Based IR Control

Control your Sharp CV-P12LX air conditioner from your phone!

## 🚀 Features

- 📱 **Native Phone IR Support** - Use your phone's built-in IR blaster (Redmagic, Xiaomi, Huawei, etc.)
- 🌐 **Remote Access** - Control from anywhere via Cloudflare Tunnel
- 🎨 **Beautiful UI** - Modern, responsive design with TailwindCSS
- ❄️ **Full AC Control** - Power, Mode, Temperature, Fan Speed, Special Features
- 🔒 **Secure** - HTTPS via Cloudflare, no external dependencies
- 📦 **Docker Ready** - Easy deployment with Docker Compose

## 📱 Supported Phones

Works great with phones that have IR blasters:
- **Redmagic 11 Pro** (Optimized!)
- Xiaomi Redmi Note series
- Huawei P/Mate series
- Samsung Galaxy S6/S7
- LG G5/G6
- And many more!

No IR blaster? Use ESP8266/ESP32 ($5 hardware) instead.

## ⚡ Quick Start

### For Phone IR Users (2 Minutes!)

1. **Deploy to your server:**
   ```bash
   git clone https://github.com/SirJBiscuit/sharpAC.git
   cd sharpAC
   cp .env.example .env
   # Add your Cloudflare tunnel token to .env
   docker-compose up -d
   ```

2. **Open on your phone:**
   ```
   https://remote.cloudmc.online
   ```

3. **Done!** Look for "Phone IR Ready" and start controlling your AC.

### For ESP8266 Users

See [HARDWARE_SETUP.md](HARDWARE_SETUP.md) for wiring instructions.

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - Quick start guide
- **[REDMAGIC_11_PRO.md](REDMAGIC_11_PRO.md)** - Redmagic 11 Pro specific guide
- **[PHONE_IR_SETUP.md](PHONE_IR_SETUP.md)** - Phone IR setup and troubleshooting
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Server deployment guide
- **[HARDWARE_SETUP.md](HARDWARE_SETUP.md)** - ESP8266/ESP32 wiring
- **[README.md](README.md)** - Complete documentation

## 🛠️ Tech Stack

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **IR Protocol:** Sharp AC (IRremoteESP8266 compatible)
- **Deployment:** Docker + Cloudflare Tunnel
- **Hardware:** Phone IR or ESP8266/ESP32

## 🎯 How It Works

### With Phone IR:
```
Phone → IR Blaster → AC Unit
```
Instant, no server needed for IR transmission!

### With ESP8266:
```
Phone → Server → ESP8266 → IR LED → AC Unit
```
Works from any device, enables automation.

## 🔧 Configuration

Port: **5004** (configurable in `.env`)

Required environment variables:
```env
NODE_ENV=production
PORT=5004
TUNNEL_TOKEN=your_cloudflare_tunnel_token
```

Optional (for ESP8266):
```env
SERIAL_PORT=/dev/ttyUSB0
```

## 📦 Installation

### Prerequisites

- Docker & Docker Compose
- Cloudflare account (for tunnel)
- Domain configured in Cloudflare

### Deploy

```bash
# Clone repository
git clone https://github.com/SirJBiscuit/sharpAC.git
cd sharpAC

# Configure
cp .env.example .env
nano .env  # Add your tunnel token

# Deploy
docker-compose up -d
```

### Access

Visit: **https://remote.cloudmc.online**

## 🎮 Perfect for Gamers

Optimized for **Redmagic 11 Pro**:
- Control AC while gaming
- Quick access from Game Space
- No interruption to gameplay
- Maintain optimal temperature

See [REDMAGIC_11_PRO.md](REDMAGIC_11_PRO.md) for gaming-specific tips.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

## 🐛 Issues

Found a bug? Have a feature request?
- Open an issue on GitHub
- Include your phone model
- Describe the problem/feature

## 🙏 Credits

- Sharp AC IR protocol from [IRremoteESP8266](https://github.com/crankyoldgit/IRremoteESP8266)
- Icons from [Lucide React](https://lucide.dev/)
- UI framework: [TailwindCSS](https://tailwindcss.com/)

## 📞 Support

- **Documentation:** Check the docs folder
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions

---

**Built with ❤️ for Sharp CV-P12LX owners**

Star ⭐ this repo if you find it useful!
