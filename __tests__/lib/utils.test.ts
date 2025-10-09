import { cn } from '@/lib/utils'

describe('lib/utils - cn function', () => {
  describe('Basic functionality', () => {
    test('should merge single class name', () => {
      expect(cn('foo')).toBe('foo')
    })

    test('should merge multiple class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    test('should handle empty strings', () => {
      expect(cn('', 'foo', '')).toBe('foo')
    })

    test('should handle undefined values', () => {
      expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    })

    test('should handle null values', () => {
      expect(cn('foo', null, 'bar')).toBe('foo bar')
    })

    test('should handle false boolean values', () => {
      expect(cn('foo', false, 'bar')).toBe('foo bar')
    })
  })

  describe('Conditional classes', () => {
    test('should handle conditional classes with objects', () => {
      const result = cn({
        'foo': true,
        'bar': false,
        'baz': true,
      })
      expect(result).toBe('foo baz')
    })

    test('should merge conditional and regular classes', () => {
      const result = cn('base', {
        'active': true,
        'disabled': false,
      })
      expect(result).toBe('base active')
    })
  })

  describe('Tailwind merge functionality', () => {
    test('should merge conflicting Tailwind classes correctly', () => {
      // Later classes should override earlier ones
      const result = cn('px-2', 'px-4')
      expect(result).toBe('px-4')
    })

    test('should handle margin classes', () => {
      const result = cn('m-2', 'm-4')
      expect(result).toBe('m-4')
    })

    test('should handle text size classes', () => {
      const result = cn('text-sm', 'text-lg')
      expect(result).toBe('text-lg')
    })

    test('should not merge different axis padding', () => {
      const result = cn('px-2', 'py-4')
      expect(result).toContain('px-2')
      expect(result).toContain('py-4')
    })
  })

  describe('Complex scenarios', () => {
    test('should handle array of classes', () => {
      const result = cn(['foo', 'bar', 'baz'])
      expect(result).toBe('foo bar baz')
    })

    test('should handle deeply nested conditions', () => {
      const isActive = true
      const result = cn('base', {
        'active': isActive,
        'hover:bg-blue-500': isActive,
      })
      expect(result).toContain('base')
      expect(result).toContain('active')
      expect(result).toContain('hover:bg-blue-500')
      expect(result).not.toContain('disabled')
    })

    test('should handle combination of all input types', () => {
      const result = cn(
        'base',
        'text-sm',
        { 'font-bold': true, 'italic': false },
        undefined,
        null,
        ['flex', 'items-center'],
        'text-lg' // Should override text-sm
      )
      expect(result).toContain('base')
      expect(result).toContain('text-lg')
      expect(result).not.toContain('text-sm')
      expect(result).toContain('font-bold')
      expect(result).not.toContain('italic')
      expect(result).toContain('flex')
      expect(result).toContain('items-center')
    })
  })

  describe('Edge cases', () => {
    test('should handle empty input', () => {
      expect(cn()).toBe('')
    })

    test('should handle whitespace', () => {
      expect(cn('  foo  ', '  bar  ')).toBe('foo bar')
    })

    test('should handle duplicate classes', () => {
      const result = cn('foo', 'bar', 'foo')
      expect(result).toBe('foo bar')
    })
  })
})