import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterLInk from '@/components/forms/FooterLInk';

describe('FooterLInk Component', () => {
  it('should render text and link text', () => {
    render(
      <FooterLInk
        text="Don't have an account?"
        linkText="Sign Up"
        href="/sign-up"
      />
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  it('should render link with correct href', () => {
    render(
      <FooterLInk
        text="Already have an account?"
        linkText="Sign In"
        href="/sign-in"
      />
    );

    const link = screen.getByText('Sign In');
    expect(link).toHaveAttribute('href', '/sign-in');
  });

  it('should apply footer-link class to link', () => {
    render(
      <FooterLInk
        text="Test text"
        linkText="Test Link"
        href="/test"
      />
    );

    const link = screen.getByText('Test Link');
    expect(link).toHaveClass('footer-link');
  });

  it('should apply text-center to wrapper', () => {
    const { container } = render(
      <FooterLInk
        text="Test text"
        linkText="Test Link"
        href="/test"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-center');
  });

  it('should handle sign-up flow links', () => {
    render(
      <FooterLInk
        text="Don't have an account?"
        linkText="Create an account"
        href="/sign-up"
      />
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toHaveAttribute('href', '/sign-up');
  });

  it('should handle sign-in flow links', () => {
    render(
      <FooterLInk
        text="Already have an account?"
        linkText="Sign In"
        href="/sign-in"
      />
    );

    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toHaveAttribute('href', '/sign-in');
  });

  it('should handle empty text', () => {
    render(
      <FooterLInk
        text=""
        linkText="Link"
        href="/path"
      />
    );

    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('should handle special characters in text', () => {
    render(
      <FooterLInk
        text="Test & special <> characters"
        linkText="Click Here"
        href="/test"
      />
    );

    expect(screen.getByText('Test & special <> characters')).toBeInTheDocument();
  });

  it('should handle absolute URLs', () => {
    render(
      <FooterLInk
        text="External link"
        linkText="Visit Site"
        href="https://example.com"
      />
    );

    const link = screen.getByText('Visit Site');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('should handle hash links', () => {
    render(
      <FooterLInk
        text="Jump to"
        linkText="Section"
        href="#section"
      />
    );

    const link = screen.getByText('Section');
    expect(link).toHaveAttribute('href', '#section');
  });

  it('should render with long text content', () => {
    const longText = 'This is a very long text that might wrap to multiple lines in the UI';
    render(
      <FooterLInk
        text={longText}
        linkText="Long Link Text Here"
        href="/path"
      />
    );

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByText('Long Link Text Here')).toBeInTheDocument();
  });

  it('should handle query parameters in href', () => {
    render(
      <FooterLInk
        text="Continue"
        linkText="Next"
        href="/path?param=value&other=test"
      />
    );

    const link = screen.getByText('Next');
    expect(link).toHaveAttribute('href', '/path?param=value&other=test');
  });
});