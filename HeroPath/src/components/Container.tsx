import React from 'react';
import { cn } from '../utils/cn';

/**
 * Container Component Props
 */
export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Maximum width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Container Component
 *
 * A layout component that provides consistent max-width and padding.
 * Used for centering content and maintaining readable line lengths.
 */
const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className,
}) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    md: 'px-4 md:px-6',
    lg: 'px-6 md:px-8',
  };

  return (
    <div
      className={cn(
        'mx-auto',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
