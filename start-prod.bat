@echo off
echo ====================================
echo 🚀 Starting ResourceHub Production
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

echo 🏭 Starting production environment...
echo.

REM Start production services
docker-compose --profile prod up --build -d

if errorlevel 1 (
    echo ❌ Failed to start services
    pause
    exit /b 1
)

echo.
echo ✅ Production environment started successfully!
echo.
echo 🌐 Access your application:
echo   Application: http://localhost
echo   Secure:      https://localhost (if SSL configured)
echo   Database:    localhost:3306
echo.
echo 📋 Useful commands:
echo   docker-compose --profile prod logs -f    (view logs)
echo   docker-compose --profile prod down       (stop services)
echo   docker-compose --profile prod ps         (check status)
echo.
echo 🎯 Production ready!

pause
