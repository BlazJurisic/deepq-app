#!/bin/bash

# Configuration
REPO_URL="ghcr.io/your-username/deepq"
DEPLOY_DIR="/opt/deepq"

# Pull latest images
docker-compose pull

# Stop and remove existing containers
docker-compose down

# Start new containers
docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to start..."
sleep 10

# Run database migrations if needed
docker-compose exec backend python -m alembic upgrade head

# Initialize database with sample data
docker-compose exec backend python -c "
import asyncio
from app.db.session import SessionLocal
from app.db.init_db import init_db

async def init():
    db = SessionLocal()
    await init_db(db)
    await db.close()

asyncio.run(init())
"

echo "Deployment completed successfully!"
