# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 + TypeScript + Vite template using Domain-Driven Design (DDD) principles with Pinia for state management. It provides a modern frontend development setup with strict TypeScript configuration and Vue 3's `<script setup>` SFC syntax.

## Development Commands

### Building and Running

- `npm run dev` (or `pnpm dev`) - Start the development server with Vite
- `npm run build` (or `pnpm build`) - Build the project with TypeScript checking and Vite optimization
- `npm run preview` (or `pnpm preview`) - Preview the production build locally

### Testing

#### Unit Tests (Vitest)

- `npm run test` (or `pnpm test`) - Run unit tests in watch mode
- `npm run test:ui` (or `pnpm test:ui`) - Run unit tests with interactive UI
- `npm run test:run` (or `pnpm test:run`) - Run unit tests once
- `npm run test:coverage` (or `pnpm test:coverage`) - Run unit tests with coverage report

#### E2E Tests (Playwright)

- `npm run test:e2e` (or `pnpm test:e2e`) - Run e2e tests with Playwright
- `npm run test:e2e:ui` (or `pnpm test:e2e:ui`) - Run e2e tests in UI mode
- `npm run test:e2e:headed` (or `pnpm test:e2e:headed`) - Run e2e tests with visible browser
- `npm run test:e2e:debug` (or `pnpm test:e2e:debug`) - Run e2e tests in debug mode
- `npm run test:e2e:report` (or `pnpm test:e2e:report`) - Show the HTML test report

### Package Manager

The project uses **pnpm** as the package manager (see `pnpm-workspace.yaml`). Use `pnpm` commands instead of `npm` or `yarn`.

## Project Structure

```
src/
  ├── main.ts           # Vue app entry point
  ├── App.vue           # Root component
  ├── style.css         # Global styles
  ├── components/       # Vue SFC components
  │   └── *.test.ts     # Unit tests (co-located with components)
  └── stores/           # Pinia stores (composition API style)
      └── *.test.ts     # Unit tests (co-located with stores)
e2e/                    # Playwright e2e tests
public/                 # Static assets
vite.config.ts         # Vite configuration (Vue plugin enabled)
vitest.config.ts       # Vitest configuration
playwright.config.ts   # Playwright configuration
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
  const state = ref(initialValue);
  const derived = computed(() => state.value * 2);
  function update(value) {
    state.value = value;
  }
  return { state, derived, update };
});
```

## Unit Testing with Vitest

The project uses **Vitest** for fast unit testing of Vue components, stores, and utilities:

### Vitest Configuration

- **Test location**: Tests are co-located with their source files using the `*.test.ts` naming convention
- **Test environment**: `jsdom` - Simulates browser environment for Vue component testing
- **Test runner**: Vitest with Vue Test Utils for component mounting and assertions
- **Global test APIs**: `describe`, `it`, `expect` are available globally without imports
- **Coverage**: Configured with v8 provider, generating text, JSON, and HTML reports
- **Excluded from coverage**: `node_modules/`, `e2e/`, test files, config files, and `dist/`

### Writing Unit Tests

Test files should be placed next to the source file they test with the `.test.ts` extension:

```typescript
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      props: { msg: 'Hello' },
    });
    expect(wrapper.text()).toContain('Hello');
  });

  it('handles user interaction', async () => {
    const wrapper = mount(MyComponent);
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
```

### Running Unit Tests

- **Watch mode**: `pnpm test` - Run tests in watch mode (re-runs on file changes)
- **UI mode**: `pnpm test:ui` - Interactive UI for exploring and debugging tests
- **Single run**: `pnpm test:run` - Run all tests once (useful for CI)
- **Coverage**: `pnpm test:coverage` - Run tests and generate coverage report

### Best Practices

- Co-locate tests with source files for better organization
- Use `describe()` to group related test cases
- Use `mount()` from `@vue/test-utils` for Vue component testing
- Test component behavior, not implementation details
- Use `async/await` for testing asynchronous actions
- Mock external dependencies when needed
- Aim for high coverage but focus on critical paths

### Test File Examples

- Component test: `src/components/HelloWorld.test.ts`
- Store test: `src/stores/counter.test.ts` (if you create stores)
- Utility test: `src/utils/helpers.test.ts` (if you create utilities)

## E2E Testing with Playwright

The project uses **Playwright** for end-to-end testing:

### Playwright Configuration

- **Test directory**: `e2e/` - All e2e tests are located here
- **Test files**: `*.spec.ts` - Test files follow the `*.spec.ts` naming convention
- **Browser targets**: Chromium, Firefox, and WebKit (Safari)
- **Base URL**: `http://localhost:5173` - Configured to test the Vite dev server
- **Auto-start server**: Dev server starts automatically before tests run
- **Parallel execution**: Tests run in parallel for faster execution
- **CI optimization**: Retries and single-worker mode on CI environments

### Writing Tests

Test files should be placed in the `e2e/` directory with the `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/');
    // Your test assertions
  });
});
```

### Running Tests

- **Headless mode**: `pnpm test:e2e` - Run all tests in headless browsers
- **UI mode**: `pnpm test:e2e:ui` - Interactive UI for debugging and watching tests
- **Headed mode**: `pnpm test:e2e:headed` - Run tests with visible browser windows
- **Debug mode**: `pnpm test:e2e:debug` - Run tests with Playwright Inspector for debugging
- **View reports**: `pnpm test:e2e:report` - Open the HTML test report

### Best Practices

- Use `test.describe()` to group related tests
- Use semantic locators like `getByRole()`, `getByLabel()` instead of CSS selectors
- Wait for network idle or specific elements before making assertions
- Keep tests focused and independent of each other
- Use `test.beforeEach()` for common setup steps

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

- **TypeScript files** (`.ts`, `.tsx`, `.vue`) - Auto-formatting with Prettier
- **Unit test files** (`src/**/*.test.ts`) - Runs related tests with Vitest
- **E2E test files** (`e2e/**/*.spec.ts`) - Auto-formatting with Prettier
- **All files** (`.js`, `.json`, `.md`) - Auto-formatting with Prettier

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

### Testing

- `vitest@^4.0.10` - Fast unit test framework
- `@vitest/ui@^4.0.10` - Interactive UI for Vitest
- `@vue/test-utils@^2.4.6` - Official testing utilities for Vue components
- `jsdom@^27.2.0` - JavaScript implementation of web standards for testing
- `happy-dom@^20.0.10` - Alternative DOM implementation for testing
- `@playwright/test@^1.56.1` - Playwright test runner
- `playwright@^1.56.1` - Playwright browser automation library

## IMPORTANT

- When structural changes are made, update the README.md
- All commits must follow conventional commit format
- Pre-commit hooks will automatically format code and run unit tests on changed files
- Unit tests should be co-located with source files using `*.test.ts` naming
- E2E tests should be in the `e2e/` directory using `*.spec.ts` naming
