# Shared

Ce dossier contient le code partagé entre les différents modules (Shared Kernel en DDD).

## Structure

```
shared/
├── domain/           # Entités, Value Objects, Interfaces partagées
├── infrastructure/   # Utilitaires techniques partagés (HTTP client, etc.)
└── ui/              # Composants UI réutilisables
```

## Exemples d'Utilisation

### Domain

- Types communs
- Interfaces de base
- Value Objects réutilisables (Email, Money, etc.)

### Infrastructure

- Client HTTP
- Gestion des erreurs
- Utilitaires de validation

### UI

- Composants de base (Button, Input, etc.)
- Hooks/Composables partagés
- Directives Vue communes

## Règles

- Ne pas créer de dépendances circulaires
- Le code ici doit être générique et réutilisable
- Éviter de mettre trop de logique métier spécifique
