import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import InputField from '@/components/forms/InputField'

// Wrapper component to provide form context
const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}

describe('InputField Component', () => {
  describe('Rendering', () => {
    it('should render with label and input', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Label"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByLabelText(/test label/i)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument()
    })

    it('should render with capitalized label', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="email"
              label="email address"
              placeholder="test@example.com"
              register={register}
            />
          )}
        </TestWrapper>
      )

      // The label should be capitalized by the capitalize class
      expect(screen.getByText(/email address/i)).toBeInTheDocument()
    })

    it('should render different input types', () => {
      const { rerender } = render(
        <TestWrapper>
          {({ register }) => (
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

      const input = screen.getByPlaceholderText(/enter password/i)
      expect(input).toHaveAttribute('type', 'password')

      rerender(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              type="email"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const emailInput = screen.getByPlaceholderText(/enter email/i)
      expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('should default to text type when type is not specified', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="username"
              label="Username"
              placeholder="Enter username"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter username/i)
      expect(input).toHaveAttribute('type', 'text')
    })
  })

  describe('Error Handling', () => {
    it('should display error message when error prop is provided', () => {
      const mockError = {
        type: 'required',
        message: 'This field is required',
      }

      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
              error={mockError}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
      expect(screen.getByText(/this field is required/i)).toHaveClass(
        'text-red-500'
      )
    })

    it('should not display error when error prop is undefined', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const errorText = screen.queryByText(/error/i)
      expect(errorText).not.toBeInTheDocument()
    })

    it('should display different error messages', () => {
      const { rerender } = render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={register}
              error={{ type: 'pattern', message: 'Invalid email format' }}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()

      rerender(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="password"
              label="Password"
              placeholder="Enter password"
              register={register}
              error={{
                type: 'minLength',
                message: 'Password must be at least 8 characters',
              }}
            />
          )}
        </TestWrapper>
      )

      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should apply disabled styling when disabled is true', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
              disabled={true}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toBeDisabled()
      expect(input).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    it('should not be disabled when disabled prop is false', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
              disabled={false}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).not.toBeDisabled()
    })

    it('should not be disabled by default', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).not.toBeDisabled()
    })
  })

  describe('Value Handling', () => {
    it('should display provided value', () => {
      render(
        <TestWrapper defaultValues={{ testField: 'Initial Value' }}>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
              value="Controlled Value"
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toHaveValue('Controlled Value')
    })

    it('should handle empty value', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
              value=""
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toHaveValue('')
    })
  })

  describe('Validation', () => {
    it('should pass validation rules to register', () => {
      const mockRegister = jest.fn()

      render(
        <TestWrapper>
          {() => (
            <InputField
              name="email"
              label="Email"
              placeholder="Enter email"
              register={mockRegister}
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^\w+@\w+\.\w+$/,
                  message: 'Invalid email',
                },
              }}
            />
          )}
        </TestWrapper>
      )

      expect(mockRegister).toHaveBeenCalledWith('email', {
        required: 'Email is required',
        pattern: {
          value: /^\w+@\w+\.\w+$/,
          message: 'Invalid email',
        },
      })
    })

    it('should work without validation rules', () => {
      const mockRegister = jest.fn()

      render(
        <TestWrapper>
          {() => (
            <InputField
              name="optional"
              label="Optional Field"
              placeholder="Enter text"
              register={mockRegister}
            />
          )}
        </TestWrapper>
      )

      expect(mockRegister).toHaveBeenCalledWith('optional', undefined)
    })
  })

  describe('Accessibility', () => {
    it('should have correct htmlFor attribute on label', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="accessibleField"
              label="Accessible Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText(/accessible field/i)
      expect(label).toHaveAttribute('for', 'accessibleField')
    })

    it('should have matching id on input', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="accessibleField"
              label="Accessible Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toHaveAttribute('id', 'accessibleField')
    })
  })

  describe('CSS Classes', () => {
    it('should apply form-label class to label', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText(/test field/i)
      expect(label).toHaveClass('form-label', 'capitalize')
    })

    it('should apply form-input class to input', () => {
      render(
        <TestWrapper>
          {({ register }) => (
            <InputField
              name="testField"
              label="Test Field"
              placeholder="Enter text"
              register={register}
            />
          )}
        </TestWrapper>
      )

      const input = screen.getByPlaceholderText(/enter text/i)
      expect(input).toHaveClass('form-input')
    })
  })
})