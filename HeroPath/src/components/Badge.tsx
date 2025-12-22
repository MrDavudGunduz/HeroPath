import React from 'react';
import { cn } from '../utils/cn';

/**
 * Badge Component Props
 */
export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Badge variant */
  variant?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'xp'
    | 'level'
    | 'narrative'
    | 'gray';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Badge Component
 *
 * A small badge component for displaying labels, status, or tags.
 * Supports multiple color variants and sizes.
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
}) => {
  const baseBadgeClasses =
    'inline-flex items-center font-semibold rounded-full px-3 py-1 backdrop-blur-sm border';

  const variantClasses = {
    primary:
      'bg-hero-primary/20 text-hero-primary border-hero-primary/30 shadow-glow-primary/50',
    success:
      'bg-hero-success/20 text-hero-success border-hero-success/30 shadow-glow-success/50',
    warning: 'bg-hero-warning/20 text-hero-warning border-hero-warning/30',
    danger:
      'bg-hero-danger/20 text-hero-danger border-hero-danger/30 shadow-glow-danger/50',
    xp: 'bg-hero-xp/20 text-hero-xp border-hero-xp/30 shadow-glow-xp/50',
    level:
      'bg-hero-level/20 text-hero-level border-hero-level/30 shadow-glow-level/50',
    narrative:
      'bg-hero-narrative/20 text-hero-narrative border-hero-narrative/30',
    gray: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        baseBadgeClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
