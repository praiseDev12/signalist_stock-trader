import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock child components
jest.mock('@/components/NavItems', () => {
  return function NavItems() {
    return <nav data-testid="nav-items">Nav Items</nav>
  }
})

jest.mock('@/components/UserDropdown', () => {
  return function UserDropdown() {
    return <div data-testid="user-dropdown">User Dropdown</div>
  }
})

describe('components/Header', () => {
  describe('Basic rendering', () => {
    test('should render header element', () => {
      const { container } = render(<Header />)
      
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    test('should render logo', () => {
      render(<Header />)
      
      const logo = screen.getByAltText('Signlist logo')
      expect(logo).toBeInTheDocument()
    })

    test('should render NavItems component', () => {
      render(<Header />)
      
      expect(screen.getByTestId('nav-items')).toBeInTheDocument()
    })

    test('should render UserDropdown component', () => {
      render(<Header />)
      
      expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
    })
  })

  describe('Logo', () => {
    test('should have correct logo alt text', () => {
      render(<Header />)
      
      const logo = screen.getByAltText('Signlist logo')
      expect(logo).toHaveAttribute('alt', 'Signlist logo')
    })

    test('should link to home page', () => {
      render(<Header />)
      
      const logoLink = screen.getByRole('link')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    test('should have correct logo dimensions', () => {
      render(<Header />)
      
      const logo = screen.getByAltText('Signlist logo')
      expect(logo).toHaveAttribute('width', '140')
      expect(logo).toHaveAttribute('height', '32')
    })

    test('should have cursor pointer on logo', () => {
      render(<Header />)
      
      const logo = screen.getByAltText('Signlist logo')
      expect(logo).toHaveClass('cursor-pointer')
    })
  })

  describe('Layout structure', () => {
    test('should have sticky positioning', () => {
      const { container } = render(<Header />)
      
      const header = container.querySelector('header')
      expect(header).toHaveClass('sticky')
      expect(header).toHaveClass('top-0')
    })

    test('should have header class', () => {
      const { container } = render(<Header />)
      
      const header = container.querySelector('header')
      expect(header).toHaveClass('header')
    })

    test('should have container with header-wrapper class', () => {
      const { container } = render(<Header />)
      
      const wrapper = container.querySelector('.header-wrapper')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Navigation visibility', () => {
    test('should hide navigation on small screens', () => {
      const { container } = render(<Header />)
      
      const nav = container.querySelector('nav')
      expect(nav?.parentElement).toHaveClass('hidden')
      expect(nav?.parentElement).toHaveClass('sm:block')
    })
  })

  describe('Component integration', () => {
    test('should render all main components', () => {
      render(<Header />)
      
      expect(screen.getByAltText('Signlist logo')).toBeInTheDocument()
      expect(screen.getByTestId('nav-items')).toBeInTheDocument()
      expect(screen.getByTestId('user-dropdown')).toBeInTheDocument()
    })

    test('should maintain component order', () => {
      const { container } = render(<Header />)
      
      const wrapper = container.querySelector('.header-wrapper')
      const children = wrapper?.children
      
      expect(children).toBeDefined()
      expect(children.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Accessibility', () => {
    test('should use semantic header element', () => {
      const { container } = render(<Header />)
      
      const header = container.querySelector('header')
      expect(header).toBeInTheDocument()
    })

    test('should have accessible logo link', () => {
      render(<Header />)
      
      const logoLink = screen.getByRole('link')
      expect(logoLink).toHaveAttribute('href')
    })

    test('should have descriptive alt text for logo', () => {
      render(<Header />)
      
      const logo = screen.getByAltText('Signlist logo')
      expect(logo).toHaveAttribute('alt')
    })
  })

  describe('Edge cases', () => {
    test('should render without errors', () => {
      expect(() => render(<Header />)).not.toThrow()
    })

    test('should render consistently', () => {
      const { unmount, container: container1 } = render(<Header />)
      const html1 = container1.innerHTML
      unmount()
      
      const { container: container2 } = render(<Header />)
      const html2 = container2.innerHTML
      
      expect(html1).toBe(html2)
    })
  })
})