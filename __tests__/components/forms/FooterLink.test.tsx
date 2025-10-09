import React from 'react'
import { render, screen } from '@testing-library/react'
import FooterLInk from '@/components/forms/FooterLInk'

describe('components/forms/FooterLink', () => {
  describe('Basic rendering', () => {
    test('should render text and link', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      )

      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
      expect(screen.getByText('Sign up')).toBeInTheDocument()
    })

    test('should render link with correct href', () => {
      render(
        <FooterLInk
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      )

      const link = screen.getByRole('link', { name: 'Sign in' })
      expect(link).toHaveAttribute('href', '/sign-in')
    })
  })

  describe('Text content', () => {
    test('should display provided text', () => {
      render(
        <FooterLInk
          text="Need help?"
          linkText="Contact support"
          href="/support"
        />
      )

      expect(screen.getByText('Need help?')).toBeInTheDocument()
    })

    test('should handle empty text', () => {
      render(
        <FooterLInk
          text=""
          linkText="Click here"
          href="/link"
        />
      )

      expect(screen.getByText('Click here')).toBeInTheDocument()
    })

    test('should handle long text', () => {
      const longText = 'This is a very long text that might wrap to multiple lines'
      
      render(
        <FooterLInk
          text={longText}
          linkText="Link"
          href="/link"
        />
      )

      expect(screen.getByText(longText)).toBeInTheDocument()
    })
  })

  describe('Link properties', () => {
    test('should render link text', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Custom Link Text"
          href="/custom"
        />
      )

      expect(screen.getByText('Custom Link Text')).toBeInTheDocument()
    })

    test('should have correct href attribute', () => {
      const href = '/custom-route'
      
      render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href={href}
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', href)
    })

    test('should handle relative paths', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/relative/path"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/relative/path')
    })

    test('should handle root path', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Home"
          href="/"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/')
    })
  })

  describe('Auth flow links', () => {
    test('should render sign up link correctly', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      )

      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
      const link = screen.getByRole('link', { name: 'Create an account' })
      expect(link).toHaveAttribute('href', '/sign-up')
    })

    test('should render sign in link correctly', () => {
      render(
        <FooterLInk
          text="Already have an account?"
          linkText="Sign In"
          href="/sign-in"
        />
      )

      expect(screen.getByText('Already have an account?')).toBeInTheDocument()
      const link = screen.getByRole('link', { name: 'Sign In' })
      expect(link).toHaveAttribute('href', '/sign-in')
    })
  })

  describe('Accessibility', () => {
    test('should have accessible link', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Accessible Link"
          href="/link"
        />
      )

      const link = screen.getByRole('link', { name: 'Accessible Link' })
      expect(link).toBeInTheDocument()
    })

    test('should have href attribute for keyboard navigation', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href')
    })
  })

  describe('Edge cases', () => {
    test('should handle special characters in text', () => {
      render(
        <FooterLInk
          text="Don't have an account?"
          linkText="Sign up"
          href="/sign-up"
        />
      )

      expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    })

    test('should handle special characters in link text', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Click here →"
          href="/link"
        />
      )

      expect(screen.getByText('Click here →')).toBeInTheDocument()
    })

    test('should handle URLs with query parameters', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link?param=value"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/link?param=value')
    })

    test('should handle URLs with hash fragments', () => {
      render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link#section"
        />
      )

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', '/link#section')
    })
  })

  describe('Layout and styling', () => {
    test('should render as paragraph', () => {
      const { container } = render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link"
        />
      )

      const paragraph = container.querySelector('p')
      expect(paragraph).toBeInTheDocument()
    })

    test('should contain both text and link in same container', () => {
      render(
        <FooterLInk
          text="Question?"
          linkText="Answer"
          href="/answer"
        />
      )

      expect(screen.getByText('Question?')).toBeInTheDocument()
      expect(screen.getByText('Answer')).toBeInTheDocument()
    })
  })

  describe('Component rendering', () => {
    test('should render without errors', () => {
      expect(() =>
        render(
          <FooterLInk
            text="Text"
            linkText="Link"
            href="/link"
          />
        )
      ).not.toThrow()
    })

    test('should render consistently', () => {
      const { unmount, container: container1 } = render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link"
        />
      )
      const html1 = container1.innerHTML
      unmount()

      const { container: container2 } = render(
        <FooterLInk
          text="Text"
          linkText="Link"
          href="/link"
        />
      )
      const html2 = container2.innerHTML

      expect(html1).toBe(html2)
    })
  })
})