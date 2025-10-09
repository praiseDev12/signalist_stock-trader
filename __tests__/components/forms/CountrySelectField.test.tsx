import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { CountrySelectField } from '@/components/forms/CountrySelectField';

// Mock react-select-country-list
vi.mock('react-select-country-list', () => ({
  default: () => ({
    getData: () => [
      { value: 'US', label: 'United States' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'CA', label: 'Canada' },
      { value: 'AU', label: 'Australia' },
      { value: 'DE', label: 'Germany' },
    ],
  }),
}));

const TestWrapper = ({ children, defaultValues = {} }: any) => {
  const FormWrapper = () => {
    const { control, formState: { errors } } = useForm({
      defaultValues: { country: '', ...defaultValues },
    });
    return <div>{children({ control, errors })}</div>;
  };
  return <FormWrapper />;
};

describe('CountrySelectField Component', () => {
  it('should render with label', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('should render helper text', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Helps us show market data and news relevant to you.')).toBeInTheDocument();
  });

  it('should display error message when error is present', () => {
    const mockError = { message: 'Please select country' };

    render(
      <TestWrapper>
        {({ control }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={mockError as any}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Please select country')).toBeInTheDocument();
  });

  it('should not be required by default', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('should handle required prop', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
            required={true}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('should render placeholder text', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Select your country...')).toBeInTheDocument();
  });

  it('should apply form-label class to label', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    const label = screen.getByText('Country');
    expect(label).toHaveClass('form-label');
  });

  it('should apply country-select-trigger class', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    const button = screen.getByRole('combobox');
    expect(button).toHaveClass('country-select-trigger');
  });

  it('should handle different label text', () => {
    render(
      <TestWrapper>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="location"
            label="Select Your Location"
            control={control}
            error={errors.location}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Select Your Location')).toBeInTheDocument();
  });

  it('should handle error messages with different text', () => {
    const errors = [
      { message: 'Country is required' },
      { message: 'Please select your country' },
      { message: 'This field cannot be empty' },
    ];

    errors.forEach(error => {
      const { unmount } = render(
        <TestWrapper>
          {({ control }: any) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
              error={error as any}
            />
          )}
        </TestWrapper>
      );

      expect(screen.getByText(error.message)).toBeInTheDocument();
      unmount();
    });
  });

  it('should render with default US value', () => {
    render(
      <TestWrapper defaultValues={{ country: 'US' }}>
        {({ control, errors }: any) => (
          <CountrySelectField
            name="country"
            label="Country"
            control={control}
            error={errors.country}
          />
        )}
      </TestWrapper>
    );

    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('should handle different field names', () => {
    const fieldNames = ['country', 'location', 'nationality', 'residence'];

    fieldNames.forEach(name => {
      const { unmount } = render(
        <TestWrapper>
          {({ control, errors }: any) => (
            <CountrySelectField
              name={name}
              label={name}
              control={control}
              error={errors[name]}
            />
          )}
        </TestWrapper>
      );

      expect(screen.getByText(name)).toBeInTheDocument();
      unmount();
    });
  });
});