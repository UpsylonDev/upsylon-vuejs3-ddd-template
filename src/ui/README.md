# UI Components

Ce dossier contient les composants UI génériques qui forment le Design System de l'application.

## Structure

```
ui/
├── components/      # Composants réutilisables (Button, Input, Card, etc.)
├── layouts/         # Layouts de page
└── composables/     # Composables UI génériques
```

## Exemples

### Composants de Base

- Button
- Input
- Card
- Modal
- Dropdown

### Layouts

- MainLayout
- AuthLayout
- DashboardLayout

## Règles

- Les composants doivent être **agnostiques du domaine métier**
- Utiliser des props pour la configuration
- Documenter les props et events avec TypeScript
- Créer des stories Storybook si disponible
