/**
 * PostCSS Configuration
 * 
 * This file exports a configuration object that tells PostCSS which plugins to use.
 * PostCSS processes CSS files and applies transformations defined by these plugins.
 */
export default {
  plugins: {
    // Tailwind CSS plugin - processes Tailwind directives (@tailwind, @apply, etc.)
    // Uses default configuration from tailwind.config.js
    tailwindcss: {},
    // Autoprefixer plugin - automatically adds vendor prefixes to CSS properties
    // Ensures cross-browser compatibility (e.g., -webkit-, -moz-, -ms-)
    autoprefixer: {},
  },
}