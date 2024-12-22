# Hetzner Deployment Guide

## 1. Server Setup

### 1.1 Create Hetzner Cloud Server
- Log in to Hetzner Cloud Console (https://console.hetzner.cloud/)
- Create new project "DeepQ" if not exists
- Click "Add Server"
- Choose configuration:
  ```
  Location: Helsinki/Nuremberg (choose closest to target users)
  Image: Ubuntu 22.04
  Type: CPX21 (2 vCPU, 4 GB RAM) or higher
  Storage: 80 GB
  ```
- Add your SSH key or create new one
- Set hostname: `deepq-prod`
- Create server

### 1.2 DNS Setup
- Go to your domain registrar
- Add A record:
  ```
  Type: A
  Host: deepq
  Value: <YOUR_SERVER_IP>
  TTL: 3600
  ```

## 2. Local Preparation

### 2.1 Create deployment SSH key
```bash
# Generate deployment key
ssh-keygen -t ed25519 -C "github-actions-deepq" -f ~/.ssh/deepq_deploy

# Copy public key content - will be needed for server setup
cat ~/.ssh/deepq_deploy.pub

# Copy private key content - will be needed for GitHub secrets
cat ~/.ssh/deepq_deploy
```

### 2.2 Update GitHub Repository Settings
1. Go to repository Settings > Secrets and variables > Actions
2. Add following secrets:
   ```
   SERVER_HOST: <YOUR_SERVER_IP>
   SERVER_USER: root
   SSH_PRIVATE_KEY: <CONTENT_OF_PRIVATE_KEY>
   ```

### 2.3 Update Configuration Files

1. Update frontend environment:
```bash
# frontend/.env.production
VITE_API_BASE_URL=https://deepq.yourdomain.com/api/v1
```

2. Create production docker-compose override:
```bash
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    environment:
      - VIRTUAL_HOST=deepq.yourdomain.com
      - LETSENCRYPT_HOST=deepq.yourdomain.com
    networks:
      - nginx-proxy
      - default

  backend:
    environment:
      - DOMAIN=deepq.yourdomain.com
      - CORS_ORIGINS=https://deepq.yourdomain.com
    networks:
      - nginx-proxy
      - default

networks:
  nginx-proxy:
    external: true
```

## 3. Server Setup

### 3.1 Initial Server Access
```bash
# SSH into server
ssh root@<YOUR_SERVER_IP>

# Add deployment SSH key
echo "<DEPLOYMENT_PUBLIC_KEY>" >> ~/.ssh/authorized_keys
```

### 3.2 Basic Server Setup
```bash
# Update system
apt update && apt upgrade -y

# Set timezone
timedatectl set-timezone UTC

# Install basic tools
apt install -y curl git htop

# Create deployment directory
mkdir -p /opt/deepq
```

### 3.3 Install Docker and Setup Proxy
```bash
# Copy install script to server
scp scripts/install_docker.sh root@<YOUR_SERVER_IP>:/root/

# SSH into server and run installation
ssh root@<YOUR_SERVER_IP>
chmod +x install_docker.sh
./install_docker.sh

# Setup nginx-proxy with Let's Encrypt
docker network create nginx-proxy

# Create docker-compose.proxy.yml
cat > /opt/proxy/docker-compose.yml << 'EOL'
version: '3.8'
services:
  nginx-proxy:
    image: nginxproxy/nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - certs:/etc/nginx/certs
      - vhost:/etc/nginx/vhost.d
      - html:/usr/share/nginx/html
    networks:
      - nginx-proxy

  acme-companion:
    image: nginxproxy/acme-companion
    volumes_from:
      - nginx-proxy
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - acme:/etc/acme.sh
    environment:
      - DEFAULT_EMAIL=your-email@domain.com

volumes:
  certs:
  vhost:
  html:
  acme:

networks:
  nginx-proxy:
    external: true
EOL

# Start proxy
cd /opt/proxy
docker-compose up -d
```

### 3.4 Setup Firewall
```bash
# Install and setup UFW
apt install -y ufw

# Configure firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https

# Enable firewall
ufw enable
```

## 4. Application Deployment

### 4.1 Initial Manual Deployment
```bash
# SSH into server
ssh root@<YOUR_SERVER_IP>

# Create deployment directory structure
mkdir -p /opt/deepq/{data,config}

# Copy configuration files
scp docker-compose.yml docker-compose.prod.yml .env root@<YOUR_SERVER_IP>:/opt/deepq/

# Deploy
cd /opt/deepq
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 4.2 Setup Automatic Deployments
```bash
# Create deploy script
cat > /opt/deepq/deploy.sh << 'EOL'
#!/bin/bash

# Pull latest changes
cd /opt/deepq

# Pull new images
docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull

# Update services
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Clean up
docker system prune -f
EOL

chmod +x /opt/deepq/deploy.sh
```

## 5. Monitoring Setup

### 5.1 Install Monitoring Tools
```bash
# Install monitoring stack
cd /opt/monitoring

# Create docker-compose.monitoring.yml
cat > docker-compose.yml << 'EOL'
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana
    volumes:
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=your-secure-password
    networks:
      - monitoring
      - nginx-proxy
    environment:
      - VIRTUAL_HOST=grafana.yourdomain.com
      - LETSENCRYPT_HOST=grafana.yourdomain.com

volumes:
  prometheus_data:
  grafana_data:

networks:
  monitoring:
  nginx-proxy:
    external: true
EOL

# Start monitoring
docker-compose up -d
```

## 6. Backup Setup

### 6.1 Create Backup Script
```bash
# Create backup script
cat > /opt/deepq/backup.sh << 'EOL'
#!/bin/bash

# Set backup directory
BACKUP_DIR="/opt/deepq/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Backup database
docker-compose exec -T db pg_dump -U postgres deepq > "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Compress backup
gzip "$BACKUP_DIR/db_$TIMESTAMP.sql"

# Remove backups older than 7 days
find "$BACKUP_DIR" -type f -mtime +7 -delete
EOL

chmod +x /opt/deepq/backup.sh

# Add to crontab
(crontab -l 2>/dev/null; echo "0 3 * * * /opt/deepq/backup.sh") | crontab -
```

## 7. Post-Deployment Verification

### 7.1 Verify Services
- Check if all containers are running:
  ```bash
  docker-compose ps
  ```
- Verify logs for any errors:
  ```bash
  docker-compose logs
  ```
- Test the application:
  - Open https://deepq.yourdomain.com
  - Try logging in with admin credentials
  - Test core functionality

### 7.2 Monitor Resource Usage
```bash
# Check resource usage
docker stats

# Check disk space
df -h

# Check memory usage
free -h
```

## 8. Maintenance

### 8.1 Regular Tasks
- Monitor logs daily:
  ```bash
  docker-compose logs --tail=100
  ```
- Check backup integrity weekly:
  ```bash
  ls -l /opt/deepq/backups/
  ```
- Update system packages monthly:
  ```bash
  apt update && apt upgrade -y
  ```
- Rotate logs:
  ```bash
  docker-compose exec frontend nginx -s reopen
  ```

### 8.2 Troubleshooting
- Check container logs:
  ```bash
  docker-compose logs [service_name]
  ```
- Restart specific service:
  ```bash
  docker-compose restart [service_name]
  ```
- Check nginx proxy logs:
  ```bash
  docker-compose -f /opt/proxy/docker-compose.yml logs nginx-proxy
  ```
