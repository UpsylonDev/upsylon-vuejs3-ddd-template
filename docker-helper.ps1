# Docker Helper Script for Windows
# Usage: .\docker-helper.ps1 [command]

param(
    [Parameter(Position=0)]
    [string]$Command = "help"
)

$ImageName = "upsylon-vuejs3-app"
$ContainerName = "upsylon-app"
$DevContainerName = "upsylon-app-dev"
$Port = 8080
$DevPort = 5173

function Show-Help {
    Write-Host "Available commands:" -ForegroundColor Cyan
    Write-Host "  build         - Build production Docker image" -ForegroundColor Green
    Write-Host "  build-dev     - Build development Docker image" -ForegroundColor Green
    Write-Host "  run           - Run production container" -ForegroundColor Green
    Write-Host "  run-dev       - Run development container with hot-reload" -ForegroundColor Green
    Write-Host "  stop          - Stop and remove production container" -ForegroundColor Green
    Write-Host "  stop-dev      - Stop and remove development container" -ForegroundColor Green
    Write-Host "  logs          - Show production container logs" -ForegroundColor Green
    Write-Host "  logs-dev      - Show development container logs" -ForegroundColor Green
    Write-Host "  shell         - Open shell in production container" -ForegroundColor Green
    Write-Host "  shell-dev     - Open shell in development container" -ForegroundColor Green
    Write-Host "  clean         - Remove all containers and images" -ForegroundColor Green
    Write-Host "  compose-up    - Start services with docker-compose (production)" -ForegroundColor Green
    Write-Host "  compose-dev   - Start services with docker-compose (development)" -ForegroundColor Green
    Write-Host "  compose-down  - Stop docker-compose services" -ForegroundColor Green
    Write-Host "  health        - Check container health status" -ForegroundColor Green
    Write-Host "  test          - Test the application endpoint" -ForegroundColor Green
    Write-Host "  help          - Show this help message" -ForegroundColor Green
}

function Build-Production {
    Write-Host "Building production Docker image..." -ForegroundColor Cyan
    docker build -t "${ImageName}:latest" .
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Production image built successfully" -ForegroundColor Green
    }
}

function Build-Development {
    Write-Host "Building development Docker image..." -ForegroundColor Cyan
    docker build -f Dockerfile.dev -t "${ImageName}:dev" .
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Development image built successfully" -ForegroundColor Green
    }
}

function Run-Production {
    Write-Host "Starting production container..." -ForegroundColor Cyan
    docker run -d -p "${Port}:80" --name $ContainerName "${ImageName}:latest"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Application running at http://localhost:$Port" -ForegroundColor Green
    }
}

function Run-Development {
    Write-Host "Starting development container..." -ForegroundColor Cyan
    $CurrentDir = (Get-Location).Path
    docker run -d -p "${DevPort}:5173" `
        -v "${CurrentDir}/src:/app/src" `
        -v "${CurrentDir}/public:/app/public" `
        --name $DevContainerName "${ImageName}:dev"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Development server running at http://localhost:$DevPort" -ForegroundColor Green
    }
}

function Stop-Production {
    Write-Host "Stopping production container..." -ForegroundColor Cyan
    docker stop $ContainerName 2>$null
    docker rm $ContainerName 2>$null
    Write-Host "✓ Production container stopped" -ForegroundColor Green
}

function Stop-Development {
    Write-Host "Stopping development container..." -ForegroundColor Cyan
    docker stop $DevContainerName 2>$null
    docker rm $DevContainerName 2>$null
    Write-Host "✓ Development container stopped" -ForegroundColor Green
}

function Show-Logs {
    Write-Host "Showing production container logs..." -ForegroundColor Cyan
    docker logs -f $ContainerName
}

function Show-LogsDev {
    Write-Host "Showing development container logs..." -ForegroundColor Cyan
    docker logs -f $DevContainerName
}

function Open-Shell {
    Write-Host "Opening shell in production container..." -ForegroundColor Cyan
    docker exec -it $ContainerName sh
}

function Open-ShellDev {
    Write-Host "Opening shell in development container..." -ForegroundColor Cyan
    docker exec -it $DevContainerName sh
}

function Clean-All {
    Write-Host "Cleaning all containers and images..." -ForegroundColor Cyan
    docker stop $ContainerName $DevContainerName 2>$null
    docker rm $ContainerName $DevContainerName 2>$null
    docker rmi "${ImageName}:latest" "${ImageName}:dev" 2>$null
    Write-Host "✓ Cleanup completed" -ForegroundColor Green
}

function Compose-Up {
    Write-Host "Starting docker-compose services (production)..." -ForegroundColor Cyan
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Services started successfully" -ForegroundColor Green
    }
}

function Compose-Dev {
    Write-Host "Starting docker-compose services (development)..." -ForegroundColor Cyan
    docker-compose --profile dev up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Development services started successfully" -ForegroundColor Green
    }
}

function Compose-Down {
    Write-Host "Stopping docker-compose services..." -ForegroundColor Cyan
    docker-compose down
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Services stopped successfully" -ForegroundColor Green
    }
}

function Check-Health {
    Write-Host "Checking container health..." -ForegroundColor Cyan
    $health = docker inspect --format='{{.State.Health.Status}}' $ContainerName 2>$null
    if ($health) {
        Write-Host "Health status: $health" -ForegroundColor $(if ($health -eq "healthy") { "Green" } else { "Yellow" })
    } else {
        Write-Host "Container not running or health check not configured" -ForegroundColor Red
    }
}

function Test-Endpoint {
    Write-Host "Testing application endpoint..." -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:$Port" -Method Head -UseBasicParsing
        Write-Host "✓ Application is responding (Status: $($response.StatusCode))" -ForegroundColor Green
    } catch {
        Write-Host "✗ Application is not responding" -ForegroundColor Red
    }
}

# Main command dispatcher
switch ($Command.ToLower()) {
    "build" { Build-Production }
    "build-dev" { Build-Development }
    "run" { Run-Production }
    "run-dev" { Run-Development }
    "stop" { Stop-Production }
    "stop-dev" { Stop-Development }
    "logs" { Show-Logs }
    "logs-dev" { Show-LogsDev }
    "shell" { Open-Shell }
    "shell-dev" { Open-ShellDev }
    "clean" { Clean-All }
    "compose-up" { Compose-Up }
    "compose-dev" { Compose-Dev }
    "compose-down" { Compose-Down }
    "health" { Check-Health }
    "test" { Test-Endpoint }
    "help" { Show-Help }
    default {
        Write-Host "Unknown command: $Command" -ForegroundColor Red
        Show-Help
    }
}
