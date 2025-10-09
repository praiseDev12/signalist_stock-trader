import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import SelectField from '@/components/forms/SelectField';

const TestWrapper = ({ children }: any) => {
  const FormWrapper = () => {
    const { control, formState: { errors } } = useForm({
      defaultValues: {
        testSelect: '',
      },
    });
    return <div>{children({ control, errors })}</div>;
  };
  return <FormWrapper />;
};

describe('SelectField Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render with label and placeholder', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test Select"
            placeholder="Choose an option"
            options={mockOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test Select')).toBeInTheDocument();
  });

  it('should render with capitalized label', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="test label"
            placeholder="Choose"
            options={mockOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    const label = screen.getByText('test label');
    expect(label).toHaveClass('capitalize');
  });

  it('should handle empty options array', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={[]}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should display error message when error is present', () => {
    const mockError = { message: 'Please select an option' };

    render(
      <TestWrapper>
        {({ control }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={mockOptions}
            control={control}
            error={mockError as any}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('should not be required by default', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={mockOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={mockOptions}
            control={control}
            error={errors.testSelect}
            required={true}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render with multiple options', () => {
    const manyOptions = Array.from({ length: 10 }, (_, i) => ({
      value: `option${i}`,
      label: `Option ${i}`,
    }));

    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={manyOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should handle investment goal options', () => {
    const investmentGoals = [
      { value: 'Growth', label: 'Growth' },
      { value: 'Income', label: 'Income' },
      { value: 'Balanced', label: 'Balanced' },
      { value: 'Conservative', label: 'Conservative' },
    ];

    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="investmentGoals"
            label="Investment Goals"
            placeholder="Select goal"
            options={investmentGoals}
            control={control}
            error={errors.investmentGoals}
            required={true}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Investment Goals')).toBeInTheDocument();
  });

  it('should handle risk tolerance options', () => {
    const riskOptions = [
      { value: 'Low', label: 'Low' },
      { value: 'Medium', label: 'Medium' },
      { value: 'High', label: 'High' },
    ];

    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="riskTolerance"
            label="Risk Tolerance"
            placeholder="Select risk level"
            options={riskOptions}
            control={control}
            error={errors.riskTolerance}
            required={true}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Risk Tolerance')).toBeInTheDocument();
  });

  it('should handle industry options', () => {
    const industries = [
      { value: 'Technology', label: 'Technology' },
      { value: 'Healthcare', label: 'Healthcare' },
      { value: 'Finance', label: 'Finance' },
      { value: 'Energy', label: 'Energy' },
      { value: 'Consumer Goods', label: 'Consumer Goods' },
    ];

    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="industry"
            label="Preferred Industry"
            placeholder="Select industry"
            options={industries}
            control={control}
            error={errors.industry}
            required={true}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Preferred Industry')).toBeInTheDocument();
  });

  it('should apply proper styling classes to trigger', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={mockOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('select-trigger');
  });

  it('should handle options with special characters', () => {
    const specialOptions = [
      { value: 'opt-1', label: "O'Brien Industries" },
      { value: 'opt-2', label: 'Tech & Innovation' },
      { value: 'opt-3', label: 'Finance (Global)' },
    ];

    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <SelectField
            name="testSelect"
            label="Test"
            placeholder="Choose"
            options={specialOptions}
            control={control}
            error={errors.testSelect}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});