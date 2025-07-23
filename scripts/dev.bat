@echo off
REM Windows version of the development script

echo Starting ResourceHub in development mode...

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    exit /b 1
)

REM Create necessary directories
if not exist "logs" mkdir logs

REM Start services in development mode
echo 🚀 Starting development environment...
docker-compose -f docker-compose.dev.yml up --build

echo ✅ Development environment started!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:9090
echo 📊 Health Check: http://localhost:9090/health
