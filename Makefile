# Makefile for Upsylon Vue.js 3 DDD Template Docker operations

.PHONY: help build run stop clean dev test

# Variables
IMAGE_NAME := upsylon-vuejs3-app
CONTAINER_NAME := upsylon-app
DEV_CONTAINER_NAME := upsylon-app-dev
PORT := 8080
DEV_PORT := 5173

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build production Docker image
	docker build -t $(IMAGE_NAME):latest .

build-dev: ## Build development Docker image
	docker build -f Dockerfile.dev -t $(IMAGE_NAME):dev .

run: ## Run production container
	docker run -d -p $(PORT):80 --name $(CONTAINER_NAME) $(IMAGE_NAME):latest
	@echo "Application running at http://localhost:$(PORT)"

run-dev: ## Run development container with hot-reload
	docker run -d -p $(DEV_PORT):5173 \
		-v $$(pwd)/src:/app/src \
		-v $$(pwd)/public:/app/public \
		--name $(DEV_CONTAINER_NAME) $(IMAGE_NAME):dev
	@echo "Development server running at http://localhost:$(DEV_PORT)"

stop: ## Stop and remove production container
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

stop-dev: ## Stop and remove development container
	docker stop $(DEV_CONTAINER_NAME) || true
	docker rm $(DEV_CONTAINER_NAME) || true

logs: ## Show production container logs
	docker logs -f $(CONTAINER_NAME)

logs-dev: ## Show development container logs
	docker logs -f $(DEV_CONTAINER_NAME)

shell: ## Open shell in production container
	docker exec -it $(CONTAINER_NAME) sh

shell-dev: ## Open shell in development container
	docker exec -it $(DEV_CONTAINER_NAME) sh

clean: ## Remove all containers and images
	docker stop $(CONTAINER_NAME) $(DEV_CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) $(DEV_CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME):latest $(IMAGE_NAME):dev || true

compose-up: ## Start services with docker-compose (production)
	docker-compose up -d

compose-dev: ## Start services with docker-compose (development)
	docker-compose --profile dev up -d

compose-down: ## Stop docker-compose services
	docker-compose down

compose-logs: ## Show docker-compose logs
	docker-compose logs -f

rebuild: clean build run ## Clean, rebuild and run production container

rebuild-dev: stop-dev build-dev run-dev ## Clean, rebuild and run development container

health: ## Check container health status
	docker inspect --format='{{.State.Health.Status}}' $(CONTAINER_NAME)

test: ## Test the application endpoint
	curl -I http://localhost:$(PORT)

prune: ## Remove all unused Docker resources
	docker system prune -af
