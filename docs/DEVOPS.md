# DevOps Guide for ResourceHub

## Overview

This guide provides comprehensive DevOps practices for the ResourceHub application, ensuring platform independence, scalability, and maintainability.

## Prerequisites

- Docker & Docker Compose
- Git
- Make (optional but recommended)
- Node.js 20+ (for local development)
- Ballerina (for local development)

## Quick Start

### Development Environment

```bash
# Using Make (recommended)
make setup-dev
make dev

# Or using scripts
chmod +x scripts/dev.sh
./scripts/dev.sh

# Windows
scripts\dev.bat
```

### Production Environment

```bash
# Setup
make setup-prod
# Edit .env.prod with your configuration
make prod

# Or using scripts
chmod +x scripts/deploy.sh
./scripts/deploy.sh production
```

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │    Frontend     │    │    Backend      │
│     (Nginx)     │────│    (React)      │────│   (Ballerina)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                       │
                       ┌─────────────────┐    ┌─────────────────┐
                       │     Redis       │    │     MySQL       │
                       │   (Caching)     │    │   (Database)    │
                       └─────────────────┘    └─────────────────┘
```

## Development Workflow

### 1. Environment Setup

```bash
# Clone repository
git clone <repository-url>
cd ResourceHub

# Setup development environment
make setup-dev

# Edit .env.dev with your settings
nano .env.dev
```

### 2. Development

```bash
# Start development servers
make dev

# Or start in background
make dev-detached

# Follow logs
make dev-logs

# Run tests
make test

# Linting
make lint
```

### 3. Building

```bash
# Build all services
make build

# Build specific service
make build-frontend
make build-backend
```

## Production Deployment

### 1. Environment Configuration

```bash
# Setup production environment
make setup-prod

# Configure production variables
nano .env.prod
```

### 2. Deployment

```bash
# Deploy to production
make prod

# Check health
make health

# View logs
make prod-logs
```

### 3. Database Management

```bash
# Backup database
make backup

# Restore database
make restore BACKUP_FILE=backup_20240724_120000.sql
```

## Docker Configurations

### Development
- **Frontend**: Hot reloading enabled, volume mounts for live code changes
- **Backend**: Debug mode enabled, volume mounts for live code changes
- **Database**: Development credentials, exposed ports

### Production
- **Frontend**: Optimized build, Nginx with security headers
- **Backend**: Production build, non-root user, health checks
- **Database**: Persistent volumes, secure credentials
- **Monitoring**: Prometheus integration (optional)

## Environment Variables

### Development (.env.dev)
```bash
DB_HOST=db-dev
DB_USER=dev_user
DB_PASSWORD=dev_password
LOG_LEVEL=DEBUG
```

### Production (.env.prod)
```bash
DB_HOST=db
DB_USER=prod_user
DB_PASSWORD=secure_password
LOG_LEVEL=INFO
JWT_SECRET=very_secure_secret
```

## Security Considerations

### 1. Container Security
- Non-root users in production containers
- Minimal base images
- Regular security scans with Trivy

### 2. Network Security
- Internal Docker networks
- Rate limiting on API endpoints
- HTTPS in production

### 3. Data Security
- Environment variable management
- Database credentials rotation
- Backup encryption

## Monitoring & Observability

### Health Checks
```bash
# Manual health check
make health

# Automated health checks in Docker Compose
# Frontend: http://frontend/health
# Backend: http://backend:9090/health
```

### Logging
```bash
# View all logs
make logs

# Follow production logs
make prod-logs

# Service-specific logs
docker-compose logs frontend
docker-compose logs backend
```

### Metrics (Optional)
- Prometheus for metrics collection
- Grafana for visualization
- Custom application metrics

## CI/CD Pipeline

### GitHub Actions Workflow

1. **Test Stage**
   - Frontend linting and tests
   - Backend tests
   - Security scanning

2. **Build Stage**
   - Docker image building
   - Image security scanning
   - Push to registry

3. **Deploy Stage**
   - Production deployment
   - Health checks
   - Rollback capabilities

### Triggering Deployments
- Push to `main` branch triggers production deployment
- Pull requests trigger test and build stages
- Manual deployment approval for production

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check ports in use
   netstat -tulpn | grep :3000
   
   # Modify ports in docker-compose files
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   make logs | grep db
   
   # Verify environment variables
   cat .env.dev
   ```

3. **Build Failures**
   ```bash
   # Clean and rebuild
   make clean
   make build
   ```

### Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Cache static assets
   - Bundle optimization

2. **Backend**
   - Connection pooling
   - Caching with Redis
   - Database indexing

3. **Database**
   - Query optimization
   - Regular backups
   - Connection limits

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration
- Database read replicas
- Redis clustering

### Vertical Scaling
- Resource limits in Docker Compose
- Memory and CPU optimization
- Database tuning

## Backup & Recovery

### Automated Backups
```bash
# Schedule daily backups
0 2 * * * /path/to/project/scripts/backup.sh
```

### Disaster Recovery
1. Database restoration
2. File system recovery
3. Service health verification

## Contributing

### Development Setup
1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests: `make test`
5. Submit pull request

### Best Practices
- Follow semantic versioning
- Write comprehensive tests
- Update documentation
- Security-first approach

## Support

For issues and questions:
1. Check troubleshooting section
2. Review logs: `make logs`
3. Create GitHub issue
4. Contact DevOps team
