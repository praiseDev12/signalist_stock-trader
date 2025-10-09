import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signInWithEmail, signUpWithEmail } from '@/lib/actions/auth.actions';

describe('Auth Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('signInWithEmail', () => {
    it('should accept valid email and password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await signInWithEmail(credentials);
      expect(console.log).toHaveBeenCalledWith('Sing in');
    });

    it('should handle sign in with empty email', async () => {
      const credentials = {
        email: '',
        password: 'password123',
      };

      const result = await signInWithEmail(credentials);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle sign in with empty password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: '',
      };

      const result = await signInWithEmail(credentials);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle sign in with invalid email format', async () => {
      const credentials = {
        email: 'invalid-email',
        password: 'password123',
      };

      const result = await signInWithEmail(credentials);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle special characters in password', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'P@ssw0rd\!#$%',
      };

      const result = await signInWithEmail(credentials);
      expect(console.log).toHaveBeenCalled();
    });
  });

  describe('signUpWithEmail', () => {
    it('should accept valid sign up data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'SecurePassword123',
        fullName: 'John Doe',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalledWith('Sing up with email');
    });

    it('should handle sign up with minimum required fields', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password',
        fullName: 'A',
        country: 'US',
        investmentGoals: 'Income',
        riskTolerance: 'Low',
        preferredIndustry: 'Finance',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle sign up with all fields populated', async () => {
      const userData = {
        email: 'detailed.user@example.com',
        password: 'VerySecureP@ssw0rd\!',
        fullName: 'Jane Marie Doe-Smith',
        country: 'GB',
        investmentGoals: 'Balanced',
        riskTolerance: 'High',
        preferredIndustry: 'Healthcare',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle sign up with empty fullName', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        fullName: '',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle sign up with different country codes', async () => {
      const countries = ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'IN'];

      for (const country of countries) {
        const userData = {
          email: `user-${country}@example.com`,
          password: 'password123',
          fullName: 'Test User',
          country,
          investmentGoals: 'Growth',
          riskTolerance: 'Medium',
          preferredIndustry: 'Technology',
        };

        await signUpWithEmail(userData);
      }

      expect(console.log).toHaveBeenCalledTimes(countries.length);
    });

    it('should handle all investment goal options', async () => {
      const goals = ['Growth', 'Income', 'Balanced', 'Conservative'];

      for (const goal of goals) {
        const userData = {
          email: `user-${goal}@example.com`,
          password: 'password123',
          fullName: 'Test User',
          country: 'US',
          investmentGoals: goal,
          riskTolerance: 'Medium',
          preferredIndustry: 'Technology',
        };

        await signUpWithEmail(userData);
      }

      expect(console.log).toHaveBeenCalledTimes(goals.length);
    });

    it('should handle all risk tolerance levels', async () => {
      const riskLevels = ['Low', 'Medium', 'High'];

      for (const risk of riskLevels) {
        const userData = {
          email: `user-${risk}@example.com`,
          password: 'password123',
          fullName: 'Test User',
          country: 'US',
          investmentGoals: 'Growth',
          riskTolerance: risk,
          preferredIndustry: 'Technology',
        };

        await signUpWithEmail(userData);
      }

      expect(console.log).toHaveBeenCalledTimes(riskLevels.length);
    });

    it('should handle all preferred industries', async () => {
      const industries = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer Goods'];

      for (const industry of industries) {
        const userData = {
          email: `user-${industry}@example.com`,
          password: 'password123',
          fullName: 'Test User',
          country: 'US',
          investmentGoals: 'Growth',
          riskTolerance: 'Medium',
          preferredIndustry: industry,
        };

        await signUpWithEmail(userData);
      }

      expect(console.log).toHaveBeenCalledTimes(industries.length);
    });

    it('should handle special characters in full name', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        fullName: "John O'Brien-Smith Jr.",
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalled();
    });

    it('should handle unicode characters in full name', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'José María García',
        country: 'ES',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology',
      };

      const result = await signUpWithEmail(userData);
      expect(console.log).toHaveBeenCalled();
    });
  });
});