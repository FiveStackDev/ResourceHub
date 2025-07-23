# 🚀 ResourceHub Setup Guide

## Quick Start (3 Steps)

### 1. Prerequisites
- ✅ **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
- ✅ **Git** - [Download here](https://git-scm.com/downloads)

### 2. Clone & Setup
```cmd
git clone https://github.com/FiveStackDev/ResourceHub.git
cd ResourceHub
setup.bat
```

### 3. Start Development
```cmd
start-dev.bat
```

🎉 **That's it!** Open http://localhost:3000

---

## Manual Setup (If needed)

### Frontend Setup
```cmd
cd Front-End
npm install
npm run dev
```

### Backend Setup
```cmd
cd Back-End
bal build
bal run
```

### Database Setup
```cmd
docker run -d \
  --name resourcehub-db \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=resourcehub \
  -e MYSQL_USER=app_user \
  -e MYSQL_PASSWORD=app_password \
  -p 3306:3306 \
  mysql:8.0
```

---

## Configuration

### Environment Variables
Edit `.env` file to customize:
- Database credentials
- API ports
- SSL settings
- Upload limits

### Development vs Production
- **Development**: `start-dev.bat`
- **Production**: `start-prod.bat`

---

## Troubleshooting

### Port Conflicts
If ports are in use, modify `.env`:
```env
FRONTEND_PORT=3001
BACKEND_PORT=9091
DB_PORT=3307
```

### Docker Issues
```cmd
# Reset everything
docker-compose down -v
docker system prune -f
start-dev.bat
```

### Permission Issues (Windows)
Run Command Prompt as Administrator

---

## Next Steps
- Read [API Documentation](API.md)
- Learn about [Deployment](DEPLOY.md)
- Check [Development Guide](DEVELOPMENT.md)
