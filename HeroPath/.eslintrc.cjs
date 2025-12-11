/**
 * ESLint Configuration
 * 
 * ESLint is a tool for identifying and reporting on patterns found in JavaScript/TypeScript code.
 * This configuration enforces code quality and consistency across the project.
 * 
 * @see https://eslint.org/docs/latest/use/configure/
 */
module.exports = {
  // Stop looking for ESLint config files in parent directories
  root: true,
  // Environment settings - defines global variables that are predefined
  env: { browser: true, es2020: true },
  // Extend from recommended rule sets
  extends: [
    'eslint:recommended',                    // ESLint recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:react-hooks/recommended',        // React Hooks rules
    'prettier',                               // Disables ESLint rules that conflict with Prettier
  ],
  // Files and directories to ignore
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  // TypeScript parser for ESLint
  parser: '@typescript-eslint/parser',
  // ESLint plugins
  plugins: ['react-refresh'],
  // Custom rules configuration
  rules: {
    // Warn if non-component exports are used in files that export components
    // Allows constant exports (useful for configuration files)
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
