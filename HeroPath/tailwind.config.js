/**
 * Tailwind CSS Configuration
 *
 * This file configures Tailwind CSS for the HeroPath application.
 * Tailwind scans the specified files for class names and generates only the CSS that's actually used.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  // Files that Tailwind should scan for class names
  // This ensures unused styles are purged from the final CSS bundle
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Extend the default Tailwind theme with custom values
    extend: {
      // Custom color palette for HeroPath gamification theme
      colors: {
        'hero-primary': '#6366f1', // Indigo - Primary brand color
        'hero-success': '#10b981', // Emerald - Success states, completed tasks
        'hero-warning': '#f59e0b', // Amber - Warning states, pending items
        'hero-danger': '#ef4444', // Red - Error states, deleted items
        'hero-xp': '#8b5cf6', // Purple - Experience points (XP) display
        'hero-level': '#f97316', // Orange - Level badges and progression
        'hero-narrative': '#ec4899', // Pink - Story elements and narrative features
      },
      // Gaming-themed gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-xp': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'gradient-level': 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'gradient-hero':
          'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-dark':
          'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
      },
      // Typography system
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      // Spacing system (extends default Tailwind spacing)
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      // Border radius system
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      // Box shadow system with glow effects
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
        large: '0 8px 24px rgba(0, 0, 0, 0.16)',
        'glow-primary':
          '0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)',
        'glow-xp':
          '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-level':
          '0 0 20px rgba(249, 115, 22, 0.5), 0 0 40px rgba(249, 115, 22, 0.3)',
        'glow-success':
          '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)',
        'glow-card':
          '0 8px 32px rgba(99, 102, 241, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glow-button':
          '0 4px 16px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      // Animation system
      animation: {
        glow: 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 3s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '100%': {
            boxShadow:
              '0 0 30px rgba(99, 102, 241, 0.8), 0 0 50px rgba(99, 102, 241, 0.4)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  // Tailwind plugins (currently none, but can add plugins like forms, typography, etc.)
  plugins: [],
};
