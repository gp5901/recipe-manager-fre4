# Contributing to Recipe Manager

Thank you for your interest in contributing to Recipe Manager! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Performance Guidelines](#performance-guidelines)

## 📜 Code of Conduct

This project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Setup

```
# Fork and clone the repository
git clone https://github.com/your-username/recipe-manager.git
cd recipe-manager

# Install dependencies
npm install

# Create a feature branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

## 🔄 Development Workflow

### Branch Naming Convention

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `perf/performance-improvement` - Performance optimizations
- `refactor/code-improvement` - Code refactoring
- `test/test-addition` - Adding tests

### Feature Development

1. **Create a branch** from `main`
2. **Make changes** following coding standards
3. **Write tests** with >80% coverage
4. **Run validation** (`npm run validate`)
5. **Commit** with conventional commits
6. **Push** and create a Pull Request

## 💻 Coding Standards

### JavaScript

- **ES6+ features**: Use modern JavaScript (const/let, arrow functions, destructuring, async/await)
- **Modules**: Use ES6 import/export
- **JSDoc**: Document all functions and classes
- **Type safety**: Use JSDoc type annotations
- **Error handling**: Always handle errors gracefully
- **Performance**: Consider Big O complexity

#### Example

```
/**
 * Filters recipes by difficulty level
 * 
 * @param {Recipe[]} recipes - Array of recipe objects
 * @param {string} difficulty - Difficulty level ('easy'|'medium'|'hard')
 * @returns {Recipe[]} Filtered recipes
 * 
 * Big O: O(n) where n = number of recipes
 * Space: O(k) where k = filtered results
 */
export function filterByDifficulty(recipes, difficulty) {
  if (!Array.isArray(recipes)) {
    throw new TypeError('recipes must be an array');
  }
  
  if (difficulty === 'all') return recipes;
  
  return recipes.filter(recipe => recipe.difficulty === difficulty);
}
```

### CSS

- **BEM naming**: Use Block Element Modifier methodology
- **CSS Variables**: Use custom properties for theming
- **Mobile-first**: Start with mobile styles, enhance with media queries
- **Accessibility**: Ensure WCAG AA compliance

#### Example

```
/* Block */
.recipe-card {
  /* Base styles */
}

/* Element */
.recipe-card__title {
  /* Title styles */
}

/* Modifier */
.recipe-card--featured {
  /* Featured variant */
}
```

### HTML

- **Semantic HTML**: Use appropriate tags (`<main>`, `<article>`, `<section>`)
- **Accessibility**: Include ARIA labels, roles, and keyboard navigation
- **Performance**: Preload critical resources

## 🧪 Testing Guidelines

### Unit Tests

- **Coverage**: Maintain >80% code coverage
- **Descriptive**: Use clear test descriptions
- **Isolation**: Each test should be independent
- **Edge cases**: Test boundary conditions

#### Example

```
import { describe, it, expect, beforeEach } from 'vitest';
import { StorageManager } from '../src/js/modules/storage.js';

describe('StorageManager', () => {
  let storage;
  
  beforeEach(() => {
    storage = new StorageManager();
    localStorage.clear();
  });
  
  describe('get()', () => {
    it('should return null for non-existent key', () => {
      expect(storage.get('nonexistent')).toBe(null);
    });
    
    it('should return stored value for existing key', () => {
      const data = { id: 1, name: 'Test' };
      storage.set('test', data);
      expect(storage.get('test')).toEqual(data);
    });
    
    it('should handle corrupted data gracefully', () => {
      localStorage.setItem('recipes', '{invalid json}');
      expect(storage.get('recipes')).toBe(null);
    });
  });
});
```

### Test Commands

```
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui
```

## 📝 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks

### Examples

```
feat(storage): add caching layer for localStorage reads

Implement Map-based cache to reduce localStorage access.
Improves read performance from O(n) to O(1).

Closes #42

***

fix(validation): prevent XSS in recipe title input

Sanitize user input before rendering to DOM.
Add DOMPurify for HTML sanitization.

BREAKING CHANGE: Recipe titles now strip HTML tags
```

## 🔀 Pull Request Process

### Before Submitting

1. ✅ All tests pass (`npm test`)
2. ✅ Code coverage >80% (`npm run test:coverage`)
3. ✅ No linting errors (`npm run lint`)
4. ✅ Code formatted (`npm run format`)
5. ✅ Manual testing completed
6. ✅ Documentation updated

### PR Template

```
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing performed
- [ ] Coverage >80%

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests pass locally
```

### Review Process

1. Automated CI checks must pass
2. At least one maintainer approval required
3. No unresolved conversations
4. Branch up-to-date with `main`

## ⚡ Performance Guidelines

### JavaScript Performance

- **Minimize DOM access**: Batch reads/writes
- **Use `DocumentFragment`**: For multiple DOM insertions
- **Debounce expensive operations**: Search, scroll, resize
- **Avoid memory leaks**: Clear event listeners, timers
- **Optimize loops**: Use `for` over `.forEach()` in hot paths

### CSS Performance

- **Minimize reflows**: Batch style changes
- **Use `transform`**: For animations (GPU-accelerated)
- **Avoid expensive selectors**: Prefer classes over complex selectors
- **Critical CSS**: Inline above-the-fold styles

### localStorage Performance

- **Cache in memory**: Reduce localStorage reads
- **Batch updates**: Minimize write operations
- **Compress data**: For large datasets
- **Monitor quota**: Handle quota exceeded errors

## 🎯 Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Lighthouse Performance Score: > 90

## 📞 Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions

---

Thank you for contributing! 🎉

