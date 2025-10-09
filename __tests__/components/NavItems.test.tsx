import React from 'react'
import { render, screen } from '@testing-library/react'
import NavItems from '@/components/NavItems'

// Mock usePathname from next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

describe('components/NavItems', () => {
  beforeEach(() => {
    const { usePathname } = require('next/navigation')
    usePathname.mockReturnValue('/')
  })

  describe('Basic rendering', () => {
    test('should render navigation items', () => {
      render(<NavItems />)
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
    })

    test('should render as unordered list', () => {
      const { container } = render(<NavItems />)
      
      const ul = container.querySelector('ul')
      expect(ul).toBeInTheDocument()
    })

    test('should render list items for each nav item', () => {
      const { container } = render(<NavItems />)
      
      const listItems = container.querySelectorAll('li')
      expect(listItems.length).toBeGreaterThan(0)
    })

    test('should render links for each nav item', () => {
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      const searchLink = screen.getByRole('link', { name: 'Search' })
      
      expect(dashboardLink).toBeInTheDocument()
      expect(searchLink).toBeInTheDocument()
    })
  })

  describe('Navigation links', () => {
    test('should have correct href for Dashboard', () => {
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveAttribute('href', '/')
    })

    test('should have correct href for Search', () => {
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveAttribute('href', '/search')
    })
  })

  describe('Active state', () => {
    test('should highlight Dashboard when on home page', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/')
      
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveClass('text-gray-100')
    })

    test('should highlight Search when on search page', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/search')
      
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-100')
    })

    test('should not highlight Dashboard when on search page', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/search')
      
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).not.toHaveClass('text-gray-100')
    })

    test('should handle nested routes', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/search/results')
      
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-100')
    })
  })

  describe('Hover states', () => {
    test('should have hover transition classes', () => {
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveClass('hover:text-yellow-500')
        expect(link).toHaveClass('transition-colors')
      })
    })
  })

  describe('Layout', () => {
    test('should have flex layout', () => {
      const { container } = render(<NavItems />)
      
      const ul = container.querySelector('ul')
      expect(ul).toHaveClass('flex')
    })

    test('should have gap between items', () => {
      const { container } = render(<NavItems />)
      
      const ul = container.querySelector('ul')
      expect(ul).toHaveClass('gap-3')
    })
  })

  describe('Edge cases', () => {
    test('should handle root path', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/')
      
      render(<NavItems />)
      
      const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
      expect(dashboardLink).toHaveClass('text-gray-100')
    })

    test('should handle unknown paths', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/unknown-page')
      
      render(<NavItems />)
      
      // Should render without error
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    test('should handle paths with trailing slashes', () => {
      const { usePathname } = require('next/navigation')
      usePathname.mockReturnValue('/search/')
      
      render(<NavItems />)
      
      const searchLink = screen.getByRole('link', { name: 'Search' })
      expect(searchLink).toHaveClass('text-gray-100')
    })
  })

  describe('Accessibility', () => {
    test('should have semantic list structure', () => {
      const { container } = render(<NavItems />)
      
      const ul = container.querySelector('ul')
      const listItems = container.querySelectorAll('li')
      
      expect(ul).toBeInTheDocument()
      expect(listItems.length).toBeGreaterThan(0)
    })

    test('should have accessible links', () => {
      render(<NavItems />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })
})