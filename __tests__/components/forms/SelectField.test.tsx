import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import SelectField from '@/components/forms/SelectField'

const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

describe('components/forms/SelectField', () => {
  describe('Basic rendering', () => {
    test('should render select field with label', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
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

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should render with placeholder', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
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

      expect(screen.getByText('Choose one')).toBeInTheDocument()
    })

    test('should capitalize label', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="test select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('test select')
      expect(label).toHaveClass('capitalize')
    })
  })

  describe('Options rendering', () => {
    test('should render all provided options', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      // Select trigger should be present
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('should handle empty options array', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={[]}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should handle single option', () => {
      const singleOption = [{ value: 'only', label: 'Only Option' }]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={singleOption}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('should handle many options', () => {
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        value: `option${i}`,
        label: `Option ${i}`,
      }))
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={manyOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Error handling', () => {
    test('should display error message when error prop is provided', () => {
      const mockError = { type: 'required', message: 'This field is required' }
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
              error={mockError}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    test('should not display error when no error prop', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.queryByText(/required/i)).not.toBeInTheDocument()
    })

    test('should display custom error messages', () => {
      const customError = { type: 'custom', message: 'Please select an option' }
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
              error={customError}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Please select an option')).toBeInTheDocument()
    })
  })

  describe('Required field', () => {
    test('should accept required prop', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
              required={true}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should work when required is false', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
              required={false}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should default to not required', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    test('should apply form-label class to label', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('Test Select')
      expect(label).toHaveClass('form-label')
    })

    test('should apply select-trigger class to trigger', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toHaveClass('select-trigger')
    })
  })

  describe('Accessibility', () => {
    test('should have correct htmlFor attribute', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText('Test Select')
      expect(label).toHaveAttribute('for', 'testSelect')
    })

    test('should be keyboard accessible', () => {
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={mockOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      const trigger = screen.getByRole('combobox')
      expect(trigger).toBeInTheDocument()
    })
  })

  describe('Real-world options', () => {
    test('should work with investment goals options', () => {
      const investmentGoals = [
        { value: 'Growth', label: 'Growth' },
        { value: 'Income', label: 'Income' },
        { value: 'Balanced', label: 'Balanced' },
        { value: 'Conservative', label: 'Conservative' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="investmentGoals"
              label="Investment Goals"
              placeholder="Select your goal"
              options={investmentGoals}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Investment Goals')).toBeInTheDocument()
    })

    test('should work with risk tolerance options', () => {
      const riskTolerance = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="riskTolerance"
              label="Risk Tolerance"
              placeholder="Select your risk level"
              options={riskTolerance}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Risk Tolerance')).toBeInTheDocument()
    })

    test('should work with industry options', () => {
      const industries = [
        { value: 'Technology', label: 'Technology' },
        { value: 'Healthcare', label: 'Healthcare' },
        { value: 'Finance', label: 'Finance' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="industry"
              label="Preferred Industry"
              placeholder="Select industry"
              options={industries}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Preferred Industry')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    test('should handle options with special characters', () => {
      const specialOptions = [
        { value: 'opt-1', label: 'Option 1' },
        { value: 'opt_2', label: 'Option 2' },
        { value: 'opt.3', label: 'Option 3' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={specialOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should handle long option labels', () => {
      const longOptions = [
        { value: 'long', label: 'This is a very long option label that might wrap' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={longOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })

    test('should handle numeric values', () => {
      const numericOptions = [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
      ]
      
      render(
        <TestWrapper>
          {({ control }: any) => (
            <SelectField
              name="testSelect"
              label="Test Select"
              placeholder="Select"
              options={numericOptions}
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText('Test Select')).toBeInTheDocument()
    })
  })
})