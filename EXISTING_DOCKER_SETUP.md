# Integration with Existing Docker Compose

Since you already have a `docker-compose.yml` file on your server, here are the options to integrate the Sharp AC Remote.

## Option 1: Add to Existing docker-compose.yml (Recommended)

### Step 1: Clone Repository

```bash
cd ~/projects
git clone https://github.com/SirJBiscuit/sharpAC.git sharp-ac-remote
```

### Step 2: Add Service to Your Existing docker-compose.yml

Open your existing `docker-compose.yml` and add this service:

```yaml
  sharp-ac-remote:
    build: ./sharp-ac-remote
    container_name: sharp-ac-remote
    restart: unless-stopped
    ports:
      - "5004:5004"
    environment:
      - NODE_ENV=production
      - PORT=5004
    volumes:
      - ./sharp-ac-remote/logs:/app/logs
    networks:
      - your-network-name  # Use your existing network
```

### Step 3: Configure Environment

```bash
cd sharp-ac-remote
cp .env.example .env
nano .env
```

Add:
```env
NODE_ENV=production
PORT=5004
```

### Step 4: Deploy

From your main docker-compose directory:

```bash
docker-compose up -d sharp-ac-remote
```

## Option 2: Use Existing Cloudflare Tunnel

If you already have a Cloudflare Tunnel running, you can route the AC remote through it.

### Update Your Cloudflare Tunnel Config

Edit your existing tunnel config (usually `~/.cloudflared/config.yml`):

```yaml
tunnel: <your-existing-tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  # Your existing routes
  - hostname: existing-service.cloudmc.online
    service: http://existing-service:port
  
  # Add this for AC remote
  - hostname: remote.cloudmc.online
    service: http://sharp-ac-remote:5004
  
  # Keep your catch-all at the end
  - service: http_status:404
```

### Add DNS Record

```bash
cloudflared tunnel route dns <your-tunnel-name> remote.cloudmc.online
```

### Restart Tunnel

```bash
docker-compose restart cloudflared  # Or whatever your tunnel service is named
```

## Option 3: Standalone Docker Run (No Compose Changes)

If you prefer not to modify your existing compose file:

```bash
cd ~/projects/sharp-ac-remote

# Build the image
docker build -t sharp-ac-remote .

# Run the container
docker run -d \
  --name sharp-ac-remote \
  --restart unless-stopped \
  -p 5004:5004 \
  -e NODE_ENV=production \
  -e PORT=5004 \
  -v $(pwd)/logs:/app/logs \
  --network your-existing-network \
  sharp-ac-remote
```

Then configure your existing Cloudflare tunnel to route to it.

## Option 4: Separate Compose File (Isolated)

Keep the Sharp AC Remote completely separate:

```bash
cd ~/projects/sharp-ac-remote

# Use the included docker-compose.yml
cp .env.example .env
nano .env  # Add tunnel token

# Run with project name to avoid conflicts
docker-compose -p sharp-ac up -d
```

This creates isolated containers with the prefix `sharp-ac_`.

## Network Configuration

### If Using Existing Network

Find your network name:
```bash
docker network ls
```

Update the service to use it:
```yaml
networks:
  - your_network_name
```

### If Creating New Network

Add to your existing docker-compose.yml:
```yaml
networks:
  cloudflare:
    external: false
```

## Port Conflicts

If port 5004 is already in use, change it:

**In .env:**
```env
PORT=5005  # Or any available port
```

**In docker-compose service:**
```yaml
ports:
  - "5005:5005"  # External:Internal
environment:
  - PORT=5005
```

**In Cloudflare tunnel config:**
```yaml
service: http://sharp-ac-remote:5005
```

## Example: Full Integration

Here's what your docker-compose.yml might look like with everything:

```yaml
version: '3.8'

services:
  # Your existing services
  existing-service:
    image: your-image
    # ... your config ...

  # Add Sharp AC Remote
  sharp-ac-remote:
    build: ./sharp-ac-remote
    container_name: sharp-ac-remote
    restart: unless-stopped
    ports:
      - "5004:5004"
    environment:
      - NODE_ENV=production
      - PORT=5004
    volumes:
      - ./sharp-ac-remote/logs:/app/logs
    networks:
      - web

  # Your existing cloudflared (if you have one)
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: cloudflared
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
    networks:
      - web

networks:
  web:
    driver: bridge
```

## Recommended Approach

**For most users:**

1. Clone repo to `~/projects/sharp-ac-remote`
2. Add service to existing `docker-compose.yml`
3. Use existing Cloudflare tunnel (update config)
4. Run `docker-compose up -d sharp-ac-remote`

This keeps everything organized and uses your existing infrastructure.

## Verification

After deployment:

```bash
# Check if container is running
docker ps | grep sharp-ac-remote

# Check logs
docker logs sharp-ac-remote

# Test locally
curl http://localhost:5004/api/status

# Test via tunnel
curl https://remote.cloudmc.online/api/status
```

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker logs sharp-ac-remote

# Check if port is in use
sudo lsof -i :5004

# Rebuild if needed
docker-compose build sharp-ac-remote
docker-compose up -d sharp-ac-remote
```

### Network Issues

```bash
# List networks
docker network ls

# Inspect network
docker network inspect your-network-name

# Connect container to network
docker network connect your-network-name sharp-ac-remote
```

### Cloudflare Tunnel Not Routing

```bash
# Check tunnel status
cloudflared tunnel info <tunnel-name>

# Check tunnel logs
docker logs cloudflared

# Verify DNS
nslookup remote.cloudmc.online
```

## Environment Variables

If using existing `.env` file, add these variables:

```env
# Sharp AC Remote
AC_REMOTE_PORT=5004
AC_TUNNEL_TOKEN=your_token_here  # If using separate tunnel
```

Then reference in docker-compose:

```yaml
environment:
  - PORT=${AC_REMOTE_PORT}
```

## Updates

To update the Sharp AC Remote:

```bash
cd ~/projects/sharp-ac-remote
git pull
docker-compose build sharp-ac-remote
docker-compose up -d sharp-ac-remote
```

Or from your main compose directory:

```bash
cd ~/projects  # Or wherever your main docker-compose.yml is
docker-compose build sharp-ac-remote
docker-compose up -d sharp-ac-remote
```

## Summary

**Simplest integration:**
1. Clone to `~/projects/sharp-ac-remote`
2. Add service block to your existing `docker-compose.yml`
3. Update Cloudflare tunnel config to route `remote.cloudmc.online` → `http://sharp-ac-remote:5004`
4. Run `docker-compose up -d`

No need to replace your existing setup!
