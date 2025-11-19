# Vue 3 + TypeScript + Vite + Pinia (DDD Template)

This template provides a production-ready Vue 3 application with **Domain-Driven Design (DDD)** architecture. It includes TypeScript, comprehensive testing, and code quality tools.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Features

- **🏗️ DDD Architecture** - Domain-Driven Design with layered architecture (Domain, Application, Infrastructure, UI)
- **Vue 3** - Latest Vue framework with Composition API
- **TypeScript** - Type safety with strict configuration
- **Vite** - Lightning-fast build tool and dev server
- **Pinia** - Official state management library
- **ESLint** - Code quality and best practices enforcement
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing framework
- **Husky** - Git hooks for code quality
- **Prettier** - Automatic code formatting
- **Commitlint** - Conventional commit messages
- **Docker** - Containerization with multi-stage builds

## Architecture

This template follows **Domain-Driven Design (DDD)** principles. See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for detailed documentation.

### Project Structure

```
src/
├── modules/          # Business modules (bounded contexts)
│   └── Welcome/      # Example module with Counter
│       ├── domain/           # Pure business logic
│       ├── application/      # Use cases
│       ├── infrastructure/   # External services
│       └── ui/              # Vue components
├── shared/           # Shared kernel
└── ui/              # Generic UI components
```

## Development Commands

### Building and Running

```bash
pnpm dev          # Start development server
pnpm lint         # Run ESLint
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Testing

```bash
# Unit Tests (Vitest)
pnpm test               # Run unit tests in watch mode
pnpm test:ui            # Run unit tests with interactive UI
pnpm test:run           # Run unit tests once
pnpm test:coverage      # Run unit tests with coverage

# E2E Tests (Playwright)
pnpm test:e2e           # Run e2e tests (headless)
pnpm test:e2e:ui        # Run e2e tests in UI mode
pnpm test:e2e:headed    # Run e2e tests with visible browser
pnpm test:e2e:debug     # Run e2e tests in debug mode
pnpm test:e2e:report    # View test reports
```

## Docker Deployment

This project includes full Docker support for containerization and deployment. See [DOCKER.md](./docs/DOCKER.md) for comprehensive documentation.

### Quick Start

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access the application
# Production: http://localhost:8080
# Development: http://localhost:5173 (with --profile dev)
```

### Key Features

- **Multi-stage builds** for optimized production images (~50-60 MB)
- **Development mode** with hot-reload support
- **Nginx** configuration for SPA routing
- **Health checks** and security headers
- **Docker Compose** for easy orchestration

## State Management with Pinia

This project includes [Pinia](https://pinia.vuejs.org/), Vue's official state management library. Pinia provides a simplified, more intuitive API compared to Vuex.

### Creating Stores

Create stores in the `src/stores/` directory using the composition API:

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMyStore = defineStore('myStore', () => {
  const state = ref(initialValue);
  const derived = computed(() => state.value * 2);

  function updateState(value: string) {
    state.value = value;
  }

  return { state, derived, updateState };
});
```

### Using Stores in Components

```vue
<script setup lang="ts">
import { useMyStore } from '@/stores/myStore';

const store = useMyStore();
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

## Unit Testing with Vitest

This project uses [Vitest](https://vitest.dev/) for fast unit testing of Vue components, Pinia stores, and utility functions.

### Running Unit Tests

```bash
# Watch mode (recommended for development)
pnpm test

# Interactive UI mode for exploring and debugging tests
pnpm test:ui

# Run all tests once (useful for CI)
pnpm test:run

# Generate coverage report
pnpm test:coverage
```

### Writing Unit Tests

Tests are co-located with their source files using the `*.test.ts` naming convention:

**Example: Testing a Vue Component**

```typescript
// src/components/HelloWorld.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders prop.msg when passed', () => {
    const msg = 'Hello Vitest!';
    const wrapper = mount(HelloWorld, { props: { msg } });
    expect(wrapper.text()).toContain(msg);
  });

  it('increments count when button is clicked', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Test' } });
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(wrapper.text()).toContain('count is 1');
  });
});
```

**Example: Testing a Pinia Store**

```typescript
// src/stores/counter.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from './counter';

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('increments counter', () => {
    const store = useCounterStore();
    expect(store.count).toBe(0);

    store.increment();
    expect(store.count).toBe(1);
  });
});
```

### Test File Organization

- **Component tests**: `src/components/MyComponent.test.ts` (next to `MyComponent.vue`)
- **Store tests**: `src/stores/myStore.test.ts` (next to `myStore.ts`)
- **Utility tests**: `src/utils/helpers.test.ts` (next to `helpers.ts`)

### Best Practices

- **Co-locate tests**: Keep test files next to the code they test for better organization
- **Test behavior**: Focus on testing component behavior, not implementation details
- **Use Vue Test Utils**: Leverage `mount()` for component testing and wrapper utilities
- **Async testing**: Use `async/await` when testing asynchronous operations
- **Mock dependencies**: Mock external dependencies to isolate unit tests
- **Descriptive names**: Use clear, descriptive test names that explain what is being tested

### Configuration

Vitest is configured in `vitest.config.ts`:

- **Test environment**: `jsdom` for browser-like testing
- **Global APIs**: `describe`, `it`, `expect` available without imports
- **Coverage**: v8 provider with HTML, JSON, and text reports
- **Watch mode**: Automatically re-runs tests on file changes

For more information, visit the [Vitest Documentation](https://vitest.dev/).

## E2E Testing with Playwright

This project uses [Playwright](https://playwright.dev/) for end-to-end testing across multiple browsers.

### Running Tests

```bash
# Run all tests in headless mode
pnpm test:e2e

# Run tests with interactive UI (recommended for development)
pnpm test:e2e:ui

# Run tests with visible browser windows
pnpm test:e2e:headed

# Debug tests with Playwright Inspector
pnpm test:e2e:debug

# View HTML test report
pnpm test:e2e:report
```

### Writing Tests

Tests are located in the `e2e/` directory and use the `.spec.ts` extension:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should perform an action', async ({ page }) => {
    await page.goto('/');

    const button = page.getByRole('button', { name: /click me/i });
    await expect(button).toBeVisible();
    await button.click();

    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

### Best Practices

- **Use semantic locators**: Prefer `getByRole()`, `getByLabel()`, `getByText()` over CSS selectors
- **Group related tests**: Use `test.describe()` to organize test suites
- **Wait for stability**: Use `waitForLoadState()` or wait for specific elements before assertions
- **Keep tests independent**: Each test should be able to run in isolation
- **Use test hooks**: Utilize `beforeEach()` and `afterEach()` for common setup/cleanup

### Configuration

The Playwright configuration is defined in `playwright.config.ts`:

- **Browser coverage**: Tests run on Chromium, Firefox, and WebKit
- **Parallel execution**: Tests run in parallel for faster feedback
- **Auto-start dev server**: The Vite dev server starts automatically before tests
- **Base URL**: Configured to `http://localhost:5173`

For more information, visit the [Playwright Documentation](https://playwright.dev/).

## Git Hooks & Code Quality

This project uses Husky to enforce code quality standards and comprehensive commit messages.

### Pre-commit Checks

Before each commit, the following checks run automatically via `lint-staged`:

- **Code Formatting**: All staged files are automatically formatted with Prettier
- **Unit Tests**: Changed test files trigger related unit tests with Vitest

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
