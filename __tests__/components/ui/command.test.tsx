import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

describe('Command UI Component', () => {
  it('should render command component', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
      </Command>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('should render command empty state', () => {
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('should render command items in group', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Item 1</CommandItem>
            <CommandItem>Item 2</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should apply data-slot attribute', () => {
    const { container } = render(<Command />);
    const command = container.querySelector('[data-slot="command"]');
    expect(command).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    const { container } = render(<Command className="custom-command" />);
    const command = container.querySelector('[data-slot="command"]');
    expect(command).toHaveClass('custom-command');
  });

  it('should handle various placeholder texts', () => {
    const placeholders = ['Type to search...', 'Find items', 'Search countries...'];

    placeholders.forEach(placeholder => {
      const { unmount } = render(
        <Command>
          <CommandInput placeholder={placeholder} />
        </Command>
      );

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
      unmount();
    });
  });
});