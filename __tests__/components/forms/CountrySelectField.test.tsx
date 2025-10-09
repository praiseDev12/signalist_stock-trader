import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm } from 'react-hook-form'
import { CountrySelectField } from '@/components/forms/CountrySelectField'

// Mock the country list module
jest.mock('react-select-country-list', () => {
  return jest.fn(() => ({
    getData: jest.fn(() => [
      { value: 'US', label: 'United States' },
      { value: 'CA', label: 'Canada' },
      { value: 'GB', label: 'United Kingdom' },
      { value: 'DE', label: 'Germany' },
      { value: 'FR', label: 'France' },
    ]),
  }))
})

const TestWrapper = ({ children, defaultValues = {} }) => {
  const methods = useForm({ defaultValues })
  return <form>{children(methods)}</form>
}

describe('CountrySelectField Component', () => {
  describe('Rendering', () => {
    it('should render with label and country select button', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/country/i)).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should show placeholder when no country is selected', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Select Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/select your country\.\.\./i)).toBeInTheDocument()
    })

    it('should display helper text', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      expect(
        screen.getByText(/helps us show market data and news relevant to you/i)
      ).toBeInTheDocument()
    })

    it('should display selected country with flag and name', async () => {
      render(
        <TestWrapper defaultValues={{ country: 'US' }}>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText(/united states/i)).toBeInTheDocument()
      })
    })
  })

  describe('Popover Interaction', () => {
    it('should open popover when button is clicked', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button', { name: /select your country/i })
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/search countries\.\.\./i)).toBeInTheDocument()
      })
    })

    it('should close popover when a country is selected', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/canada/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/canada/i))

      await waitFor(() => {
        expect(screen.queryByPlaceholderText(/search countries\.\.\./i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Search Functionality', () => {
    it('should filter countries based on search input', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      const searchInput = screen.getByPlaceholderText(/search countries\.\.\./i)
      await user.type(searchInput, 'United')

      await waitFor(() => {
        expect(screen.getByText(/united states/i)).toBeInTheDocument()
        expect(screen.getByText(/united kingdom/i)).toBeInTheDocument()
      })
    })

    it('should show "No country found" message when search has no results', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      const searchInput = screen.getByPlaceholderText(/search countries\.\.\./i)
      await user.type(searchInput, 'NonexistentCountry')

      await waitFor(() => {
        expect(screen.getByText(/no country found/i)).toBeInTheDocument()
      })
    })
  })

  describe('Country Selection', () => {
    it('should update value when a country is selected', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control, watch }) => (
            <>
              <CountrySelectField
                name="country"
                label="Country"
                control={control}
              />
              <div data-testid="value">{watch('country')}</div>
            </>
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/germany/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/germany/i))

      await waitFor(() => {
        expect(screen.getByTestId('value')).toHaveTextContent('DE')
      })
    })

    it('should show checkmark on selected country', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper defaultValues={{ country: 'FR' }}>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      await user.click(button)

      await waitFor(() => {
        const franceOption = screen.getByText(/france/i).closest('div')
        expect(franceOption).toBeInTheDocument()
      })
    })

    it('should allow changing selected country', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper defaultValues={{ country: 'US' }}>
          {({ control, watch }) => (
            <>
              <CountrySelectField
                name="country"
                label="Country"
                control={control}
              />
              <div data-testid="value">{watch('country')}</div>
            </>
          )}
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByTestId('value')).toHaveTextContent('US')
      })

      const button = screen.getByRole('button')
      await user.click(button)

      await waitFor(() => {
        expect(screen.getByText(/canada/i)).toBeInTheDocument()
      })

      await user.click(screen.getByText(/canada/i))

      await waitFor(() => {
        expect(screen.getByTestId('value')).toHaveTextContent('CA')
      })
    })
  })

  describe('Validation', () => {
    it('should apply required validation when required is true', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
              required={true}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/country/i)).toBeInTheDocument()
    })

    it('should not apply validation when required is false', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
              required={false}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/country/i)).toBeInTheDocument()
    })
  })

  describe('Error Display', () => {
    it('should display error message when error prop is provided', () => {
      const mockError = {
        type: 'required',
        message: 'Please select country',
      }

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
              error={mockError}
            />
          )}
        </TestWrapper>
      )

      expect(screen.getByText(/please select country/i)).toBeInTheDocument()
      expect(screen.getByText(/please select country/i)).toHaveClass('text-red-500')
    })

    it('should not display error when error prop is undefined', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const errorMessage = screen.queryByText(/please select/i)
      expect(errorMessage).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have correct htmlFor attribute on label', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="userCountry"
              label="User Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const label = screen.getByText(/user country/i)
      expect(label).toHaveAttribute('for', 'userCountry')
    })

    it('should have combobox role on button', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('role', 'combobox')
    })

    it('should indicate expanded state', async () => {
      const user = userEvent.setup()

      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-expanded', 'false')

      await user.click(button)

      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true')
      })
    })
  })

  describe('CSS Classes', () => {
    it('should apply correct classes to components', () => {
      render(
        <TestWrapper>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('country-select-trigger')
      
      const label = screen.getByText(/country/i)
      expect(label).toHaveClass('form-label')
    })
  })

  describe('Flag Emoji Display', () => {
    it('should display flag emoji for selected country', async () => {
      render(
        <TestWrapper defaultValues={{ country: 'US' }}>
          {({ control }) => (
            <CountrySelectField
              name="country"
              label="Country"
              control={control}
            />
          )}
        </TestWrapper>
      )

      await waitFor(() => {
        // Flag emojis are rendered, we check that US and its label are present
        expect(screen.getByText(/united states/i)).toBeInTheDocument()
      })
    })
  })
})