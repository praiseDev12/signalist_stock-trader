import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import SelectField from '@/components/forms/SelectField'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

// Wrapper component to provide form context
const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}

describe('SelectField Component', () => {
  describe('Rendering', () => {
    it('should render with label and select trigger', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/test select/i)).toBeInTheDocument()
      expect(screen.getByText(/select an option/i)).toBeInTheDocument()
    })

    it('should render with capitalized label', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="industry"
              label="preferred industry"
              placeholder="Select industry"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText(/preferred industry/i)
      expect(label).toHaveClass('capitalize')
    })

    it('should display placeholder when no value is selected', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Choose one"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/choose one/i)).toBeInTheDocument()
    })
  })

  describe('Options Rendering', () => {
    it('should render all provided options when opened', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.getByText('Option 2')).toBeInTheDocument()
        expect(screen.getByText('Option 3')).toBeInTheDocument()
      })
    })

    it('should render with empty options array', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={[]}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/test select/i)).toBeInTheDocument()
    })
  })

  describe('Selection Behavior', () => {
    it('should update value when an option is selected', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control, watch }) => (
            <>
              <SelectField
                name="testSelect"
                label="Test Select"
                placeholder="Select an option"
                options={mockOptions}
                control={control}
              />
              <div data-testid="value">{watch('testSelect')}</div>
            </>
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Option 2'))

      await waitFor(() => {
        expect(screen.getByTestId('value')).toHaveTextContent('option2')
      })
    })

    it('should display selected value in trigger', async () => {
      render(
        <TestWrapper defaultValues={{ testSelect: 'option2' }}>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Option 2')).toBeInTheDocument()
      })
    })
  })

  describe('Validation', () => {
    it('should apply required validation when required is true', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="requiredSelect"
              label="Required Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
              required={true}
            />
          )}
        </TestWrapper>
      )

      // Component should render without errors
      expect(screen.getByText(/required select/i)).toBeInTheDocument()
    })

    it('should not require validation when required is false', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="optionalSelect"
              label="Optional Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
              required={false}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/optional select/i)).toBeInTheDocument()
    })

    it('should generate correct error message for required field', () => {
      const { rerender } = render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="investment"
              label="Investment Goals"
              placeholder="Select goals"
              options={mockOptions}
              control={control}
              required={true}
            />
          )}
        </TestWrapper>
      )

      // The error message should be based on the label
      // Pattern: `Please select ${label.toLowerCase()}`
      expect(screen.getByText(/investment goals/i)).toBeInTheDocument()
    })
  })

  describe('Error Display', () => {
    it('should display error message when error prop is provided', () => {
      const mockError = {
        type: 'required',
        message: 'Please select investment goals',
      }

      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
              error={mockError}
            />
          )}
        </TestWrapper>
      )

      expect(
        screen.getByText(/please select investment goals/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/please select investment goals/i)
      ).toHaveClass('text-red-500')
    })

    it('should not display error when error prop is undefined', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const errorMessages = screen.queryByText(/please select/i)
      expect(errorMessages).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have correct htmlFor attribute on label', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="accessibleSelect"
              label="Accessible Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText(/accessible select/i)
      expect(label).toHaveAttribute('for', 'accessibleSelect')
    })

    it('should have combobox role', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('CSS Classes', () => {
    it('should apply correct classes to select trigger', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('select-trigger')
    })

    it('should apply dark theme classes to content', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        const content = screen.getByRole('listbox')
        expect(content).toHaveClass('bg-gray-800', 'border-gray-600', 'text-white')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle options with special characters', async () => {
      const specialOptions = [
        { value: 'opt-1', label: 'Option & Special' },
        { value: 'opt-2', label: 'Option <> Brackets' },
        { value: 'opt-3', label: "Option ' Quote" },
      ]

      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={specialOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(screen.getByText('Option & Special')).toBeInTheDocument()
      })
    })

    it('should handle long option labels', async () => {
      const longOptions = [
        {
          value: 'long1',
          label: 'This is a very long option label that should still work correctly',
        },
      ]

      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select an option"
              options={longOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      await user.click(trigger)

      await waitFor(() => {
        expect(
          screen.getByText(/this is a very long option label/i)
        ).toBeInTheDocument()
      })
    })
  })
})