import React from 'react';
import { cn } from '../utils/cn';

/**
 * ProgressBar Component Props
 */
export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Progress bar variant */
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'xp' | 'level';
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Size of the progress bar */
  size?: 'sm' | 'md' | 'lg';
  /** Animated progress bar */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProgressBar Component
 *
 * A progress bar component for displaying completion status, XP progress, etc.
 * Supports multiple variants, sizes, and animations.
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'primary',
  showLabel = false,
  label,
  size = 'md',
  animated = true,
  className,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const baseBarClasses =
    'w-full bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/50';

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  const variantGradients = {
    primary:
      'bg-gradient-to-r from-hero-primary via-indigo-500 to-hero-primary',
    success:
      'bg-gradient-to-r from-hero-success via-emerald-400 to-hero-success',
    warning: 'bg-gradient-to-r from-hero-warning via-amber-400 to-hero-warning',
    danger: 'bg-gradient-to-r from-hero-danger via-red-500 to-hero-danger',
    xp: 'bg-gradient-to-r from-hero-xp via-purple-500 to-pink-500',
    level: 'bg-gradient-to-r from-hero-level via-orange-500 to-amber-500',
  };

  const animationClasses = animated
    ? 'transition-all duration-700 ease-out relative'
    : '';
  const glowClasses = {
    primary: 'shadow-glow-primary',
    success: 'shadow-glow-success',
    warning: 'shadow-lg shadow-hero-warning/50',
    danger: 'shadow-glow-danger',
    xp: 'shadow-glow-xp',
    level: 'shadow-glow-level',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-200">
            {label || `${Math.round(percentage)}%`}
          </span>
          {showLabel && label && (
            <span className="text-sm font-bold text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn(baseBarClasses, sizeClasses[size], className)}>
        <div
          className={cn(
            variantGradients[variant],
            animationClasses,
            glowClasses[variant],
            'h-full rounded-full relative overflow-hidden'
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
