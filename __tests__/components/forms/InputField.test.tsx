import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import InputField from '@/components/forms/InputField'

// Wrapper component to provide react-hook-form context
const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}

describe('components/forms/InputField', () => {
  describe('Basic rendering', () => {
    test('should render input field with label', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    test('should render with correct input type', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter password')
      expect(input).toHaveAttribute('type', 'password')
    })

    test('should default to text type when not specified', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="username"
              label="Username"
              placeholder="Enter username"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter username')
      expect(input).toHaveAttribute('type', 'text')
    })

    test('should capitalize label', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="fullname"
              label="full name"
              placeholder="Enter name"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('full name')
      expect(label).toHaveClass('capitalize')
    })
  })

  describe('Input types', () => {
    test('should render email input type', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="email@example.com"
              type="email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('email@example.com')
      expect(input).toHaveAttribute('type', 'email')
    })

    test('should render password input type', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('password')
      expect(input).toHaveAttribute('type', 'password')
    })

    test('should render number input type', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="age"
              label="Age"
              placeholder="Enter age"
              type="number"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter age')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('Error handling', () => {
    test('should display error message when error prop is provided', () => {
      const mockError = { type: 'required', message: 'This field is required' }
      
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              error={mockError}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('This field is required')).toBeInTheDocument()
      expect(screen.getByText('This field is required')).toHaveClass('text-red-500')
    })

    test('should not display error message when no error', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.queryByText(/required/i)).not.toBeInTheDocument()
    })

    test('should display custom error messages', () => {
      const errors = [
        'Email is required',
        'Password must be at least 8 characters',
        'Invalid format',
      ]

      errors.forEach((message) => {
        const { unmount } = render(
          <TestWrapper>
            {({ register }: any) => (
              <InputField
                name="field"
                label="Field"
                placeholder="Enter value"
                register={register}
                error={{ type: 'custom', message }}
              />
            )}
          </TestWrapper>
        )

        expect(screen.getByText(message)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Disabled state', () => {
    test('should apply disabled styles when disabled', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              disabled={true}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    test('should not be disabled when disabled prop is false', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              disabled={false}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email')
      expect(input).not.toBeDisabled()
    })

    test('should not be disabled by default', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email')
      expect(input).not.toBeDisabled()
    })
  })

  describe('Value handling', () => {
    test('should render with initial value', () => {
      render(
        <TestWrapper defaultValues={{ email: 'test@example.com' }}>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              value="test@example.com"
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement
      expect(input.value).toBe('test@example.com')
    })

    test('should render without value prop', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement
      expect(input.value).toBe('')
    })
  })

  describe('Validation rules', () => {
    test('should accept validation prop', () => {
      const validation = {
        required: 'Email is required',
        pattern: {
          value: /^\w+@\w+\.\w+$/,
          message: 'Invalid email format',
        },
      }

      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              validation={validation}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    test('should work without validation prop', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    test('should apply form-input class', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email')
      expect(input).toHaveClass('form-input')
    })

    test('should apply form-label class to label', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('Email')
      expect(label).toHaveClass('form-label')
    })
  })

  describe('Accessibility', () => {
    test('should have correct htmlFor attribute on label', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('Email')
      expect(label).toHaveAttribute('for', 'email')
    })

    test('should have matching id on input', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText('Enter email')
      expect(input).toHaveAttribute('id', 'email')
    })
  })

  describe('Edge cases', () => {
    test('should handle empty placeholder', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="email"
              label="Email"
              placeholder=""
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByLabelText('Email')).toBeInTheDocument()
    })

    test('should handle long labels', () => {
      const longLabel = 'This is a very long label that might wrap'
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="field"
              label={longLabel}
              placeholder="Enter value"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(longLabel)).toBeInTheDocument()
    })

    test('should handle special characters in name', () => {
      render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="user-email"
              label="Email"
              placeholder="Enter email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })
  })
})