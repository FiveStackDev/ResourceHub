#!/bin/bash

# ResourceHub Setup Script
# Platform-independent setup for development environment

set -e

echo "🏗️  ResourceHub Development Environment Setup"
echo "=============================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print colored output
print_status() {
    echo -e "\033[1;34m[INFO]\033[0m $1"
}

print_success() {
    echo -e "\033[1;32m[SUCCESS]\033[0m $1"
}

print_error() {
    echo -e "\033[1;31m[ERROR]\033[0m $1"
}

print_warning() {
    echo -e "\033[1;33m[WARNING]\033[0m $1"
}

# Check prerequisites
print_status "Checking prerequisites..."

if ! command_exists docker; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command_exists docker-compose; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

if ! command_exists git; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_success "All prerequisites are installed!"

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p logs data/db backups monitoring/data

# Setup environment files
print_status "Setting up environment files..."

if [ ! -f ".env.dev" ]; then
    cp .env.dev.example .env.dev
    print_success "Created .env.dev file"
    print_warning "Please edit .env.dev with your configuration before running the application"
else
    print_warning ".env.dev already exists, skipping..."
fi

if [ ! -f ".env.prod" ]; then
    cp .env.prod.example .env.prod
    print_success "Created .env.prod file"
    print_warning "Please edit .env.prod with your production configuration"
else
    print_warning ".env.prod already exists, skipping..."
fi

# Make scripts executable
print_status "Making scripts executable..."
chmod +x scripts/*.sh

# Install frontend dependencies if Node.js is available
if command_exists node && command_exists npm; then
    print_status "Installing frontend dependencies..."
    cd Front-End
    npm install
    cd ..
    print_success "Frontend dependencies installed!"
else
    print_warning "Node.js/npm not found. Frontend dependencies will be installed via Docker."
fi

# Pull required Docker images
print_status "Pulling Docker images..."
docker-compose -f docker-compose.dev.yml pull

print_success "Development environment setup completed!"

echo ""
echo "🎉 Setup Complete! Next steps:"
echo ""
echo "1. Edit .env.dev with your configuration:"
echo "   nano .env.dev"
echo ""
echo "2. Start the development environment:"
echo "   make dev"
echo "   # OR"
echo "   ./scripts/dev.sh"
echo ""
echo "3. Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:9090"
echo ""
echo "4. For production setup:"
echo "   make setup-prod"
echo ""
echo "📚 For detailed documentation, see: docs/DEVOPS.md"
echo ""
echo "Happy coding! 🚀"
