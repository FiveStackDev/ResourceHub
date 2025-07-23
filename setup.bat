@echo off
REM Windows setup script for ResourceHub

echo 🏗️ ResourceHub Development Environment Setup (Windows)
echo =======================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    echo Visit: https://docs.docker.com/desktop/windows/
    pause
    exit /b 1
)

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Compose is not available. Please ensure Docker Desktop is running.
    pause
    exit /b 1
)

echo ✅ All prerequisites are installed!

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist "logs" mkdir logs
if not exist "data\db" mkdir data\db
if not exist "backups" mkdir backups
if not exist "monitoring\data" mkdir monitoring\data

REM Setup environment files
echo ⚙️ Setting up environment files...

if not exist ".env.dev" (
    copy .env.dev.example .env.dev >nul
    echo ✅ Created .env.dev file
    echo ⚠️ Please edit .env.dev with your configuration before running the application
) else (
    echo ⚠️ .env.dev already exists, skipping...
)

if not exist ".env.prod" (
    copy .env.prod.example .env.prod >nul
    echo ✅ Created .env.prod file
    echo ⚠️ Please edit .env.prod with your production configuration
) else (
    echo ⚠️ .env.prod already exists, skipping...
)

echo ✅ Development environment setup completed!
echo.
echo 🎉 Setup Complete! Next steps:
echo.
echo 1. Edit .env.dev with your configuration:
echo    notepad .env.dev
echo.
echo 2. Start the development environment:
echo    scripts\dev.bat
echo.
echo 3. Access the application:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:9090
echo.
echo 4. For production setup, edit .env.prod:
echo    notepad .env.prod
echo.
echo 📚 For detailed documentation, see: docs\DEVOPS.md
echo.
echo Happy coding! 🚀
pause
