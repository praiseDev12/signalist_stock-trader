import {
  NAV_ITEMS,
  INVESTMENT_GOALS,
  RISK_TOLERANCE_OPTIONS,
  PREFERRED_INDUSTRIES,
  ALERT_TYPE_OPTIONS,
  CONDITION_OPTIONS,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  POPULAR_STOCK_SYMBOLS,
  NO_MARKET_NEWS,
  WATCHLIST_TABLE_HEADER,
} from '@/lib/constants'

describe('lib/constants', () => {
  describe('Navigation constants', () => {
    test('NAV_ITEMS should be an array', () => {
      expect(Array.isArray(NAV_ITEMS)).toBe(true)
    })

    test('NAV_ITEMS should contain valid items', () => {
      expect(NAV_ITEMS.length).toBeGreaterThan(0)
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty('href')
        expect(item).toHaveProperty('label')
        expect(typeof item.href).toBe('string')
        expect(typeof item.label).toBe('string')
      })
    })

    test('NAV_ITEMS should include Dashboard and Search', () => {
      const labels = NAV_ITEMS.map(item => item.label)
      expect(labels).toContain('Dashboard')
      expect(labels).toContain('Search')
    })
  })

  describe('Form options constants', () => {
    test('INVESTMENT_GOALS should have required structure', () => {
      expect(Array.isArray(INVESTMENT_GOALS)).toBe(true)
      expect(INVESTMENT_GOALS.length).toBe(4)
      INVESTMENT_GOALS.forEach(option => {
        expect(option).toHaveProperty('value')
        expect(option).toHaveProperty('label')
        expect(typeof option.value).toBe('string')
        expect(typeof option.label).toBe('string')
      })
    })

    test('INVESTMENT_GOALS should contain expected values', () => {
      const values = INVESTMENT_GOALS.map(opt => opt.value)
      expect(values).toContain('Growth')
      expect(values).toContain('Income')
      expect(values).toContain('Balanced')
      expect(values).toContain('Conservative')
    })

    test('RISK_TOLERANCE_OPTIONS should have required structure', () => {
      expect(Array.isArray(RISK_TOLERANCE_OPTIONS)).toBe(true)
      expect(RISK_TOLERANCE_OPTIONS.length).toBe(3)
      const values = RISK_TOLERANCE_OPTIONS.map(opt => opt.value)
      expect(values).toContain('Low')
      expect(values).toContain('Medium')
      expect(values).toContain('High')
    })

    test('PREFERRED_INDUSTRIES should have required structure', () => {
      expect(Array.isArray(PREFERRED_INDUSTRIES)).toBe(true)
      expect(PREFERRED_INDUSTRIES.length).toBe(5)
      const values = PREFERRED_INDUSTRIES.map(opt => opt.value)
      expect(values).toContain('Technology')
      expect(values).toContain('Healthcare')
      expect(values).toContain('Finance')
      expect(values).toContain('Energy')
      expect(values).toContain('Consumer Goods')
    })

    test('ALERT_TYPE_OPTIONS should contain upper and lower', () => {
      expect(ALERT_TYPE_OPTIONS).toEqual([
        { value: 'upper', label: 'Upper' },
        { value: 'lower', label: 'Lower' },
      ])
    })

    test('CONDITION_OPTIONS should contain comparison operators', () => {
      expect(CONDITION_OPTIONS.length).toBe(2)
      expect(CONDITION_OPTIONS[0].label).toContain('>')
      expect(CONDITION_OPTIONS[1].label).toContain('<')
    })
  })

  describe('TradingView widget configurations', () => {
    test('MARKET_OVERVIEW_WIDGET_CONFIG should have dark theme', () => {
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.colorTheme).toBe('dark')
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.backgroundColor).toBe('#141414')
    })

    test('MARKET_OVERVIEW_WIDGET_CONFIG should have tabs', () => {
      expect(Array.isArray(MARKET_OVERVIEW_WIDGET_CONFIG.tabs)).toBe(true)
      expect(MARKET_OVERVIEW_WIDGET_CONFIG.tabs.length).toBe(3)
      
      const tabTitles = MARKET_OVERVIEW_WIDGET_CONFIG.tabs.map(tab => tab.title)
      expect(tabTitles).toContain('Financial')
      expect(tabTitles).toContain('Technology')
      expect(tabTitles).toContain('Services')
    })

    test('MARKET_OVERVIEW_WIDGET_CONFIG tabs should contain symbols', () => {
      MARKET_OVERVIEW_WIDGET_CONFIG.tabs.forEach(tab => {
        expect(Array.isArray(tab.symbols)).toBe(true)
        expect(tab.symbols.length).toBeGreaterThan(0)
        tab.symbols.forEach(symbol => {
          expect(symbol).toHaveProperty('s')
          expect(symbol).toHaveProperty('d')
        })
      })
    })

    test('HEATMAP_WIDGET_CONFIG should have correct properties', () => {
      expect(HEATMAP_WIDGET_CONFIG.dataSource).toBe('SPX500')
      expect(HEATMAP_WIDGET_CONFIG.colorTheme).toBe('dark')
      expect(HEATMAP_WIDGET_CONFIG.isTransparent).toBe(true)
    })

    test('TOP_STORIES_WIDGET_CONFIG should have news settings', () => {
      expect(TOP_STORIES_WIDGET_CONFIG.feedMode).toBe('market')
      expect(TOP_STORIES_WIDGET_CONFIG.market).toBe('stock')
      expect(TOP_STORIES_WIDGET_CONFIG.colorTheme).toBe('dark')
    })

    test('MARKET_DATA_WIDGET_CONFIG should have symbol groups', () => {
      expect(Array.isArray(MARKET_DATA_WIDGET_CONFIG.symbolsGroups)).toBe(true)
      expect(MARKET_DATA_WIDGET_CONFIG.symbolsGroups.length).toBe(3)
      
      MARKET_DATA_WIDGET_CONFIG.symbolsGroups.forEach(group => {
        expect(group).toHaveProperty('name')
        expect(group).toHaveProperty('symbols')
        expect(Array.isArray(group.symbols)).toBe(true)
      })
    })
  })

  describe('Dynamic widget configuration functions', () => {
    test('SYMBOL_INFO_WIDGET_CONFIG should return config with uppercase symbol', () => {
      const config = SYMBOL_INFO_WIDGET_CONFIG('aapl')
      expect(config.symbol).toBe('AAPL')
      expect(config.colorTheme).toBe('dark')
      expect(config.isTransparent).toBe(true)
    })

    test('CANDLE_CHART_WIDGET_CONFIG should return config with symbol', () => {
      const config = CANDLE_CHART_WIDGET_CONFIG('tsla')
      expect(config.symbol).toBe('TSLA')
      expect(config.theme).toBe('dark')
      expect(config.interval).toBe('D')
    })

    test('BASELINE_WIDGET_CONFIG should return config with symbol', () => {
      const config = BASELINE_WIDGET_CONFIG('msft')
      expect(config.symbol).toBe('MSFT')
      expect(config.style).toBe(10)
      expect(config.theme).toBe('dark')
    })

    test('TECHNICAL_ANALYSIS_WIDGET_CONFIG should return config with symbol', () => {
      const config = TECHNICAL_ANALYSIS_WIDGET_CONFIG('googl')
      expect(config.symbol).toBe('GOOGL')
      expect(config.colorTheme).toBe('dark')
      expect(config.interval).toBe('1h')
    })

    test('COMPANY_PROFILE_WIDGET_CONFIG should return config with symbol', () => {
      const config = COMPANY_PROFILE_WIDGET_CONFIG('amzn')
      expect(config.symbol).toBe('AMZN')
      expect(config.colorTheme).toBe('dark')
      expect(typeof config.height).toBe('number')
    })

    test('COMPANY_FINANCIALS_WIDGET_CONFIG should return config with symbol', () => {
      const config = COMPANY_FINANCIALS_WIDGET_CONFIG('nvda')
      expect(config.symbol).toBe('NVDA')
      expect(config.colorTheme).toBe('dark')
      expect(config.displayMode).toBe('regular')
    })

    test('widget config functions should handle lowercase symbols', () => {
      const symbols = ['aapl', 'tsla', 'msft', 'googl']
      symbols.forEach(symbol => {
        const config1 = SYMBOL_INFO_WIDGET_CONFIG(symbol)
        const config2 = CANDLE_CHART_WIDGET_CONFIG(symbol)
        const config3 = BASELINE_WIDGET_CONFIG(symbol)
        
        expect(config1.symbol).toBe(symbol.toUpperCase())
        expect(config2.symbol).toBe(symbol.toUpperCase())
        expect(config3.symbol).toBe(symbol.toUpperCase())
      })
    })
  })

  describe('Stock symbols', () => {
    test('POPULAR_STOCK_SYMBOLS should be an array', () => {
      expect(Array.isArray(POPULAR_STOCK_SYMBOLS)).toBe(true)
    })

    test('POPULAR_STOCK_SYMBOLS should contain popular tech stocks', () => {
      expect(POPULAR_STOCK_SYMBOLS).toContain('AAPL')
      expect(POPULAR_STOCK_SYMBOLS).toContain('MSFT')
      expect(POPULAR_STOCK_SYMBOLS).toContain('GOOGL')
      expect(POPULAR_STOCK_SYMBOLS).toContain('TSLA')
      expect(POPULAR_STOCK_SYMBOLS).toContain('NVDA')
    })

    test('POPULAR_STOCK_SYMBOLS should have reasonable length', () => {
      expect(POPULAR_STOCK_SYMBOLS.length).toBeGreaterThan(10)
      expect(POPULAR_STOCK_SYMBOLS.length).toBeLessThan(100)
    })

    test('POPULAR_STOCK_SYMBOLS should contain only uppercase strings', () => {
      POPULAR_STOCK_SYMBOLS.forEach(symbol => {
        expect(typeof symbol).toBe('string')
        expect(symbol).toBe(symbol.toUpperCase())
        expect(symbol.length).toBeGreaterThan(0)
        expect(symbol.length).toBeLessThan(10)
      })
    })
  })

  describe('Misc constants', () => {
    test('NO_MARKET_NEWS should be a string', () => {
      expect(typeof NO_MARKET_NEWS).toBe('string')
      expect(NO_MARKET_NEWS.length).toBeGreaterThan(0)
    })

    test('NO_MARKET_NEWS should contain HTML', () => {
      expect(NO_MARKET_NEWS).toContain('<p')
      expect(NO_MARKET_NEWS).toContain('</p>')
    })

    test('WATCHLIST_TABLE_HEADER should be an array of strings', () => {
      expect(Array.isArray(WATCHLIST_TABLE_HEADER)).toBe(true)
      WATCHLIST_TABLE_HEADER.forEach(header => {
        expect(typeof header).toBe('string')
      })
    })

    test('WATCHLIST_TABLE_HEADER should contain expected columns', () => {
      expect(WATCHLIST_TABLE_HEADER).toContain('Company')
      expect(WATCHLIST_TABLE_HEADER).toContain('Symbol')
      expect(WATCHLIST_TABLE_HEADER).toContain('Price')
      expect(WATCHLIST_TABLE_HEADER).toContain('Action')
    })
  })
})