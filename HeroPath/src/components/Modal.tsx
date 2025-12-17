import React, { useEffect } from 'react';

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
  className = '',
}) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      <div
        className={`gaming-card ${sizeClasses[size]} w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
            <h2 className="text-xl font-semibold gradient-text">{title}</h2>
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
        <div className="px-6 py-4 text-gray-300">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-purple-500/20">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
