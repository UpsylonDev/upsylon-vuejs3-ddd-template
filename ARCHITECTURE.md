# Architecture DDD - Vue 3 Template

Ce template suit les principes du **Domain-Driven Design (DDD)** pour organiser le code de manière modulaire et maintenable.

## Structure des Dossiers

```
src/
├── modules/          # Modules métier (bounded contexts)
│   └── Welcome/      # Exemple de module
│       ├── domain/           # Couche domaine (logique métier pure)
│       ├── application/      # Couche application (use cases)
│       ├── infrastructure/   # Couche infrastructure (API, persistence)
│       └── ui/              # Couche présentation (composants Vue)
│           └── components/
├── shared/           # Code partagé entre modules
│   ├── domain/
│   ├── infrastructure/
│   └── ui/
└── ui/              # Composants UI génériques (Design System)
```

## Les 4 Couches DDD

### 1. **Domain** (Domaine)

- Contient la logique métier pure
- Entités, Value Objects, Domain Services
- **Aucune dépendance** vers Vue, Pinia ou autre framework
- Exemple: `Counter.ts` - entité métier avec règles de validation

### 2. **Application** (Application)

- Use Cases et Services applicatifs
- Orchestre la logique du domaine
- Peut utiliser Vue (composables) mais reste indépendant de l'UI
- Exemple: `useCounter.ts` - composable qui utilise l'entité Counter

### 3. **Infrastructure** (Infrastructure)

- Implémentation des repositories
- Appels API, persistence, services externes
- Adapters et DTOs

### 4. **UI** (Interface Utilisateur)

- Composants Vue
- Stores Pinia spécifiques au module
- Utilise les use cases de la couche Application

## Exemple: Module Welcome

Le module `Welcome` illustre l'architecture avec un compteur:

1. **Domain**: `Counter.ts` - Entité avec logique métier (pas de valeurs négatives)
2. **Application**: `useCounter.ts` - Use case exposant les opérations
3. **UI**: `HelloWorld.vue` - Composant utilisant le use case

## Bonnes Pratiques

- ✅ La couche **Domain** ne doit jamais importer Vue ou Pinia
- ✅ La couche **Application** peut utiliser Vue (ref, computed) mais pas de composants
- ✅ La couche **UI** consomme uniquement la couche Application
- ✅ Utilisez l'alias `@/` pour les imports (ex: `@/modules/Welcome/domain/Counter`)

## Commandes

```bash
# Développement
pnpm dev

# Linting
pnpm lint

# Tests unitaires
pnpm test

# Tests E2E
pnpm test:e2e

# Build
pnpm build
```
