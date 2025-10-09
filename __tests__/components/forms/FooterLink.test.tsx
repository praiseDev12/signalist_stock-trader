import { render, screen } from '@testing-library/react'
import FooterLInk from '@/components/forms/FooterLInk'

describe('FooterLink Component', () => {
  describe('Rendering', () => {
    it('should render text and link correctly', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument()
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    })

    it('should render link with correct href', () => {
      render(
        <FooterLInk
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      )

      const link = screen.getByRole('link', { name: /sign in/i })
      expect(link).toHaveAttribute('href', '/sign-in')
    })

    it('should render with different text variations', () => {
      const { rerender } = render(
        <FooterLInk
          text="New here?"
          linkText="Create Account"
          href="/register"
        />
      )

      expect(screen.getByText(/new here\?/i)).toBeInTheDocument()
      expect(screen.getByText(/create account/i)).toBeInTheDocument()

      rerender(
        <FooterLInk
          text="Forgot password?"
          linkText="Reset it"
          href="/reset-password"
        />
      )

      expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument()
      expect(screen.getByText(/reset it/i)).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible link', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAccessibleName(/sign up/i)
    })

    it('should be keyboard navigable', () => {
      render(
        <FooterLInk
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      )

      const link = screen.getByRole('link')
      link.focus()
      expect(link).toHaveFocus()
    })
  })

  describe('CSS Classes', () => {
    it('should apply footer-link class to link', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveClass('footer-link')
    })

    it('should apply text styling to description text', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      const text = screen.getByText(/don't have an account\?/i)
      expect(text).toHaveClass('text-sm', 'text-gray-500')
    })

    it('should center align content', () => {
      const { container } = render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('text-center', 'pt-4')
    })
  })

  describe('Links', () => {
    it('should support absolute URLs', () => {
      render(
        <FooterLInk
          text="Need help?"
          linkText="Contact Support"
          href="https://support.example.com"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://support.example.com')
    })

    it('should support relative URLs', () => {
      render(
        <FooterLInk
          text="Go back"
          linkText="Home"
          href="/"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/')
    })

    it('should support nested routes', () => {
      render(
        <FooterLInk
          text="View terms"
          linkText="Terms and Conditions"
          href="/legal/terms"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/legal/terms')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty text gracefully', () => {
      render(
        <FooterLInk
          text=""
          linkText="Sign Up"
          href="/sign-up"
        />
      )

      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
    })

    it('should handle special characters in text', () => {
      render(
        <FooterLInk
          text="Don't have an account? It's free\!"
          linkText="Sign Up Now"
          href="/sign-up"
        />
      )

      expect(screen.getByText(/don't have an account\? it's free\!/i)).toBeInTheDocument()
    })

    it('should handle long text content', () => {
      render(
        <FooterLInk
          text="If you don't have an account yet, you can create one by clicking the link below"
          linkText="Create Your Free Account"
          href="/sign-up"
        />
      )

      expect(
        screen.getByText(/if you don't have an account yet/i)
      ).toBeInTheDocument()
    })

    it('should handle URLs with query parameters', () => {
      render(
        <FooterLInk
          text="Continue"
          linkText="Next Step"
          href="/onboarding?step=2"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/onboarding?step=2')
    })

    it('should handle URLs with hash fragments', () => {
      render(
        <FooterLInk
          text="Learn more"
          linkText="Read Documentation"
          href="/docs#getting-started"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/docs#getting-started')
    })
  })

  describe('Multiple Instances', () => {
    it('should render multiple footer links independently', () => {
      const { container } = render(
        <>
          <FooterLInk
            text="Don't have an account?"
            linkText="Sign Up"
            href="/sign-up"
          />
          <FooterLInk
            text="Forgot password?"
            linkText="Reset"
            href="/reset"
          />
        </>
      )

      expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument()
      expect(screen.getByText(/sign up/i)).toBeInTheDocument()
      expect(screen.getByText(/forgot password\?/i)).toBeInTheDocument()
      expect(screen.getByText(/reset/i)).toBeInTheDocument()

      const links = container.querySelectorAll('a')
      expect(links).toHaveLength(2)
    })
  })
})