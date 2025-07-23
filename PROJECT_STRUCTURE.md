# 📁 Simplified ResourceHub Project Structure

## Current Structure (Simplified)
```
ResourceHub/
├── 🚀 Quick Start Files
│   ├── setup.bat                 # One-click setup
│   ├── start-dev.bat            # Start development
│   ├── start-prod.bat           # Start production
│   └── README.md                # Main documentation
│
├── 🎨 Frontend (React + Vite)
│   ├── src/                     # Source code
│   ├── public/                  # Static assets
│   ├── package.json             # Dependencies
│   ├── vite.config.ts          # Build config
│   └── Dockerfile              # Container config
│
├── ⚡ Backend (Ballerina)
│   ├── modules/                 # Business logic
│   ├── resources/              # SQL scripts & certificates
│   ├── main.bal                # Entry point
│   ├── Ballerina.toml          # Project config
│   └── Dockerfile              # Container config
│
├── 🐳 Docker & Deployment
│   ├── docker-compose.yml      # Main compose file
│   ├── .env                    # Environment variables
│   └── nginx.conf              # Production proxy
│
├── 📊 Data & Storage
│   ├── database/               # SQL scripts
│   └── uploads/                # File storage
│
└── 📚 Documentation
    ├── API.md                  # API documentation
    ├── SETUP.md               # Setup guide
    └── DEPLOY.md              # Deployment guide
```

## Key Simplifications Made:

### 1. ✅ Consolidated Docker Files
- Single `docker-compose.yml` with dev/prod profiles
- Removed separate dev/prod compose files

### 2. ✅ Unified Environment Management
- Single `.env` file for all environments
- Environment-specific variables via profiles

### 3. ✅ Streamlined Scripts
- `start-dev.bat` - One command to start development
- `start-prod.bat` - One command to deploy production
- `setup.bat` - One-time setup script

### 4. ✅ Organized Documentation
- Moved all docs to `/docs` folder
- Clear, focused documentation files

### 5. ✅ Simplified Data Management
- Combined database scripts in `/database`
- Unified storage in `/uploads`

### 6. ✅ Removed Complexity
- Eliminated redundant folders (`logs/`, `monitoring/`, `backups/`)
- Simplified build scripts
- Consolidated configuration files

## New Quick Commands:

```cmd
# Setup (run once)
setup.bat

# Development
start-dev.bat

# Production
start-prod.bat

# Run tests
test.bat
```

## Benefits:
- 🎯 **Clearer structure** - Easy to navigate
- 🚀 **Faster setup** - One-command operations
- 📝 **Better documentation** - Focused and organized
- 🔧 **Easier maintenance** - Fewer configuration files
- 👥 **Developer friendly** - Intuitive folder names
