#!/bin/bash

# Create deployment directory
sudo mkdir -p /opt/deepq
sudo chown -R $USER:$USER /opt/deepq

# Copy deployment files
cp docker-compose.yml /opt/deepq/
cp scripts/deploy.sh /opt/deepq/
cp .env /opt/deepq/

# Make deploy script executable
chmod +x /opt/deepq/deploy.sh

# Create docker network if it doesn't exist
docker network create deepq-network || true

# Initial deployment
cd /opt/deepq
./deploy.sh
