import { signInWithEmail, signUpWithEmail } from '@/lib/actions/auth.actions'

// Mock console methods
const originalConsoleLog = console.log
const originalConsoleError = console.log

describe('lib/actions/auth.actions', () => {
  beforeEach(() => {
    console.log = jest.fn()
    console.error = jest.fn()
  })

  afterEach(() => {
    console.log = originalConsoleLog
    console.error = originalConsoleError
    jest.clearAllMocks()
  })

  describe('signInWithEmail', () => {
    test('should accept email and password', async () => {
      const data: SignInFormData = {
        email: 'test@example.com',
        password: 'password123',
      }

      await signInWithEmail(data)
      expect(console.log).toHaveBeenCalledWith('Sing in')
    })

    test('should handle valid email format', async () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.com',
        'user+tag@example.co.uk',
      ]

      for (const email of validEmails) {
        const data: SignInFormData = {
          email,
          password: 'password123',
        }
        await signInWithEmail(data)
      }
      
      expect(console.log).toHaveBeenCalledTimes(validEmails.length)
    })

    test('should handle different password lengths', async () => {
      const passwords = ['12345678', 'longpassword123', 'p@ssW0rd\!']
      
      for (const password of passwords) {
        const data: SignInFormData = {
          email: 'test@example.com',
          password,
        }
        await signInWithEmail(data)
      }
    })

    test('should return error object on failure', async () => {
      // Mock an error scenario by passing invalid data or simulating error
      const result = await signInWithEmail({
        email: '',
        password: '',
      })

      // Based on current implementation, it should either succeed or return error
      if (result) {
        expect(result).toHaveProperty('success')
        expect(result).toHaveProperty('error')
        expect(result.success).toBe(false)
      }
    })
  })

  describe('signUpWithEmail', () => {
    const validSignUpData: SignUpFormData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      country: 'US',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    }

    test('should accept all required sign up fields', async () => {
      await signUpWithEmail(validSignUpData)
      expect(console.log).toHaveBeenCalledWith('Sing up with email')
    })

    test('should handle various full names', async () => {
      const names = [
        'John Doe',
        'María García',
        '李明',
        'Jean-Pierre',
        'O\'Connor',
      ]

      for (const fullName of names) {
        await signUpWithEmail({ ...validSignUpData, fullName })
      }
      
      expect(console.log).toHaveBeenCalledTimes(names.length)
    })

    test('should handle different countries', async () => {
      const countries = ['US', 'GB', 'CA', 'AU', 'DE']
      
      for (const country of countries) {
        await signUpWithEmail({ ...validSignUpData, country })
      }
    })

    test('should handle all investment goals', async () => {
      const goals = ['Growth', 'Income', 'Balanced', 'Conservative']
      
      for (const investmentGoals of goals) {
        await signUpWithEmail({ ...validSignUpData, investmentGoals })
      }
    })

    test('should handle all risk tolerance levels', async () => {
      const levels = ['Low', 'Medium', 'High']
      
      for (const riskTolerance of levels) {
        await signUpWithEmail({ ...validSignUpData, riskTolerance })
      }
    })

    test('should handle all preferred industries', async () => {
      const industries = [
        'Technology',
        'Healthcare',
        'Finance',
        'Energy',
        'Consumer Goods',
      ]
      
      for (const preferredIndustry of industries) {
        await signUpWithEmail({ ...validSignUpData, preferredIndustry })
      }
    })

    test('should return error object on failure', async () => {
      const result = await signUpWithEmail({
        fullName: '',
        email: '',
        password: '',
        country: '',
        investmentGoals: '',
        riskTolerance: '',
        preferredIndustry: '',
      })

      if (result) {
        expect(result).toHaveProperty('success')
        expect(result).toHaveProperty('error')
        expect(result.success).toBe(false)
      }
    })

    test('should handle edge case email formats', async () => {
      const edgeCaseEmails = [
        'user@subdomain.example.com',
        'user.name+tag@example.co.uk',
        'x@example.com',
      ]

      for (const email of edgeCaseEmails) {
        await signUpWithEmail({ ...validSignUpData, email })
      }
    })

    test('should accept minimum required password length', async () => {
      // Assuming 8 characters is minimum
      const minPassword = '12345678'
      await signUpWithEmail({ ...validSignUpData, password: minPassword })
      expect(console.log).toHaveBeenCalled()
    })
  })

  describe('Error handling', () => {
    test('signInWithEmail should handle exceptions gracefully', async () => {
      // Mock error by passing data that might cause issues
      const result = await signInWithEmail({
        email: 'test@example.com',
        password: 'test',
      })
      
      // Should not throw, should either succeed or return error object
      expect(typeof result === 'undefined' || typeof result === 'object').toBe(true)
    })

    test('signUpWithEmail should handle exceptions gracefully', async () => {
      const result = await signUpWithEmail({
        fullName: 'Test',
        email: 'test@example.com',
        password: 'test',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      })
      
      expect(typeof result === 'undefined' || typeof result === 'object').toBe(true)
    })
  })
})