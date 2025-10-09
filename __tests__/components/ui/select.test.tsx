import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';

describe('Select UI Component', () => {
  it('should render select trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
      </Select>
    );

    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('should render with combobox role', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Test" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
  });

  it('should apply data-slot attribute to select', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    const select = container.querySelector('[data-slot="select"]');
    expect(select).toBeInTheDocument();
  });

  it('should apply data-slot attribute to trigger', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
  });

  it('should handle different placeholder text', () => {
    const placeholders = ['Choose one', 'Select...', 'Pick an option'];

    placeholders.forEach(placeholder => {
      const { unmount } = render(
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </Select>
      );

      expect(screen.getByText(placeholder)).toBeInTheDocument();
      unmount();
    });
  });

  it('should accept custom className on trigger', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Test" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('should handle default size', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Default size" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-size', 'default');
  });

  it('should handle small size', () => {
    render(
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Small size" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('data-size', 'sm');
  });

  it('should handle disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
      </Select>
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });

  it('should render chevron icon', () => {
    const { container } = render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="With icon" />
        </SelectTrigger>
      </Select>
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});