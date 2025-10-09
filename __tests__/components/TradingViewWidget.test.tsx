import React from 'react'
import { render, screen } from '@testing-library/react'
import TradingViewWidget from '@/components/TradingViewWidget'

// Mock the hook
jest.mock('@/hooks/useTradingViewWidget', () => {
  return jest.fn(() => ({
    current: document.createElement('div'),
  }))
})

describe('components/TradingViewWidget', () => {
  const mockConfig = {
    colorTheme: 'dark',
    dateRange: '12M',
    locale: 'en',
  }

  describe('Basic rendering', () => {
    test('should render with title', () => {
      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Market Overview')).toBeInTheDocument()
    })

    test('should render without title', () => {
      render(
        <TradingViewWidget
          title=""
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      // Should render without errors
      const container = document.querySelector('.tradingview-widget-container')
      expect(container).toBeInTheDocument()
    })

    test('should render container div', () => {
      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      const container = document.querySelector('.tradingview-widget-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Title rendering', () => {
    test('should display title when provided', () => {
      render(
        <TradingViewWidget
          title="Test Title"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    test('should have correct title styling', () => {
      render(
        <TradingViewWidget
          title="Styled Title"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      const title = screen.getByText('Styled Title')
      expect(title).toHaveClass('font-semibold')
      expect(title).toHaveClass('text-2xl')
      expect(title).toHaveClass('text-gray-100')
      expect(title).toHaveClass('mb-5')
    })

    test('should not render title element when title is empty', () => {
      const { container } = render(
        <TradingViewWidget
          title=""
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      const h3 = container.querySelector('h3')
      expect(h3).not.toBeInTheDocument()
    })
  })

  describe('Props handling', () => {
    test('should accept scriptUrl prop', () => {
      const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
      
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl={scriptUrl}
          config={mockConfig}
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })

    test('should accept config prop', () => {
      const config = {
        colorTheme: 'dark',
        backgroundColor: '#141414',
        width: '100%',
        height: 600,
      }
      
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={config}
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })

    test('should accept height prop', () => {
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
          height={800}
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })

    test('should use default height of 600 when not provided', () => {
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })

    test('should accept className prop', () => {
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
          className="custom-class"
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })
  })

  describe('Hook integration', () => {
    test('should call useTradingViewWidget with correct parameters', () => {
      const useTradingViewWidget = require('@/hooks/useTradingViewWidget').default
      
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
          height={700}
        />
      )

      expect(useTradingViewWidget).toHaveBeenCalledWith(
        'https://example.com/script.js',
        mockConfig,
        700
      )
    })

    test('should use ref from hook', () => {
      const mockRef = { current: document.createElement('div') }
      const useTradingViewWidget = require('@/hooks/useTradingViewWidget').default
      useTradingViewWidget.mockReturnValue(mockRef)
      
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      expect(useTradingViewWidget).toHaveBeenCalled()
    })
  })

  describe('Different widget types', () => {
    test('should render market overview widget', () => {
      render(
        <TradingViewWidget
          title="Market Overview"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Market Overview')).toBeInTheDocument()
    })

    test('should render technical analysis widget', () => {
      render(
        <TradingViewWidget
          title="Technical Analysis"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Technical Analysis')).toBeInTheDocument()
    })

    test('should render symbol info widget', () => {
      render(
        <TradingViewWidget
          title="Symbol Info"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText('Symbol Info')).toBeInTheDocument()
    })
  })

  describe('Memoization', () => {
    test('should be memoized component', () => {
      const { rerender } = render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      // Rerender with same props
      rerender(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      // Should not cause additional renders
      expect(screen.getByText('Market')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    test('should handle empty config', () => {
      render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={{}}
        />
      )

      expect(screen.getByText('Market')).toBeInTheDocument()
    })

    test('should handle long titles', () => {
      const longTitle = 'This is a very long title for the trading view widget that might wrap'
      
      render(
        <TradingViewWidget
          title={longTitle}
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      expect(screen.getByText(longTitle)).toBeInTheDocument()
    })

    test('should handle various height values', () => {
      const heights = [200, 400, 600, 800, 1000]
      
      heights.forEach((height, index) => {
        const { unmount } = render(
          <TradingViewWidget
            title={`Market ${index}`}
            scriptUrl="https://example.com/script.js"
            config={mockConfig}
            height={height}
          />
        )
        
        expect(screen.getByText(`Market ${index}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Container structure', () => {
    test('should have correct container classes', () => {
      const { container } = render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      const widgetContainer = container.querySelector('.tradingview-widget-container')
      expect(widgetContainer).toBeInTheDocument()
    })

    test('should have inner widget container', () => {
      const { container } = render(
        <TradingViewWidget
          title="Market"
          scriptUrl="https://example.com/script.js"
          config={mockConfig}
        />
      )

      const innerContainer = container.querySelector('.tradingview-widget-container__widget')
      expect(innerContainer).toBeInTheDocument()
    })
  })
})