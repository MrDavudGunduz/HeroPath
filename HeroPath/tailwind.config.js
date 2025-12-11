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
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Extend the default Tailwind theme with custom values
    extend: {
      // Custom color palette for HeroPath gamification theme
      colors: {
        'hero-primary': '#6366f1',    // Indigo - Primary brand color
        'hero-success': '#10b981',    // Emerald - Success states, completed tasks
        'hero-warning': '#f59e0b',    // Amber - Warning states, pending items
        'hero-danger': '#ef4444',     // Red - Error states, deleted items
        'hero-xp': '#8b5cf6',         // Purple - Experience points (XP) display
        'hero-level': '#f97316',      // Orange - Level badges and progression
        'hero-narrative': '#ec4899',  // Pink - Story elements and narrative features
      }
    },
  },
  // Tailwind plugins (currently none, but can add plugins like forms, typography, etc.)
  plugins: [],
}
