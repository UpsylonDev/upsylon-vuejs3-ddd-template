# Docker Quick Reference

## 🚀 Démarrage rapide

```bash
# Production
docker-compose up -d
# → http://localhost:8080

# Développement
docker-compose --profile dev up -d
# → http://localhost:5173
```

## 📦 Build

```bash
# Production
docker build -t upsylon-vuejs3-app:latest .

# Développement
docker build -f Dockerfile.dev -t upsylon-vuejs3-app:dev .

# Sans cache
docker build --no-cache -t upsylon-vuejs3-app:latest .
```

## ▶️ Run

```bash
# Production
docker run -d -p 8080:80 --name upsylon-app upsylon-vuejs3-app:latest

# Développement avec volumes
docker run -d -p 5173:5173 \
  -v $(pwd)/src:/app/src \
  -v $(pwd)/public:/app/public \
  --name upsylon-app-dev upsylon-vuejs3-app:dev
```

## 🛑 Stop & Clean

```bash
# Arrêter
docker stop upsylon-app

# Supprimer
docker rm upsylon-app

# Arrêter et supprimer
docker stop upsylon-app && docker rm upsylon-app

# Tout nettoyer
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```

## 📋 Logs & Debug

```bash
# Voir les logs
docker logs upsylon-app

# Suivre les logs en temps réel
docker logs -f upsylon-app

# Shell dans le container
docker exec -it upsylon-app sh

# Inspecter le container
docker inspect upsylon-app

# Health check
docker inspect --format='{{.State.Health.Status}}' upsylon-app
```

## 🔍 Informations

```bash
# Lister les containers
docker ps -a

# Lister les images
docker images

# Taille de l'image
docker images upsylon-vuejs3-app

# Utilisation des ressources
docker stats upsylon-app
```

## 🐳 Docker Compose

```bash
# Démarrer
docker-compose up -d

# Arrêter
docker-compose down

# Rebuild
docker-compose build --no-cache

# Logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart app
```

## 🏷️ Tags & Registry

```bash
# Tag
docker tag upsylon-vuejs3-app:latest username/upsylon-vuejs3-app:v1.0.0

# Push
docker push username/upsylon-vuejs3-app:v1.0.0

# Pull
docker pull username/upsylon-vuejs3-app:v1.0.0
```

## 🧹 Maintenance

```bash
# Supprimer les images non utilisées
docker image prune -a

# Supprimer les volumes non utilisés
docker volume prune

# Nettoyer tout
docker system prune -a --volumes

# Voir l'espace disque
docker system df
```

## 🔐 Sécurité

```bash
# Scanner les vulnérabilités
docker scan upsylon-vuejs3-app:latest

# Vérifier les layers
docker history upsylon-vuejs3-app:latest

# Exporter l'image
docker save upsylon-vuejs3-app:latest > app.tar

# Importer l'image
docker load < app.tar
```

## 🌐 Réseau

```bash
# Lister les réseaux
docker network ls

# Inspecter un réseau
docker network inspect bridge

# Créer un réseau
docker network create app-network

# Connecter un container
docker network connect app-network upsylon-app
```

## 💾 Volumes

```bash
# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect volume_name

# Créer un volume
docker volume create app-data

# Supprimer un volume
docker volume rm app-data
```

## 🎯 Commandes utiles

```bash
# Copier des fichiers depuis le container
docker cp upsylon-app:/usr/share/nginx/html/index.html ./

# Copier des fichiers vers le container
docker cp ./file.txt upsylon-app:/tmp/

# Redémarrer le container
docker restart upsylon-app

# Mettre en pause
docker pause upsylon-app

# Reprendre
docker unpause upsylon-app
```

## 📊 Monitoring

```bash
# Stats en temps réel
docker stats

# Top des processus
docker top upsylon-app

# Events
docker events --filter container=upsylon-app

# Diff des fichiers
docker diff upsylon-app
```

## 🔄 Multi-stage

```bash
# Build jusqu'à un stage spécifique
docker build --target builder -t upsylon-vuejs3-app:builder .

# Build avec args
docker build --build-arg NODE_VERSION=20 -t upsylon-vuejs3-app:latest .
```

## 🚨 Troubleshooting

```bash
# Container ne démarre pas
docker logs upsylon-app
docker inspect upsylon-app

# Port déjà utilisé
docker run -d -p 3000:80 --name upsylon-app upsylon-vuejs3-app:latest

# Problème de permissions
docker run --user $(id -u):$(id -g) ...

# Rebuild complet
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
