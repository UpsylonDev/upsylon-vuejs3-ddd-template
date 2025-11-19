# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite template using Domain-Driven Design (DDD) principles with Pinia for state management. It provides a modern frontend development setup with strict TypeScript configuration and Vue 3's `<script setup>` SFC syntax.

## Development Commands

### Building and Running
- `npm run dev` (or `pnpm dev`) - Start the development server with Vite
- `npm run build` (or `pnpm build`) - Build the project with TypeScript checking and Vite optimization
- `npm run preview` (or `pnpm preview`) - Preview the production build locally

### Package Manager
The project uses **pnpm** as the package manager (see `pnpm-workspace.yaml`). Use `pnpm` commands instead of `npm` or `yarn`.

## Project Structure

```
src/
  ├── main.ts           # Vue app entry point
  ├── App.vue           # Root component
  ├── style.css         # Global styles
  ├── components/       # Vue SFC components
  └── stores/           # Pinia stores (composition API style)
public/                 # Static assets
vite.config.ts         # Vite configuration (Vue plugin enabled)
tsconfig.json          # TypeScript root config (references other configs)
tsconfig.app.json      # App-level TypeScript configuration
tsconfig.node.json     # Build tools TypeScript configuration
```

## TypeScript Configuration

The project uses strict TypeScript settings via `@vue/tsconfig/tsconfig.dom.json`:

- **Strict mode enabled** - All strict type checking options active
- **Unused detection** - Detects and flags unused local variables and parameters
- **Side-effect imports** - Warns about unchecked side-effect imports
- **DOM types** - Includes Vite client types for HMR and asset imports

Key compiler options in `tsconfig.app.json`:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noUncheckedSideEffectImports: true`
- `noFallthroughCasesInSwitch: true`
- `erasableSyntaxOnly: true`

## Architecture Notes

- **Build pipeline**: Uses TypeScript compiler (`vue-tsc`) before Vite bundling for type safety
- **Module system**: ES modules (`"type": "module"` in package.json)
- **Vue version**: Vue 3 with Composition API (`<script setup>` syntax)

## State Management

The project uses **Pinia** for state management with the composition API pattern:

- **Store Definition**: Stores are defined using `defineStore()` with composition API functions
- **Reactive State**: Use `ref()` and `computed()` from Vue for reactive state and derived values
- **Store Location**: Stores are organized in the `src/stores/` directory
- **Store Usage**: Import and use stores with `const store = useStoreName()`

Example store pattern:
```typescript
export const useMyStore = defineStore('myStore', () => {
  const state = ref(initialValue)
  const derived = computed(() => state.value * 2)
  function update(value) { state.value = value }
  return { state, derived, update }
})
```

## Git Hooks & Code Quality

The project uses **Husky** for Git hooks to ensure comprehensive commits and code quality:

### Husky Configuration
- **Pre-commit hook** - Runs `lint-staged` before each commit
- **Commit-msg hook** - Validates commit messages using custom helper script with detailed error messages
- **Automatic setup** - Husky is initialized via the `prepare` script
- **Custom error messaging** - When a commit message is rejected, a helpful message displays:
  - The exact cause of rejection
  - Complete list of allowed commit types with descriptions
  - Valid and invalid examples
  - Proper format requirements

### Lint-Staged
Automatically runs checks on staged files before committing:
- **TypeScript files** (`.ts`, `.tsx`, `.vue`) - Type checking with `vue-tsc`
- **All files** (`.js`, `.ts`, `.vue`, `.json`, `.md`) - Auto-formatting with Prettier

### Commit Message Convention
The project enforces conventional commits using `@commitlint/config-conventional`:

**Format**: `type(scope): subject`

**Allowed types**:
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
- `feat(auth): add login functionality`
- `fix(store): correct state mutation in user store`
- `docs(readme): update installation instructions`

**Rules**:
- Type is required and must be lowercase
- Subject must not be empty
- Subject must not end with a period
- Subject must not start with uppercase

### Prettier Configuration
Code formatting settings (`.prettierrc.json`):
- Single quotes
- 2-space indentation
- Semicolons enabled
- 100 character line width
- ES5 trailing commas
- LF line endings

## Key Dependencies

### Production
- `vue@^3.5.24` - Vue framework
- `pinia@^3.0.4` - State management library

### Development
- `vite@^7.2.2` - Build tool and dev server
- `@vitejs/plugin-vue@^6.0.1` - Vue support in Vite
- `typescript@~5.9.3` - TypeScript compiler
- `vue-tsc@^3.1.3` - TypeScript type checking for Vue

### Code Quality & Git Hooks
- `husky@^9.1.7` - Git hooks manager
- `@commitlint/cli@^20.1.0` - Commit message linter
- `@commitlint/config-conventional@^20.0.0` - Conventional commits configuration
- `lint-staged@^16.2.6` - Run commands on staged files
- `prettier@^3.6.2` - Code formatter

## IMPORTANT
- When structural changes are made, update the README.md
- All commits must follow conventional commit format
- Pre-commit hooks will automatically format code and run type checks
