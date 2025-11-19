# Module Welcome

Ce module illustre l'architecture DDD avec un exemple de compteur.

## Structure

```
Welcome/
├── domain/              # Logique métier pure
│   ├── Counter.ts       # Entité Counter avec règles métier
│   └── Counter.test.ts  # Tests unitaires du domaine
├── application/         # Use cases
│   └── useCounter.ts    # Composable pour gérer le compteur
├── infrastructure/      # Implémentations techniques (vide pour cet exemple)
└── ui/                  # Interface utilisateur
    └── components/
        ├── HelloWorld.vue      # Composant de démonstration
        └── HelloWorld.test.ts  # Tests du composant
```

## Flux de Données

```
UI (HelloWorld.vue)
    ↓ utilise
Application (useCounter.ts)
    ↓ utilise
Domain (Counter.ts)
```

## Exemple d'Utilisation

### 1. Domain Layer

```typescript
// Counter.ts - Entité métier immuable
const counter = Counter.create(0);
const incremented = counter.increment(); // Retourne un nouveau Counter
```

### 2. Application Layer

```typescript
// useCounter.ts - Use case exposant les opérations
const { count, increment, decrement, reset } = useCounter(0);
```

### 3. UI Layer

```vue
<!-- HelloWorld.vue - Composant Vue -->
<template>
  <button @click="increment">+</button>
  <span>{{ count }}</span>
  <button @click="decrement">-</button>
</template>
```

## Règles Métier

- Le compteur ne peut pas être négatif
- L'entité Counter est **immuable** (chaque opération retourne une nouvelle instance)
- La validation est dans le domaine, pas dans l'UI

## Tests

```bash
# Tests unitaires du domaine
pnpm test src/modules/Welcome/domain

# Tests du composant
pnpm test src/modules/Welcome/ui
```
