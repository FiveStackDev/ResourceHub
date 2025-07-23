# Platform-independent Makefile for ResourceHub
.PHONY: help dev prod build test clean logs health deploy-dev deploy-prod backup restore

# Default target
.DEFAULT_GOAL := help

# Variables
PROJECT_NAME = resourcehub
DEV_COMPOSE_FILE = docker-compose.dev.yml
PROD_COMPOSE_FILE = docker-compose.prod.yml

help: ## Show this help message
	@echo "ResourceHub DevOps Commands"
	@echo "=========================="
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development Commands

dev: ## Start development environment
	@echo "🚀 Starting development environment..."
	@docker-compose -f $(DEV_COMPOSE_FILE) up --build

dev-detached: ## Start development environment in background
	@echo "🚀 Starting development environment in background..."
	@docker-compose -f $(DEV_COMPOSE_FILE) up -d --build

dev-logs: ## Follow development logs
	@docker-compose -f $(DEV_COMPOSE_FILE) logs -f

dev-stop: ## Stop development environment
	@echo "🛑 Stopping development environment..."
	@docker-compose -f $(DEV_COMPOSE_FILE) down

##@ Production Commands

prod: ## Start production environment
	@echo "🚀 Starting production environment..."
	@docker-compose -f $(PROD_COMPOSE_FILE) up -d --build

prod-logs: ## Follow production logs
	@docker-compose -f $(PROD_COMPOSE_FILE) logs -f

prod-stop: ## Stop production environment
	@echo "🛑 Stopping production environment..."
	@docker-compose -f $(PROD_COMPOSE_FILE) down

##@ Build Commands

build: ## Build all services
	@echo "🔨 Building all services..."
	@docker-compose -f $(DEV_COMPOSE_FILE) build

build-frontend: ## Build frontend only
	@echo "🔨 Building frontend..."
	@docker-compose -f $(DEV_COMPOSE_FILE) build frontend-dev

build-backend: ## Build backend only
	@echo "🔨 Building backend..."
	@docker-compose -f $(DEV_COMPOSE_FILE) build backend-dev

##@ Testing Commands

test: ## Run all tests
	@echo "🧪 Running tests..."
	@cd Front-End && npm test
	@cd Back-End && bal test

test-frontend: ## Run frontend tests
	@echo "🧪 Running frontend tests..."
	@cd Front-End && npm test

test-backend: ## Run backend tests
	@echo "🧪 Running backend tests..."
	@cd Back-End && bal test

lint: ## Run linting
	@echo "🔍 Running linting..."
	@cd Front-End && npm run lint

##@ Utility Commands

health: ## Check health of all services
	@echo "🏥 Checking service health..."
	@bash scripts/health-check.sh

logs: ## Show logs for all services
	@docker-compose -f $(DEV_COMPOSE_FILE) logs

clean: ## Clean up containers, images, and volumes
	@echo "🧹 Cleaning up..."
	@docker-compose -f $(DEV_COMPOSE_FILE) down -v --remove-orphans
	@docker-compose -f $(PROD_COMPOSE_FILE) down -v --remove-orphans
	@docker system prune -f

clean-all: ## Clean up everything including images
	@echo "🧹 Deep cleaning..."
	@docker-compose -f $(DEV_COMPOSE_FILE) down -v --remove-orphans --rmi all
	@docker-compose -f $(PROD_COMPOSE_FILE) down -v --remove-orphans --rmi all
	@docker system prune -af

##@ Database Commands

backup: ## Backup production database
	@echo "💾 Creating database backup..."
	@docker-compose -f $(PROD_COMPOSE_FILE) exec db mysqldump -u root -p$(DB_ROOT_PASSWORD) $(DB_NAME) > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql

restore: ## Restore database from backup (usage: make restore BACKUP_FILE=backup.sql)
	@echo "📥 Restoring database from $(BACKUP_FILE)..."
	@docker-compose -f $(PROD_COMPOSE_FILE) exec -T db mysql -u root -p$(DB_ROOT_PASSWORD) $(DB_NAME) < backups/$(BACKUP_FILE)

##@ Environment Setup

setup-dev: ## Setup development environment
	@echo "⚙️ Setting up development environment..."
	@cp .env.dev.example .env.dev
	@echo "✅ Created .env.dev file. Please edit it with your configuration."

setup-prod: ## Setup production environment
	@echo "⚙️ Setting up production environment..."
	@cp .env.prod.example .env.prod
	@echo "✅ Created .env.prod file. Please edit it with your configuration."

install-deps: ## Install all dependencies
	@echo "📦 Installing dependencies..."
	@cd Front-End && npm install
	@cd Back-End && bal pull

##@ Security Commands

security-scan: ## Run security scans
	@echo "🔒 Running security scans..."
	@trivy fs --security-checks vuln,config .

update-deps: ## Update dependencies
	@echo "📦 Updating dependencies..."
	@cd Front-End && npm update
	@cd Back-End && bal update
