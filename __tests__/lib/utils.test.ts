import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  describe('Basic Functionality', () => {
    it('should merge class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('should handle single class name', () => {
      expect(cn('single-class')).toBe('single-class')
    })

    it('should handle no arguments', () => {
      expect(cn()).toBe('')
    })

    it('should handle empty strings', () => {
      expect(cn('', '')).toBe('')
    })
  })

  describe('Conditional Classes', () => {
    it('should handle conditional classes with objects', () => {
      const result = cn({
        'active': true,
        'disabled': false,
        'selected': true,
      })
      expect(result).toContain('active')
      expect(result).toContain('selected')
      expect(result).not.toContain('disabled')
    })

    it('should handle mixed conditional and static classes', () => {
      const result = cn('base-class', {
        'active': true,
        'inactive': false,
      })
      expect(result).toContain('base-class')
      expect(result).toContain('active')
      expect(result).not.toContain('inactive')
    })
  })

  describe('Tailwind Merge', () => {
    it('should resolve conflicting Tailwind classes', () => {
      // tailwind-merge should keep the last class when there's a conflict
      const result = cn('p-4', 'p-6')
      expect(result).toBe('p-6')
    })

    it('should merge non-conflicting Tailwind classes', () => {
      const result = cn('text-red-500', 'bg-blue-500')
      expect(result).toContain('text-red-500')
      expect(result).toContain('bg-blue-500')
    })

    it('should handle responsive Tailwind classes', () => {
      const result = cn('p-4', 'md:p-6', 'lg:p-8')
      expect(result).toContain('p-4')
      expect(result).toContain('md:p-6')
      expect(result).toContain('lg:p-8')
    })

    it('should resolve conflicting width classes', () => {
      const result = cn('w-full', 'w-1/2')
      expect(result).toBe('w-1/2')
    })

    it('should resolve conflicting background colors', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })
  })

  describe('Array Handling', () => {
    it('should handle array of class names', () => {
      const result = cn(['class1', 'class2', 'class3'])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle nested arrays', () => {
      const result = cn(['class1', ['class2', 'class3']])
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle mixed arrays and strings', () => {
      const result = cn('class1', ['class2', 'class3'], 'class4')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
      expect(result).toContain('class4')
    })
  })

  describe('Undefined and Null Handling', () => {
    it('should handle undefined values', () => {
      const result = cn('class1', undefined, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle null values', () => {
      const result = cn('class1', null, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle false boolean values', () => {
      const result = cn('class1', false, 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })

    it('should handle 0 and empty string', () => {
      const result = cn('class1', 0, '', 'class2')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
    })
  })

  describe('Complex Scenarios', () => {
    it('should handle complex conditional logic', () => {
      const isActive = true
      const isDisabled = false
      const variant = 'primary'

      const result = cn(
        'base-class',
        {
          'active': isActive,
          'disabled': isDisabled,
        },
        variant === 'primary' && 'primary-class',
        variant === 'secondary' && 'secondary-class'
      )

      expect(result).toContain('base-class')
      expect(result).toContain('active')
      expect(result).not.toContain('disabled')
      expect(result).toContain('primary-class')
      expect(result).not.toContain('secondary-class')
    })

    it('should handle form field styling scenario', () => {
      const isDisabled = false

      const result = cn(
        'form-input',
        'border',
        {
          'border-red-500': true,
          'border-gray-300': false,
          'opacity-50': isDisabled,
          'cursor-not-allowed': isDisabled,
        }
      )

      expect(result).toContain('form-input')
      expect(result).toContain('border')
      expect(result).toContain('border-red-500')
      expect(result).not.toContain('border-gray-300')
      expect(result).not.toContain('opacity-50')
      expect(result).not.toContain('cursor-not-allowed')
    })

    it('should handle button variant styling', () => {
      const variant = 'outline'
      const size = 'md'

      const result = cn(
        'button',
        {
          'button-outline': variant === 'outline',
          'button-solid': variant === 'solid',
        },
        {
          'button-sm': size === 'sm',
          'button-md': size === 'md',
          'button-lg': size === 'lg',
        }
      )

      expect(result).toContain('button')
      expect(result).toContain('button-outline')
      expect(result).toContain('button-md')
      expect(result).not.toContain('button-solid')
      expect(result).not.toContain('button-sm')
      expect(result).not.toContain('button-lg')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very long class name strings', () => {
      const longClassName = 'a'.repeat(1000)
      const result = cn(longClassName)
      expect(result).toBe(longClassName)
    })

    it('should handle many class names', () => {
      const classes = Array.from({ length: 100 }, (_, i) => `class${i}`)
      const result = cn(...classes)
      classes.forEach(cls => {
        expect(result).toContain(cls)
      })
    })

    it('should handle duplicate class names', () => {
      const result = cn('duplicate', 'other', 'duplicate')
      // Should not duplicate the class
      const matches = result.match(/duplicate/g)
      expect(matches?.length).toBeLessThanOrEqual(1)
    })

    it('should handle special characters in class names', () => {
      const result = cn('class-with-dash', 'class_with_underscore', 'class:with:colon')
      expect(result).toContain('class-with-dash')
      expect(result).toContain('class_with_underscore')
    })
  })

  describe('Real-world Usage Patterns', () => {
    it('should work with component prop-based styling', () => {
      interface ButtonProps {
        variant?: 'primary' | 'secondary'
        size?: 'sm' | 'md' | 'lg'
        disabled?: boolean
      }

      const getButtonClasses = ({ variant = 'primary', size = 'md', disabled = false }: ButtonProps) => {
        return cn(
          'button',
          'rounded',
          {
            'bg-blue-500': variant === 'primary',
            'bg-gray-500': variant === 'secondary',
            'px-2 py-1 text-sm': size === 'sm',
            'px-4 py-2': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
            'opacity-50 cursor-not-allowed': disabled,
          }
        )
      }

      expect(getButtonClasses({ variant: 'primary', size: 'md' })).toContain('bg-blue-500')
      expect(getButtonClasses({ variant: 'secondary', size: 'lg' })).toContain('bg-gray-500')
      expect(getButtonClasses({ disabled: true })).toContain('opacity-50')
    })

    it('should work with dark mode theming', () => {
      const result = cn(
        'text-base',
        {
          'text-gray-900 bg-white': false,
          'text-white bg-gray-900': true,
        }
      )

      expect(result).toContain('text-white')
      expect(result).toContain('bg-gray-900')
      expect(result).not.toContain('text-gray-900')
      expect(result).not.toContain('bg-white')
    })
  })
})