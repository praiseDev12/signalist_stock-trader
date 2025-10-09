import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input UI Component', () => {
  it('should render input element', () => {
    render(<Input placeholder="Test input" />);
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
  });

  it('should render with type text by default', () => {
    render(<Input placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input.type).toBe('text');
  });

  it('should accept type prop', () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email') as HTMLInputElement;
    expect(input.type).toBe('email');
  });

  it('should accept password type', () => {
    render(<Input type="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(input.type).toBe('password');
  });

  it('should handle disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
  });

  it('should accept className prop', () => {
    render(<Input className="custom-class" placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('custom-class');
  });

  it('should merge default classes with custom classes', () => {
    render(<Input className="my-class" placeholder="Test" />);
    const input = screen.getByPlaceholderText('Test');
    expect(input).toHaveClass('my-class');
  });

  it('should accept value prop', () => {
    render(<Input value="test value" placeholder="Test" readOnly />);
    const input = screen.getByPlaceholderText('Test') as HTMLInputElement;
    expect(input.value).toBe('test value');
  });

  it('should render with various input types', () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'];

    types.forEach(type => {
      const { unmount } = render(
        <Input type={type as any} placeholder={`${type} input`} />
      );
      
      const input = screen.getByPlaceholderText(`${type} input`) as HTMLInputElement;
      expect(input.type).toBe(type);
      unmount();
    });
  });

  it('should handle focus state', () => {
    render(<Input placeholder="Focus test" />);
    const input = screen.getByPlaceholderText('Focus test');
    input.focus();
    expect(input).toHaveFocus();
  });

  it('should accept aria attributes', () => {
    render(
      <Input
        placeholder="Aria test"
        aria-label="Test input"
        aria-required="true"
        aria-invalid="true"
      />
    );
    
    const input = screen.getByPlaceholderText('Aria test');
    expect(input).toHaveAttribute('aria-label', 'Test input');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should handle readonly state', () => {
    render(<Input readOnly placeholder="Readonly" value="Cannot edit" />);
    const input = screen.getByPlaceholderText('Readonly') as HTMLInputElement;
    expect(input).toHaveAttribute('readonly');
  });

  it('should accept id prop', () => {
    render(<Input id="test-input" placeholder="ID test" />);
    const input = screen.getByPlaceholderText('ID test');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('should accept name prop', () => {
    render(<Input name="testName" placeholder="Name test" />);
    const input = screen.getByPlaceholderText('Name test');
    expect(input).toHaveAttribute('name', 'testName');
  });

  it('should accept maxLength prop', () => {
    render(<Input maxLength={10} placeholder="Max length test" />);
    const input = screen.getByPlaceholderText('Max length test');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('should accept minLength prop', () => {
    render(<Input minLength={3} placeholder="Min length test" />);
    const input = screen.getByPlaceholderText('Min length test');
    expect(input).toHaveAttribute('minLength', '3');
  });

  it('should accept pattern prop', () => {
    render(<Input pattern="[0-9]*" placeholder="Pattern test" />);
    const input = screen.getByPlaceholderText('Pattern test');
    expect(input).toHaveAttribute('pattern', '[0-9]*');
  });

  it('should accept required prop', () => {
    render(<Input required placeholder="Required test" />);
    const input = screen.getByPlaceholderText('Required test');
    expect(input).toBeRequired();
  });

  it('should handle number type with min and max', () => {
    render(<Input type="number" min={0} max={100} placeholder="Number range" />);
    const input = screen.getByPlaceholderText('Number range');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });

  it('should apply data-slot attribute', () => {
    render(<Input placeholder="Data slot test" />);
    const input = screen.getByPlaceholderText('Data slot test');
    expect(input).toHaveAttribute('data-slot', 'input');
  });
});