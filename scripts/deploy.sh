#!/bin/bash

# Platform-independent production deployment script
set -e

echo "🚀 Deploying ResourceHub to production..."

# Configuration
ENVIRONMENT=${1:-production}
COMPOSE_FILE="docker-compose.${ENVIRONMENT}.yml"

# Check if environment file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo "❌ Environment file $COMPOSE_FILE not found!"
    exit 1
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command_exists docker-compose; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create necessary directories
mkdir -p logs data/db backups

# Build and deploy
echo "🔨 Building application..."
docker-compose -f "$COMPOSE_FILE" build

echo "🏃 Starting services..."
docker-compose -f "$COMPOSE_FILE" up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Health check
echo "🏥 Performing health checks..."
if curl -f http://localhost:9090/health >/dev/null 2>&1; then
    echo "✅ Backend health check passed"
else
    echo "❌ Backend health check failed"
    exit 1
fi

if curl -f http://localhost:80 >/dev/null 2>&1; then
    echo "✅ Frontend health check passed"
else
    echo "❌ Frontend health check failed"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Application: http://localhost"
echo "🔧 API: http://localhost:9090"

# Display running containers
echo "📋 Running containers:"
docker-compose -f "$COMPOSE_FILE" ps
