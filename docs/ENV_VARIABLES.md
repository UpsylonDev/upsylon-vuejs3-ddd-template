# Variables d'environnement

Ce document liste toutes les variables d'environnement disponibles pour configurer l'application.

## 🌍 Variables Vite

Les variables d'environnement Vite doivent être préfixées par `VITE_` pour être accessibles dans le code client.

### Application

| Variable           | Description              | Valeur par défaut               | Exemple           |
| ------------------ | ------------------------ | ------------------------------- | ----------------- |
| `VITE_APP_TITLE`   | Titre de l'application   | `Upsylon Vue.js 3 DDD Template` | `Mon Application` |
| `VITE_APP_VERSION` | Version de l'application | `package.json version`          | `1.0.0`           |

### API

| Variable           | Description                   | Valeur par défaut | Exemple                   |
| ------------------ | ----------------------------- | ----------------- | ------------------------- |
| `VITE_API_URL`     | URL de l'API backend          | -                 | `https://api.example.com` |
| `VITE_API_TIMEOUT` | Timeout des requêtes API (ms) | `30000`           | `60000`                   |
| `VITE_API_KEY`     | Clé d'API (si nécessaire)     | -                 | `your-api-key`            |

### Feature Flags

| Variable                | Description                  | Valeur par défaut | Exemple |
| ----------------------- | ---------------------------- | ----------------- | ------- |
| `VITE_ENABLE_ANALYTICS` | Activer les analytics        | `false`           | `true`  |
| `VITE_ENABLE_DEBUG`     | Activer le mode debug        | `false`           | `true`  |
| `VITE_ENABLE_MOCK`      | Utiliser des données mockées | `false`           | `true`  |

## 🐳 Variables Docker

Ces variables sont utilisées pour la configuration Docker.

### Build

| Variable       | Description        | Valeur par défaut | Exemple |
| -------------- | ------------------ | ----------------- | ------- |
| `NODE_VERSION` | Version de Node.js | `20`              | `18`    |
| `PNPM_VERSION` | Version de pnpm    | `latest`          | `8.0.0` |

### Runtime

| Variable   | Description               | Valeur par défaut | Exemple       |
| ---------- | ------------------------- | ----------------- | ------------- |
| `NODE_ENV` | Environnement d'exécution | `production`      | `development` |
| `PORT`     | Port d'écoute (dev)       | `5173`            | `3000`        |

### Docker Compose

| Variable               | Description                  | Valeur par défaut | Exemple     |
| ---------------------- | ---------------------------- | ----------------- | ----------- |
| `COMPOSE_PROJECT_NAME` | Nom du projet Docker Compose | `upsylon-vuejs3`  | `my-app`    |
| `DOCKER_REGISTRY`      | Registry Docker              | `ghcr.io`         | `docker.io` |
| `DOCKER_IMAGE_TAG`     | Tag de l'image Docker        | `latest`          | `v1.0.0`    |

## 📝 Utilisation

### Développement local

Créez un fichier `.env` à la racine du projet :

```env
# .env
VITE_API_URL=http://localhost:3000/api
VITE_ENABLE_DEBUG=true
```

### Production avec Docker

#### Option 1: Fichier .env

```env
# .env
NODE_ENV=production
VITE_API_URL=https://api.production.com
VITE_ENABLE_ANALYTICS=true
```

Puis utilisez docker-compose :

```bash
docker-compose up -d
```

#### Option 2: Variables d'environnement

```bash
docker run -d \
  -e VITE_API_URL=https://api.production.com \
  -e VITE_ENABLE_ANALYTICS=true \
  -p 8080:80 \
  upsylon-vuejs3-app:latest
```

#### Option 3: Fichier .env avec docker-compose

Modifiez `docker-compose.yml` :

```yaml
services:
  app:
    env_file:
      - .env
    environment:
      - NODE_ENV=${NODE_ENV}
      - VITE_API_URL=${VITE_API_URL}
```

### Build-time vs Runtime

⚠️ **Important** : Les variables Vite sont injectées au moment du **build**, pas au runtime.

```bash
# ✅ Correct - Variables définies avant le build
VITE_API_URL=https://api.example.com pnpm build

# ❌ Incorrect - Les variables ne seront pas disponibles
pnpm build
VITE_API_URL=https://api.example.com pnpm preview
```

Pour Docker, définissez les variables dans le Dockerfile ou passez-les avec `--build-arg` :

```dockerfile
# Dockerfile
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
```

```bash
docker build --build-arg VITE_API_URL=https://api.example.com -t app .
```

## 🔒 Sécurité

### ⚠️ Ne jamais exposer de secrets

Les variables `VITE_*` sont **publiques** et accessibles dans le code client. Ne les utilisez jamais pour :

- ❌ Clés API secrètes
- ❌ Tokens d'authentification
- ❌ Mots de passe
- ❌ Clés de chiffrement

### ✅ Bonnes pratiques

1. **Utilisez des variables d'environnement différentes par environnement**

   ```
   .env.development
   .env.production
   .env.test
   ```

2. **Ajoutez .env au .gitignore**

   ```gitignore
   .env
   .env.local
   .env.*.local
   ```

3. **Utilisez .env.example comme template**

   ```bash
   cp .env.example .env
   # Puis éditez .env avec vos valeurs
   ```

4. **Pour les secrets, utilisez des solutions dédiées**
   - Docker secrets
   - Kubernetes secrets
   - HashiCorp Vault
   - AWS Secrets Manager

## 📖 Accès dans le code

### TypeScript

Créez un fichier de types pour l'autocomplétion :

```typescript
// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### Utilisation

```typescript
// Dans votre code
const apiUrl = import.meta.env.VITE_API_URL;
const isDebug = import.meta.env.VITE_ENABLE_DEBUG === 'true';

console.log('API URL:', apiUrl);
console.log('Debug mode:', isDebug);
```

### Valeurs par défaut

```typescript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');
```

## 🔍 Débogage

### Vérifier les variables disponibles

```typescript
console.log('Environment variables:', import.meta.env);
```

### Mode développement

En mode développement, Vite affiche les variables dans la console :

```bash
pnpm dev
# Les variables VITE_* seront listées
```

### Docker

```bash
# Variables dans le container
docker exec -it upsylon-app env | grep VITE

# Variables au build
docker build --build-arg VITE_API_URL=test -t app . --progress=plain
```
