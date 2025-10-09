import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

describe('Popover UI Component', () => {
  it('should render popover trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('should accept custom className on content', () => {
    const { container } = render(
      <Popover open={true}>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent className="custom-popover">Content</PopoverContent>
      </Popover>
    );

    const content = screen.getByText('Content');
    expect(content.parentElement).toHaveClass('custom-popover');
  });

  it('should handle different trigger content', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Custom Button</button>
        </PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    expect(screen.getByText('Custom Button')).toBeInTheDocument();
  });
});