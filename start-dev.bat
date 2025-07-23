@echo off
echo ====================================
echo 🚀 Starting ResourceHub Development
echo ====================================

echo.
echo 📋 Checking prerequisites...

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker is running
echo.

echo 🐳 Starting development environment...
echo.

REM Start development services
docker-compose --profile dev up --build -d

if errorlevel 1 (
    echo ❌ Failed to start services
    pause
    exit /b 1
)

echo.
echo ✅ Development environment started successfully!
echo.
echo 🌐 Access your application:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:9090
echo   Database: localhost:3306
echo.
echo 📋 Useful commands:
echo   docker-compose --profile dev logs -f    (view logs)
echo   docker-compose --profile dev down       (stop services)
echo   docker-compose --profile dev ps         (check status)
echo.
echo 🎯 Happy coding!

pause
