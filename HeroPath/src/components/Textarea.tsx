import React from 'react';

/**
 * Textarea Component Props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Full width textarea */
  fullWidth?: boolean;
}

/**
 * Textarea Component
 * 
 * A styled textarea component with label and error handling.
 */
const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseTextareaClasses = 'block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200 resize-y bg-gray-800/50 text-white placeholder-gray-400';
  const normalTextareaClasses = 'border-gray-600/50 focus:border-hero-primary focus:ring-hero-primary focus:shadow-glow-primary/50';
  const errorTextareaClasses = 'border-hero-danger focus:border-hero-danger focus:ring-hero-danger focus:shadow-glow-danger/50';
  const textareaClasses = `${baseTextareaClasses} ${error ? errorTextareaClasses : normalTextareaClasses} ${className}`.trim();
  
  const widthClasses = fullWidth ? 'w-full' : '';

  return (
    <div className={widthClasses}>
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-semibold text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-hero-danger">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default Textarea;
