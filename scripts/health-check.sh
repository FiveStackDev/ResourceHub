#!/bin/bash

# Health check script for ResourceHub
# This script can be used by load balancers, monitoring systems, etc.

set -e

FRONTEND_URL="${FRONTEND_URL:-http://localhost}"
BACKEND_URL="${BACKEND_URL:-http://localhost:9090}"
TIMEOUT="${TIMEOUT:-10}"

echo "🏥 Starting health checks for ResourceHub..."

# Function to check HTTP endpoint
check_endpoint() {
    local url=$1
    local name=$2
    
    echo "Checking $name at $url..."
    
    if curl -f -s --connect-timeout $TIMEOUT "$url" > /dev/null; then
        echo "✅ $name is healthy"
        return 0
    else
        echo "❌ $name is unhealthy"
        return 1
    fi
}

# Initialize status
all_healthy=true

# Check frontend
if ! check_endpoint "$FRONTEND_URL/health" "Frontend"; then
    all_healthy=false
fi

# Check backend
if ! check_endpoint "$BACKEND_URL/health" "Backend"; then
    all_healthy=false
fi

# Check backend API
if ! check_endpoint "$BACKEND_URL/api/health" "Backend API"; then
    all_healthy=false
fi

# Overall status
if $all_healthy; then
    echo "✅ All services are healthy"
    exit 0
else
    echo "❌ Some services are unhealthy"
    exit 1
fi
