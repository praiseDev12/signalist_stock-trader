# Testing Documentation

## Overview

This repository now includes a comprehensive test suite covering all authentication-related components and utilities. The tests are written using Jest and React Testing Library, following industry best practices for React/Next.js applications.

## Test Coverage

### Components Tested

1. **InputField Component** (`__tests__/components/forms/InputField.test.tsx`)
   - ✅ Rendering with different types (text, email, password)
   - ✅ Error message display and styling
   - ✅ Disabled state handling
   - ✅ Value management (controlled/uncontrolled)
   - ✅ Validation rule integration with react-hook-form
   - ✅ Accessibility (labels, IDs, htmlFor attributes)
   - ✅ CSS class application
   - **Total Tests:** 20+ test cases

2. **SelectField Component** (`__tests__/components/forms/SelectField.test.tsx`)
   - ✅ Rendering with options
   - ✅ Dropdown opening/closing behavior
   - ✅ Option selection and value updates
   - ✅ Required field validation
   - ✅ Error display
   - ✅ Dark theme styling
   - ✅ Accessibility (ARIA attributes, keyboard navigation)
   - ✅ Edge cases (special characters, long labels, empty options)
   - **Total Tests:** 20+ test cases

3. **FooterLink Component** (`__tests__/components/forms/FooterLink.test.tsx`)
   - ✅ Text and link rendering
   - ✅ URL handling (absolute, relative, with parameters)
   - ✅ Accessibility (keyboard navigation, proper link semantics)
   - ✅ CSS class application
   - ✅ Edge cases (empty text, special characters, long content)
   - ✅ Multiple instances independence
   - **Total Tests:** 15+ test cases

4. **CountrySelectField Component** (`__tests__/components/forms/CountrySelectField.test.tsx`)
   - ✅ Rendering with country selector
   - ✅ Popover interaction (open/close)
   - ✅ Search functionality with filtering
   - ✅ Country selection with flag emojis
   - ✅ Validation (required field)
   - ✅ Error display
   - ✅ Accessibility (ARIA expanded, combobox role)
   - ✅ CSS class application
   - **Total Tests:** 15+ test cases

### Library Functions Tested

5. **Auth Actions** (`__tests__/lib/actions/auth.actions.test.ts`)
   - ✅ `signInWithEmail`: Email/password validation, error handling
   - ✅ `signUpWithEmail`: All form fields (fullName, email, password, country, preferences)
   - ✅ Different input variations (email formats, password lengths, special characters)
   - ✅ Edge cases (empty strings, very long inputs)
   - ✅ Error handling structure
   - ✅ Function signatures and async behavior
   - **Total Tests:** 20+ test cases

6. **Utility Functions** (`__tests__/lib/utils.test.ts`)
   - ✅ `cn` function: Class name merging
   - ✅ Conditional class handling
   - ✅ Tailwind CSS conflict resolution
   - ✅ Array handling
   - ✅ Null/undefined handling
   - ✅ Complex styling scenarios
   - ✅ Real-world usage patterns
   - ✅ Edge cases (very long strings, many classes, duplicates)
   - **Total Tests:** 25+ test cases

## Test Statistics

- **Total Test Files:** 6
- **Total Test Suites:** 100+
- **Total Test Cases:** 115+
- **Code Coverage:** Targeting 80%+ for critical paths

## Setup

### Prerequisites

The following dependencies have been added to `package.json`:

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.14",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

### Installation

```bash
npm install
```

This will install all the necessary testing dependencies.

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

This is useful during development as it will re-run tests when files change.

### Run Tests with Coverage

```bash
npm run test:coverage
```

This generates a coverage report showing which parts of your code are tested.

### Run Specific Test File

```bash
npm test -- InputField.test.tsx
```

### Run Tests Matching a Pattern

```bash
npm test -- --testNamePattern="should render"
```

## Test Structure

### Example Test Structure

```typescript
describe('Component Name', () => {
  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange
      render(<Component prop="value" />)
      
      // Act
      const element = screen.getByRole('button')
      
      // Assert
      expect(element).toBeInTheDocument()
    })
  })
})
```

### Test Wrappers

For components using React Hook Form, we provide a `TestWrapper` component:

```typescript
const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}
```

Usage:

```typescript
render(
  <TestWrapper defaultValues={{ email: 'test@example.com' }}>
    {({ register, control }) => (
      <InputField name="email" register={register} />
    )}
  </TestWrapper>
)
```

## Mocking Strategy

### Next.js Router

The `useRouter` hook is mocked in `jest.setup.js`:

```javascript
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
}))
```

### Next.js Components

- `next/image`: Mocked as regular `<img>` tag
- `next/link`: Mocked as regular `<a>` tag

### External Libraries

- `react-select-country-list`: Mocked with test data in CountrySelectField tests

## Best Practices

### 1. Test Behavior, Not Implementation

❌ **Bad:**
```typescript
expect(component.state.isOpen).toBe(true)
```

✅ **Good:**
```typescript
expect(screen.getByRole('dialog')).toBeVisible()
```

### 2. Use Semantic Queries

Prefer queries in this order:
1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

### 3. Test Accessibility

Always include accessibility tests:
```typescript
it('should be keyboard navigable', () => {
  const link = screen.getByRole('link')
  link.focus()
  expect(link).toHaveFocus()
})
```

### 4. Use User Events

❌ **Bad:**
```typescript
fireEvent.click(button)
```

✅ **Good:**
```typescript
const user = userEvent.setup()
await user.click(button)
```

### 5. Test Edge Cases

Always consider:
- Empty values
- Very long inputs
- Special characters
- Null/undefined
- Invalid data
- Error states

### 6. Descriptive Test Names

❌ **Bad:**
```typescript
it('works', () => {})
```

✅ **Good:**
```typescript
it('should display error message when email is invalid', () => {})
```

## Coverage Goals

| Category | Target | Current |
|----------|--------|---------|
| Statements | 80% | - |
| Branches | 75% | - |
| Functions | 80% | - |
| Lines | 80% | - |

Run `npm run test:coverage` to see current coverage.

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test -- --coverage
```

## Troubleshooting

### Common Issues

1. **Tests timing out**
   - Add `--testTimeout=10000` flag
   - Ensure async operations are properly awaited

2. **Module not found errors**
   - Check `moduleNameMapper` in `jest.config.js`
   - Verify import paths use `@/` prefix

3. **React Hook warnings**
   - Ensure components are wrapped in TestWrapper
   - Check that form context is provided

4. **Radix UI components not rendering**
   - These components may need additional setup
   - Check if portals are being used

### Debug Mode

Run tests with debug output:

```bash
npm test -- --verbose
```

## Adding New Tests

### For New Components

1. Create test file: `__tests__/components/YourComponent.test.tsx`
2. Import necessary testing utilities
3. Create TestWrapper if needed
4. Write tests covering:
   - Rendering
   - User interactions
   - Error states
   - Accessibility
   - Edge cases

### For New Utilities

1. Create test file: `__tests__/lib/yourUtility.test.ts`
2. Test all function signatures
3. Test happy paths
4. Test error handling
5. Test edge cases

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## Contributing

When adding new features:

1. ✅ Write tests before or alongside the implementation
2. ✅ Ensure all tests pass: `npm test`
3. ✅ Check coverage: `npm run test:coverage`
4. ✅ Follow existing test patterns
5. ✅ Update this documentation if needed

## Future Enhancements

- [ ] Add E2E tests with Playwright
- [ ] Add visual regression tests
- [ ] Implement performance testing
- [ ] Add mutation testing
- [ ] Set up test coverage reporting in CI/CD

---

**Last Updated:** January 2025
**Maintainer:** Development Team