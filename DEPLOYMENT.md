# Deployment Guide

Complete guide for deploying the Sharp AC Remote to your dedicated server with Cloudflare Tunnel.

**⚠️ Note:** If you already have a `docker-compose.yml` file on your server, see **[EXISTING_DOCKER_SETUP.md](EXISTING_DOCKER_SETUP.md)** for integration instructions instead of following this guide completely.

## Prerequisites

- Dedicated server with Docker installed
- Domain: cloudmc.online (configured in Cloudflare)
- Cloudflare account with access to the domain
- ESP8266/ESP32 connected to the server via USB

## Server Requirements

### Minimum Specifications
- CPU: 1 core
- RAM: 512 MB
- Storage: 2 GB
- OS: Linux (Ubuntu 20.04+ recommended)
- Docker: 20.10+
- Docker Compose: 1.29+

### Supported Operating Systems
- Ubuntu 20.04/22.04 LTS
- Debian 11/12
- CentOS 8+
- Fedora 35+

## Step 1: Server Preparation

### Install Docker

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### Install Git

```bash
sudo apt install git -y
```

## Step 2: Clone Project to Server

```bash
# Create project directory
mkdir -p ~/projects
cd ~/projects

# Clone or upload project
# Option 1: If using Git
git clone <your-repo-url> sharp-ac-remote

# Option 2: Upload via SCP from your Windows machine
# From Windows PowerShell:
# scp -r "C:\Users\Jeremiah Payne\CascadeProjects\sharp-ac-remote" user@your-server:/home/user/projects/

cd sharp-ac-remote
```

## Step 3: Cloudflare Tunnel Setup

### Install Cloudflared on Server

```bash
# Download cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
chmod +x cloudflared-linux-amd64
sudo mv cloudflared-linux-amd64 /usr/local/bin/cloudflared

# Verify installation
cloudflared --version
```

### Authenticate with Cloudflare

```bash
cloudflared tunnel login
```

This will open a browser. Log in to Cloudflare and authorize the tunnel.

### Create Tunnel

```bash
cloudflared tunnel create sharp-ac-remote
```

**Save the Tunnel ID** - you'll need it later.

### Configure DNS

```bash
cloudflared tunnel route dns sharp-ac-remote remote.cloudmc.online
```

Verify in Cloudflare Dashboard:
1. Go to cloudmc.online → DNS
2. You should see a CNAME record: `remote` → `<tunnel-id>.cfargotunnel.com`

### Get Tunnel Token

```bash
cloudflared tunnel token sharp-ac-remote
```

**Copy the entire token** - it's a long string starting with `ey...`

## Step 4: Configure Environment

### Create .env File

```bash
cd ~/projects/sharp-ac-remote
cp .env.example .env
nano .env
```

Edit the file:

```env
NODE_ENV=production
PORT=5000
SERIAL_PORT=/dev/ttyUSB0
TUNNEL_TOKEN=eyJhIjoiYourverylongtunneltokenhere...
```

**Finding Serial Port:**
```bash
# List USB devices
ls -l /dev/ttyUSB*
# or
ls -l /dev/ttyACM*

# If using ESP8266/ESP32, usually /dev/ttyUSB0
# Grant permissions
sudo chmod 666 /dev/ttyUSB0
```

### Set Permissions

```bash
# Make sure user can access serial port
sudo usermod -aG dialout $USER

# Reboot or re-login for changes to take effect
```

## Step 5: Build and Deploy

### Build Docker Images

```bash
docker-compose build
```

### Start Services

```bash
docker-compose up -d
```

### Verify Deployment

```bash
# Check running containers
docker ps

# Should see:
# - sharp-ac-remote
# - cloudflared-tunnel

# Check logs
docker logs sharp-ac-remote
docker logs cloudflared-tunnel

# Test local access
curl http://localhost:5000/api/status
```

## Step 6: Test Remote Access

1. Open browser on your phone
2. Navigate to: **https://remote.cloudmc.online**
3. You should see the AC remote interface
4. Test power button
5. Check server logs: `docker logs -f sharp-ac-remote`

## Step 7: Enable Auto-Start on Boot

```bash
# Docker containers are already set to restart: unless-stopped
# Verify with:
docker inspect sharp-ac-remote | grep -A 5 RestartPolicy

# To ensure Docker starts on boot:
sudo systemctl enable docker
```

## Monitoring and Maintenance

### View Logs

```bash
# Real-time logs
docker logs -f sharp-ac-remote
docker logs -f cloudflared-tunnel

# Last 100 lines
docker logs --tail 100 sharp-ac-remote
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart sharp-ac-remote
```

### Update Application

```bash
cd ~/projects/sharp-ac-remote

# Pull latest changes (if using Git)
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

### Check Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## Security Hardening

### Firewall Configuration

```bash
# Install UFW
sudo apt install ufw -y

# Allow SSH
sudo ufw allow 22/tcp

# Block direct access to port 5000 (only Cloudflare Tunnel)
# Don't allow 5000 from outside

# Enable firewall
sudo ufw enable
```

### SSL/TLS

Cloudflare Tunnel automatically provides SSL/TLS encryption. No additional configuration needed.

### Optional: Add Authentication

Edit `server/index.js` to add basic auth:

```javascript
const basicAuth = require('express-basic-auth');

app.use(basicAuth({
  users: { 'admin': 'your-secure-password' },
  challenge: true
}));
```

Then rebuild:
```bash
npm install express-basic-auth
docker-compose build
docker-compose up -d
```

## Backup and Recovery

### Backup Configuration

```bash
# Backup .env and tunnel credentials
mkdir -p ~/backups
cp .env ~/backups/
cp ~/.cloudflared/*.json ~/backups/
```

### Restore

```bash
# Copy back configuration
cp ~/backups/.env ~/projects/sharp-ac-remote/
cp ~/backups/*.json ~/.cloudflared/

# Restart services
cd ~/projects/sharp-ac-remote
docker-compose up -d
```

## Troubleshooting Deployment

### Container Won't Start

```bash
# Check logs
docker logs sharp-ac-remote

# Common issues:
# 1. Port already in use
sudo lsof -i :5000

# 2. Serial port permission
ls -l /dev/ttyUSB0
sudo chmod 666 /dev/ttyUSB0

# 3. Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Cloudflare Tunnel Not Working

```bash
# Check tunnel status
cloudflared tunnel info sharp-ac-remote

# Test tunnel connectivity
docker logs cloudflared-tunnel

# Verify DNS
nslookup remote.cloudmc.online

# Recreate tunnel if needed
cloudflared tunnel delete sharp-ac-remote
cloudflared tunnel create sharp-ac-remote
# Update TUNNEL_TOKEN in .env
docker-compose restart cloudflared
```

### Serial Port Issues

```bash
# Check if device is connected
dmesg | grep tty

# Check permissions
ls -l /dev/ttyUSB0

# Add permanent permissions
echo 'SUBSYSTEM=="tty", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE="0666"' | sudo tee /etc/udev/rules.d/99-usb-serial.rules
sudo udevadm control --reload-rules
```

### Can't Access from Phone

1. Check Cloudflare DNS is propagated: `nslookup remote.cloudmc.online`
2. Verify tunnel is running: `docker ps`
3. Check Cloudflare dashboard for tunnel status
4. Try incognito/private browsing mode
5. Clear browser cache

## Performance Optimization

### Reduce Docker Image Size

Already optimized with multi-stage build.

### Enable Logging Rotation

```bash
# Create logrotate config
sudo nano /etc/logrotate.d/docker-containers

# Add:
/var/lib/docker/containers/*/*.log {
  rotate 7
  daily
  compress
  size=10M
  missingok
  delaycompress
  copytruncate
}
```

### Monitor System Resources

```bash
# Install monitoring tools
sudo apt install htop iotop -y

# Check CPU/RAM
htop

# Check disk I/O
sudo iotop
```

## Production Checklist

- [ ] Docker and Docker Compose installed
- [ ] Project deployed to server
- [ ] .env file configured with correct values
- [ ] Cloudflare Tunnel created and configured
- [ ] DNS record created (remote.cloudmc.online)
- [ ] ESP8266/ESP32 connected and recognized
- [ ] Serial port permissions set
- [ ] Docker containers running
- [ ] Web interface accessible via HTTPS
- [ ] IR commands working
- [ ] Auto-restart enabled
- [ ] Firewall configured
- [ ] Backups created
- [ ] Monitoring set up

## Next Steps

1. Test all AC functions from remote interface
2. Set up monitoring/alerting (optional)
3. Create mobile home screen shortcut
4. Document any custom configurations
5. Enjoy your remote-controlled AC! ❄️

## Support

If you encounter issues:
1. Check logs: `docker logs sharp-ac-remote`
2. Verify hardware connections
3. Test serial communication
4. Review Cloudflare Tunnel status
5. Check this troubleshooting guide
