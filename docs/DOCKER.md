# Docker Guide - Upsylon Vue.js 3 DDD Template

Ce guide explique comment containeriser et déployer l'application Vue.js 3 avec Docker.

## 📋 Prérequis

- Docker (version 20.10 ou supérieure)
- Docker Compose (version 2.0 ou supérieure)

## 🏗️ Architecture Docker

Le projet utilise une approche **multi-stage** pour optimiser la taille de l'image :

1. **Stage Builder** : Compile l'application Vue.js
2. **Stage Production** : Sert l'application avec Nginx

### Fichiers Docker

- `Dockerfile` : Image de production optimisée
- `Dockerfile.dev` : Image de développement avec hot-reload
- `docker-compose.yml` : Orchestration des services
- `nginx.conf` : Configuration Nginx pour SPA
- `.dockerignore` : Exclusion de fichiers du build

## 🚀 Utilisation

### Mode Production

#### Build de l'image

```bash
docker build -t upsylon-vuejs3-app:latest .
```

#### Lancer le container

```bash
docker run -d -p 8080:80 --name upsylon-app upsylon-vuejs3-app:latest
```

L'application sera accessible sur `http://localhost:8080`

#### Avec Docker Compose

```bash
docker-compose up -d
```

#### Arrêter le container

```bash
docker-compose down
```

### Mode Développement

Pour le développement avec hot-reload :

```bash
docker-compose --profile dev up app-dev
```

L'application sera accessible sur `http://localhost:5173` avec rechargement automatique.

## 🛠️ Scripts d'aide

Pour simplifier l'utilisation de Docker, des scripts d'aide sont fournis :

### Windows (PowerShell)

```powershell
# Afficher l'aide
.\docker-helper.ps1 help

# Build et run en production
.\docker-helper.ps1 build
.\docker-helper.ps1 run

# Build et run en développement
.\docker-helper.ps1 build-dev
.\docker-helper.ps1 run-dev

# Voir les logs
.\docker-helper.ps1 logs

# Arrêter les containers
.\docker-helper.ps1 stop

# Nettoyer tout
.\docker-helper.ps1 clean
```

### Linux/macOS (Makefile)

```bash
# Afficher l'aide
make help

# Build et run en production
make build
make run

# Build et run en développement
make build-dev
make run-dev

# Voir les logs
make logs

# Arrêter les containers
make stop

# Nettoyer tout
make clean

# Utiliser docker-compose
make compose-up
make compose-down
```

## 🔧 Commandes Utiles

### Voir les logs

```bash
docker-compose logs -f app
```

### Rebuild l'image

```bash
docker-compose build --no-cache
```

### Accéder au container

```bash
docker exec -it upsylon-vuejs3-app sh
```

### Vérifier la santé du container

```bash
docker ps
```

Le container inclut un health check qui vérifie automatiquement son état.

## 📊 Optimisations

### Taille de l'image

- Utilisation d'**Alpine Linux** (images légères)
- **Multi-stage build** pour exclure les dépendances de développement
- `.dockerignore` pour réduire le contexte de build

### Performance

- **Gzip compression** activée dans Nginx
- **Cache des assets statiques** (1 an)
- **Health check** pour monitoring

### Sécurité

- Headers de sécurité configurés :
  - `X-Frame-Options`
  - `X-Content-Type-Options`
  - `X-XSS-Protection`

## 🌐 Variables d'environnement

Pour configurer l'application, créez un fichier `.env` :

```env
NODE_ENV=production
VITE_API_URL=https://api.example.com
```

Puis modifiez le `docker-compose.yml` :

```yaml
environment:
  - NODE_ENV=${NODE_ENV}
  - VITE_API_URL=${VITE_API_URL}
```

## 🔍 Troubleshooting

### L'application ne démarre pas

Vérifiez les logs :

```bash
docker logs upsylon-vuejs3-app
```

### Port déjà utilisé

Changez le port dans `docker-compose.yml` :

```yaml
ports:
  - '3000:80' # Au lieu de 8080:80
```

### Problèmes de build

Nettoyez le cache Docker :

```bash
docker system prune -a
```

## 📦 Déploiement

### Registry Docker

#### Tag de l'image

```bash
docker tag upsylon-vuejs3-app:latest registry.example.com/upsylon-vuejs3-app:latest
```

#### Push vers le registry

```bash
docker push registry.example.com/upsylon-vuejs3-app:latest
```

### Cloud Platforms

#### Docker Hub

```bash
docker tag upsylon-vuejs3-app:latest username/upsylon-vuejs3-app:latest
docker push username/upsylon-vuejs3-app:latest
```

#### AWS ECR

```bash
aws ecr get-login-password --region region | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.region.amazonaws.com
docker tag upsylon-vuejs3-app:latest aws_account_id.dkr.ecr.region.amazonaws.com/upsylon-vuejs3-app:latest
docker push aws_account_id.dkr.ecr.region.amazonaws.com/upsylon-vuejs3-app:latest
```

## 🎯 Best Practices

1. **Toujours utiliser des tags de version** plutôt que `latest` en production
2. **Scanner les images** pour les vulnérabilités :
   ```bash
   docker scan upsylon-vuejs3-app:latest
   ```
3. **Limiter les ressources** du container :
   ```yaml
   deploy:
     resources:
       limits:
         cpus: '0.5'
         memory: 512M
   ```
4. **Utiliser des secrets** pour les données sensibles (pas de variables d'environnement)

## 📝 Notes

- L'image de production finale fait environ **50-60 MB** grâce à Alpine et multi-stage build
- Le health check vérifie l'application toutes les 30 secondes
- Nginx est configuré pour gérer le routing SPA (toutes les routes redirigent vers `index.html`)
