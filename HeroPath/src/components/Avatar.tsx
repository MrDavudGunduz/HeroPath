import React from 'react';
import { cn } from '../utils/cn';

/**
 * Avatar Component Props
 */
export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display when no image */
  initials?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Character level (for hero progression) */
  level?: number;
  /** Show level badge */
  showLevel?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Avatar/Character Component
 * 
 * An avatar component for displaying user characters or profile images.
 * Supports hero progression with level badges.
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  level,
  showLevel = false,
  className,
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-full bg-hero-primary text-white font-semibold overflow-hidden border-2 border-white shadow-md';

  // Generate initials from alt text if not provided
  const displayInitials = initials || (alt ? alt.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?');

  return (
    <div className="relative inline-block">
      <div className={cn(baseClasses, sizeClasses[size], className)}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{displayInitials}</span>
        )}
      </div>
      {showLevel && level !== undefined && (
        <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 bg-hero-level text-white text-xs font-bold rounded-full border-2 border-white shadow-md">
          {level}
        </div>
      )}
    </div>
  );
};

export default Avatar;
