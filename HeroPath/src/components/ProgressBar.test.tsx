import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar Component', () => {
  describe('Rendering', () => {
    it('should render progress bar with correct value', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });

    it('should render with custom max value', () => {
      render(<ProgressBar value={25} max={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '25');
      expect(progressBar).toHaveAttribute('aria-valuemax', '50');
    });

    it('should render with correct width style (50%)', () => {
      render(<ProgressBar value={50} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('should render with correct width style (100%)', () => {
      render(<ProgressBar value={100} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '100%' });
    });

    it('should render with correct width style (0%)', () => {
      render(<ProgressBar value={0} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('should clamp value to 0-100 range', () => {
      const { rerender } = render(<ProgressBar value={150} />);
      let progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '100%' });

      rerender(<ProgressBar value={-10} />);
      progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });
  });

  describe('Variants', () => {
    it('should render with primary variant by default', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).toContain('from-hero-primary');
    });

    it('should render with success variant', () => {
      render(<ProgressBar value={50} variant="success" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).toContain('from-hero-success');
    });

    it('should render with xp variant', () => {
      render(<ProgressBar value={50} variant="xp" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).toContain('from-hero-xp');
    });

    it('should render with level variant', () => {
      render(<ProgressBar value={50} variant="level" />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).toContain('from-hero-level');
    });
  });

  describe('Sizes', () => {
    it('should render with small size', () => {
      const { container } = render(<ProgressBar value={50} size="sm" />);
      const wrapper = container.querySelector('.h-2');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with medium size by default', () => {
      const { container } = render(<ProgressBar value={50} />);
      const wrapper = container.querySelector('.h-3');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with large size', () => {
      const { container } = render(<ProgressBar value={50} size="lg" />);
      const wrapper = container.querySelector('.h-4');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Labels', () => {
    it('should not show label by default', () => {
      render(<ProgressBar value={50} />);
      expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    it('should show percentage label when showLabel is true', () => {
      render(<ProgressBar value={50} showLabel />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    it('should show custom label when provided', () => {
      render(<ProgressBar value={50} label="XP Progress" />);
      expect(screen.getByText('XP Progress')).toBeInTheDocument();
    });

    it('should show both custom label and percentage when showLabel and label are both true', () => {
      render(<ProgressBar value={75} showLabel label="Level Progress" />);
      expect(screen.getByText('Level Progress')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    it('should round percentage correctly', () => {
      render(<ProgressBar value={33.7} showLabel />);
      expect(screen.getByText('34%')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('should have animation classes by default', () => {
      render(<ProgressBar value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).toContain('transition-all');
    });

    it('should not have animation classes when animated is false', () => {
      render(<ProgressBar value={50} animated={false} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar.className).not.toContain('transition-all');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<ProgressBar value={50} max={200} />);

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('role', 'progressbar');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuemax', '200');
    });

    it('should calculate percentage correctly for accessibility', () => {
      render(<ProgressBar value={25} max={50} />);
      const progressBar = screen.getByRole('progressbar');
      // 25/50 = 50%
      expect(progressBar).toHaveStyle({ width: '50%' });
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero value', () => {
      render(<ProgressBar value={0} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '0%' });
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    });

    it('should handle maximum value', () => {
      render(<ProgressBar value={100} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '100%' });
      expect(progressBar).toHaveAttribute('aria-valuenow', '100');
    });

    it('should handle very small values', () => {
      render(<ProgressBar value={0.1} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveStyle({ width: '0.1%' });
    });

    it('should handle custom className', () => {
      const { container } = render(
        <ProgressBar value={50} className="custom-class" />
      );
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });
  });
});
