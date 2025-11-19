# Vue 3 + TypeScript + Vite + Pinia

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## State Management with Pinia

This project includes [Pinia](https://pinia.vuejs.org/), Vue's official state management library. Pinia provides a simplified, more intuitive API compared to Vuex.

### Creating Stores

Create stores in the `src/stores/` directory using the composition API:

```typescript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMyStore = defineStore('myStore', () => {
  const state = ref(initialValue)
  const derived = computed(() => state.value * 2)

  function updateState(value: string) {
    state.value = value
  }

  return { state, derived, updateState }
})
```

### Using Stores in Components

```vue
<script setup lang="ts">
import { useMyStore } from '@/stores/myStore'

const store = useMyStore()
</script>

<template>
  <div>
    <p>{{ store.state }}</p>
    <p>{{ store.derived }}</p>
    <button @click="store.updateState('new value')">Update</button>
  </div>
</template>
```

### Key Features

- **Composition API**: Stores are defined using the composition API for better type inference
- **Devtools**: Pinia integrates with Vue Devtools for easy debugging
- **Module Organization**: Stores are naturally organized as separate modules in the `src/stores/` directory

For more information, visit the [Pinia Documentation](https://pinia.vuejs.org/).

## Git Hooks & Code Quality

This project uses Husky to enforce code quality standards and comprehensive commit messages.

### Pre-commit Checks

Before each commit, the following checks run automatically via `lint-staged`:

- **Type Checking**: All TypeScript and Vue files are checked for type errors
- **Code Formatting**: All staged files are automatically formatted with Prettier

### Commit Message Convention

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

**Format**: `type(scope): subject`

**Required Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `build` - Build system or dependencies changes
- `ci` - CI/CD changes
- `chore` - Other changes that don't modify src or test files
- `revert` - Revert a previous commit

**Examples**:
```bash
git commit -m "feat(auth): add user login functionality"
git commit -m "fix(store): correct state mutation in counter store"
git commit -m "docs(readme): update installation instructions"
git commit -m "refactor(components): simplify button component logic"
```

**Commit Message Rules**:
- Type must be lowercase and from the allowed list
- Subject cannot be empty
- Subject cannot end with a period
- Subject cannot start with uppercase

If your commit message doesn't follow these rules, the commit will be rejected with a detailed error message that includes:
- **The exact reason** for rejection
- **Complete list** of all allowed commit types with French descriptions
- **Examples** of valid and invalid commit messages
- **Format requirements** to help you correct your message quickly

### Code Formatting

Prettier is configured with the following settings:
- Single quotes
- 2-space indentation
- Semicolons enabled
- 100 character line width
- ES5 trailing commas
- LF line endings

You can manually format files by running:
```bash
pnpm exec prettier --write .
```

### Bypassing Hooks (Not Recommended)

In exceptional cases, you can bypass the hooks with:
```bash
git commit --no-verify -m "your message"
```

However, this is strongly discouraged as it defeats the purpose of maintaining code quality standards.
