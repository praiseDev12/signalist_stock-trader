# Test Suite

This directory contains comprehensive unit tests for the application components and utilities.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `components/forms/` - Tests for form components (InputField, SelectField, etc.)
- `components/ui/` - Tests for UI primitives (Input, Label, Select, etc.)
- `lib/actions/` - Tests for server actions
- `lib/` - Tests for utility functions

## Testing Approach

Tests follow these principles:
1. Test user-visible behavior, not implementation details
2. Cover happy paths, edge cases, and error conditions
3. Mock external dependencies (Next.js router, third-party libraries)
4. Use descriptive test names that explain what is being tested
5. Keep tests isolated and independent

## Coverage Goals

Aim for high coverage of:
- All public component APIs
- Edge cases and error handling
- Accessibility features
- Form validation logic
- User interactions