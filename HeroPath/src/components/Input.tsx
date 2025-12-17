import React from 'react';

/**
 * Input Component Props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Full width input */
  fullWidth?: boolean;
}

/**
 * Input Component
 * 
 * A styled input component with label, error handling, and icon support.
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseInputClasses = 'block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 bg-gray-800/50 text-white placeholder-gray-400';
  const normalInputClasses = 'border-gray-600/50 focus:border-hero-primary focus:ring-hero-primary focus:shadow-glow-primary/50';
  const errorInputClasses = 'border-hero-danger focus:border-hero-danger focus:ring-hero-danger focus:shadow-glow-danger/50';
  const inputClasses = `${baseInputClasses} ${error ? errorInputClasses : normalInputClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${className}`.trim();
  
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <div className={widthClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={inputClasses}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-hero-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
