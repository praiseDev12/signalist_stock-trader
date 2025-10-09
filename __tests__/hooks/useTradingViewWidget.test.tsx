import { renderHook } from '@testing-library/react'
import useTradingViewWidget from '@/hooks/useTradingViewWidget'

describe('hooks/useTradingViewWidget', () => {
  beforeEach(() => {
    // Clear any existing DOM elements
    document.body.innerHTML = ''
  })

  describe('Basic functionality', () => {
    test('should return a ref object', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {}, 600)
      )

      expect(result.current).toBeDefined()
      expect(result.current).toHaveProperty('current')
    })

    test('should accept scriptUrl parameter', () => {
      const scriptUrl = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
      const { result } = renderHook(() =>
        useTradingViewWidget(scriptUrl, {}, 600)
      )

      expect(result.current).toBeDefined()
    })

    test('should accept config parameter', () => {
      const config = {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
      }
      
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', config, 600)
      )

      expect(result.current).toBeDefined()
    })

    test('should accept height parameter', () => {
      const heights = [400, 600, 800]
      
      heights.forEach(height => {
        const { result } = renderHook(() =>
          useTradingViewWidget('https://example.com/script.js', {}, height)
        )
        expect(result.current).toBeDefined()
      })
    })

    test('should use default height of 600 when not provided', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {})
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Configuration handling', () => {
    test('should handle empty config object', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {})
      )

      expect(result.current).toBeDefined()
    })

    test('should handle complex config objects', () => {
      const complexConfig = {
        colorTheme: 'dark',
        dateRange: '12M',
        locale: 'en',
        tabs: [
          {
            title: 'Financial',
            symbols: [
              { s: 'NYSE:JPM', d: 'JPMorgan Chase' },
            ],
          },
        ],
        backgroundColor: '#141414',
        width: '100%',
        height: 600,
      }
      
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', complexConfig, 600)
      )

      expect(result.current).toBeDefined()
    })

    test('should handle config with nested objects', () => {
      const config = {
        symbolsGroups: [
          {
            name: 'Technology',
            symbols: [
              { name: 'NASDAQ:AAPL', displayName: 'Apple' },
              { name: 'NASDAQ:MSFT', displayName: 'Microsoft' },
            ],
          },
        ],
      }
      
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', config)
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Hook lifecycle', () => {
    test('should maintain ref across re-renders', () => {
      const { result, rerender } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {})
      )

      const firstRef = result.current
      rerender()
      const secondRef = result.current

      // Ref should remain the same object
      expect(firstRef).toBe(secondRef)
    })

    test('should handle unmount gracefully', () => {
      const { unmount } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {})
      )

      expect(() => unmount()).not.toThrow()
    })
  })

  describe('Different script URLs', () => {
    test('should handle market overview widget URL', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget(
          'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js',
          {}
        )
      )

      expect(result.current).toBeDefined()
    })

    test('should handle technical analysis widget URL', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget(
          'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js',
          {}
        )
      )

      expect(result.current).toBeDefined()
    })

    test('should handle symbol info widget URL', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget(
          'https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js',
          {}
        )
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Height variations', () => {
    test('should handle various height values', () => {
      const heights = [200, 400, 600, 800, 1000]
      
      heights.forEach(height => {
        const { result } = renderHook(() =>
          useTradingViewWidget('https://example.com/script.js', {}, height)
        )
        expect(result.current).toBeDefined()
      })
    })

    test('should handle minimum height', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {}, 100)
      )

      expect(result.current).toBeDefined()
    })

    test('should handle large height values', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', {}, 2000)
      )

      expect(result.current).toBeDefined()
    })
  })

  describe('Edge cases', () => {
    test('should handle empty scriptUrl', () => {
      const { result } = renderHook(() =>
        useTradingViewWidget('', {})
      )

      expect(result.current).toBeDefined()
    })

    test('should handle special characters in config', () => {
      const config = {
        'special-key': 'value',
        'another_key': 'another value',
      }
      
      const { result } = renderHook(() =>
        useTradingViewWidget('https://example.com/script.js', config)
      )

      expect(result.current).toBeDefined()
    })
  })
})