import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import InputField from '@/components/forms/InputField';

// Test wrapper component to provide form context
const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const FormWrapper = () => {
    const { register, formState: { errors } } = useForm({ defaultValues });
    return <div>{children({ register, errors })}</div>;
  };
  return <FormWrapper />;
};

describe('InputField Component', () => {
  it('should render with label and placeholder', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test Label"
            placeholder="Test placeholder"
            register={register}
            error={errors.testField}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('should render with type text by default', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('should render with password type when specified', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            register={register}
            error={errors.password}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('should render with email type when specified', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            register={register}
            error={errors.email}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Enter email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('should display error message when error is present', () => {
    const mockError = { message: 'This field is required' };
    
    render(
      <TestWrapper>
        {({ register }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={mockError as any}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should apply disabled state correctly', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
            disabled={true}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('should not be disabled by default', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input).not.toBeDisabled();
  });

  it('should render with a value when provided', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
            value="Test Value"
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input.value).toBe('Test Value');
  });

  it('should capitalize label', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="test label"
            placeholder="Test"
            register={register}
            error={errors.testField}
          />
        )}
      </TestWrapper>
    );

    const label = screen.getByText('test label');
    expect(label).toHaveClass('capitalize');
  });

  it('should apply proper styling classes', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('form-input');
  });

  it('should apply opacity and cursor styles when disabled', () => {
    render(
      <TestWrapper>
        {({ register, errors }: any) => (
          <InputField
            name="testField"
            label="Test"
            placeholder="Test"
            register={register}
            error={errors.testField}
            disabled={true}
          />
        )}
      </TestWrapper>
    );

    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('should handle various input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url'];

    types.forEach(type => {
      const { unmount } = render(
        <TestWrapper>
          {({ register, errors }: any) => (
            <InputField
              name={`field-${type}`}
              label={`Label ${type}`}
              placeholder={`Placeholder ${type}`}
              type={type}
              register={register}
              error={errors[`field-${type}`]}
            />
          )}
        </TestWrapper>
      );

      const input = screen.getByPlaceholderText(`Placeholder ${type}`) as HTMLInputElement;
      expect(input.type).toBe(type);
      unmount();
    });
  });

  it('should handle multiple validation errors', () => {
    const errors = [
      { message: 'Field is required' },
      { message: 'Invalid email format' },
      { message: 'Password too short' },
    ];

    errors.forEach(error => {
      const { unmount } = render(
        <TestWrapper>
          {({ register }: any) => (
            <InputField
              name="testField"
              label="Test"
              placeholder="Test"
              register={register}
              error={error as any}
            />
          )}
        </TestWrapper>
      );

      expect(screen.getByText(error.message)).toBeInTheDocument();
      unmount();
    });
  });
});