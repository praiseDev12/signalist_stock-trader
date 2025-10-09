import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label UI Component', () => {
  it('should render label with text', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should accept htmlFor prop', () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    const label = screen.getByText('Input Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('should accept className prop', () => {
    render(<Label className="custom-class">Custom Label</Label>);
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-class');
  });

  it('should apply data-slot attribute', () => {
    render(<Label>Data Slot</Label>);
    const label = screen.getByText('Data Slot');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('should handle children elements', () => {
    render(
      <Label>
        <span>Child Element</span>
      </Label>
    );
    expect(screen.getByText('Child Element')).toBeInTheDocument();
  });

  it('should handle multiple children', () => {
    render(
      <Label>
        <span>First</span>
        <span>Second</span>
      </Label>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('should apply default styling classes', () => {
    render(<Label>Styled Label</Label>);
    const label = screen.getByText('Styled Label');
    expect(label).toHaveClass('text-sm', 'leading-none', 'font-medium');
  });

  it('should merge custom classes with defaults', () => {
    render(<Label className="text-lg">Large Label</Label>);
    const label = screen.getByText('Large Label');
    expect(label).toHaveClass('text-lg');
  });

  it('should render with various text content', () => {
    const texts = [
      'Short',
      'Medium length label',
      'This is a very long label that might wrap to multiple lines in the UI',
    ];

    texts.forEach(text => {
      const { unmount } = render(<Label>{text}</Label>);
      expect(screen.getByText(text)).toBeInTheDocument();
      unmount();
    });
  });

  it('should handle special characters', () => {
    render(<Label>Label with & special <> characters</Label>);
    expect(screen.getByText('Label with & special <> characters')).toBeInTheDocument();
  });

  it('should work with form fields', () => {
    render(
      <div>
        <Label htmlFor="email-input">Email Address</Label>
        <input id="email-input" type="email" />
      </div>
    );
    
    const label = screen.getByText('Email Address');
    expect(label).toHaveAttribute('for', 'email-input');
  });

  it('should handle click events', () => {
    render(<Label>Clickable Label</Label>);
    const label = screen.getByText('Clickable Label');
    label.click();
    // Label clicked successfully without errors
  });

  it('should render with aria attributes', () => {
    render(<Label aria-label="Accessible Label">Visual Label</Label>);
    const label = screen.getByText('Visual Label');
    expect(label).toHaveAttribute('aria-label', 'Accessible Label');
  });

  it('should handle empty children', () => {
    render(<Label></Label>);
    // Should render without crashing
  });

  it('should handle numeric children', () => {
    render(<Label>{123}</Label>);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('should handle boolean display', () => {
    render(<Label>{"Active: " + true}</Label>);
    expect(screen.getByText('Active: true')).toBeInTheDocument();
  });
});