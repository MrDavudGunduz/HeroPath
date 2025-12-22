import type { FC, ReactNode } from 'react';
import Avatar from './Avatar';
import { cn } from '../utils/cn';

/**
 * Header/Navbar Component Props
 */
export interface HeaderProps {
  /** User level */
  userLevel?: number;
  /** User avatar source */
  userAvatar?: string;
  /** User name/initials */
  userName?: string;
  /** Navigation items */
  navItems?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    active?: boolean;
  }>;
  /** Header actions (buttons, etc.) */
  actions?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Header/Navbar Component
 *
 * Application header with navigation, user info, and actions.
 * Displays hero character avatar and level for gamification.
 */
const Header: FC<HeaderProps> = ({
  userLevel,
  userAvatar,
  userName,
  navItems,
  actions,
  className,
}) => {
  return (
    <header
      className={cn(
        'bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-500/30 backdrop-blur-lg',
        className
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-glow">
              🚀 <span className="gradient-text">HeroPath</span>
            </h1>
            {navItems && navItems.length > 0 && (
              <nav className="hidden md:flex items-center space-x-6 ml-8">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={item.onClick}
                    className={`text-sm font-semibold transition-all duration-200 ${
                      item.active
                        ? 'text-white underline decoration-2 underline-offset-4'
                        : 'text-white/80 hover:text-white hover:scale-105'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-4">
            {actions && (
              <div className="flex items-center space-x-2">{actions}</div>
            )}
            {(userLevel !== undefined || userAvatar || userName) && (
              <div className="flex items-center space-x-3">
                {userLevel !== undefined && (
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-white/60 uppercase tracking-wider">
                      Level
                    </div>
                    <div className="text-2xl font-bold text-glow">
                      {userLevel}
                    </div>
                  </div>
                )}
                <Avatar
                  src={userAvatar}
                  alt={userName || 'User'}
                  initials={userName}
                  size="sm"
                  level={userLevel}
                  showLevel={userLevel !== undefined}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
