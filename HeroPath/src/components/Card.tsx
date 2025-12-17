import React from 'react';
import { cn } from '../utils/cn';

/**
 * Card Component Props
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Card header actions */
  headerActions?: React.ReactNode;
  /** Hover effect */
  hover?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card Component
 * 
 * A flexible card component for displaying content in a contained format.
 * Supports title, subtitle, footer, and hover effects.
 */
const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  headerActions,
  hover = false,
  padding = 'md',
  className,
}) => {
  const baseCardClasses = 'gaming-card rounded-2xl overflow-hidden';
  const hoverClasses = hover ? 'transition-all duration-300' : '';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div className={cn(baseCardClasses, hoverClasses, className)}>
      {(title || subtitle || headerActions) && (
        <div className={cn(paddingClasses[padding], 'pb-3 border-b border-purple-500/20')}>
          <div className="flex items-start justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-white gradient-text">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-gray-400">{subtitle}</p>
              )}
            </div>
            {headerActions && (
              <div className="ml-4">{headerActions}</div>
            )}
          </div>
        </div>
      )}
      <div className={paddingClasses[padding]}>
        {children}
      </div>
      {footer && (
        <div className={cn(paddingClasses[padding], 'pt-3 border-t border-purple-500/20')}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
