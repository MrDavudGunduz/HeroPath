import React, { useEffect, useId, useRef } from 'react';
import { cn } from '../utils/cn';

/**
 * Modal Component Props
 */
export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Modal footer content */
  footer?: React.ReactNode;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Close modal on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close modal on Escape key */
  closeOnEscape?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Modal/Dialog Component
 *
 * A modal component for displaying content in an overlay.
 * Supports different sizes, keyboard navigation, and overlay interactions.
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
}) => {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Handle Escape key press
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management: capture previous focus and move focus into the dialog.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    // Wait for paint so refs are ready.
    requestAnimationFrame(() => {
      const root = panelRef.current;
      if (!root) return;

      const focusable = root.querySelector<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      (focusable ?? root).focus();
    });

    return () => {
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const root = panelRef.current;
    if (!root) return;

    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);

    if (focusables.length === 0) {
      e.preventDefault();
      root.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (!active || active === first) {
        e.preventDefault();
        last.focus();
      }
      return;
    }

    if (active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className={cn('gaming-card w-full', sizeClasses[size], className)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descriptionId}
        tabIndex={-1}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
            <h2 id={titleId} className="text-xl font-semibold gradient-text">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors hover:scale-110"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div id={descriptionId} className="px-6 py-4 text-gray-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-purple-500/20">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
