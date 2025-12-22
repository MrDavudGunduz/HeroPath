import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from './TaskItem';
import type { Task } from '../model/task';

describe('TaskItem Component', () => {
  const mockTask: Task = {
    id: 'test-task-1',
    title: 'Test Task',
    description: 'This is a test task description',
    completed: false,
    createdAt: Date.now(),
    xpValue: 25,
    difficulty: 'medium',
  };

  const mockOnToggle = vi.fn();
  const mockOnRemove = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render task title', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('should render task description when provided', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      expect(screen.getByText('This is a test task description')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      const taskWithoutDescription: Task = {
        ...mockTask,
        description: undefined,
      };
      render(
        <TaskItem
          task={taskWithoutDescription}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      expect(screen.queryByText('This is a test task description')).not.toBeInTheDocument();
    });

    it('should render as list item', () => {
      const { container } = render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('Task Status', () => {
    it('should show "Active" badge for incomplete task', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should show "Completed" badge for completed task', () => {
      const completedTask: Task = {
        ...mockTask,
        completed: true,
        completedAt: Date.now(),
      };
      render(
        <TaskItem
          task={completedTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('should apply completed styling to completed task', () => {
      const completedTask: Task = {
        ...mockTask,
        completed: true,
        completedAt: Date.now(),
      };
      const { container } = render(
        <TaskItem
          task={completedTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      const listItem = container.querySelector('li');
      expect(listItem?.className).toContain('opacity-75');
    });

    it('should apply line-through styling to completed task title', () => {
      const completedTask: Task = {
        ...mockTask,
        completed: true,
        completedAt: Date.now(),
      };
      render(
        <TaskItem
          task={completedTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      const title = screen.getByText('Test Task');
      expect(title.className).toContain('line-through');
    });

    it('should show checkmark in checkbox for completed task', () => {
      const completedTask: Task = {
        ...mockTask,
        completed: true,
        completedAt: Date.now(),
      };
      render(
        <TaskItem
          task={completedTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      const checkbox = screen.getByRole('button', { name: 'Mark as incomplete' });
      expect(checkbox).toHaveTextContent('✓');
    });

    it('should not show checkmark in checkbox for incomplete task', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      const checkbox = screen.getByRole('button', { name: 'Mark as complete' });
      expect(checkbox).not.toHaveTextContent('✓');
    });
  });

  describe('Interactions', () => {
    it('should call onToggle when checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );

      const checkbox = screen.getByRole('button', { name: 'Mark as complete' });
      await user.click(checkbox);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith('test-task-1');
    });

    it('should call onToggle when Toggle button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );

      const toggleButton = screen.getByRole('button', { name: 'Toggle' });
      await user.click(toggleButton);

      expect(mockOnToggle).toHaveBeenCalledTimes(1);
      expect(mockOnToggle).toHaveBeenCalledWith('test-task-1');
    });

    it('should call onRemove when Remove button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);

      expect(mockOnRemove).toHaveBeenCalledTimes(1);
      expect(mockOnRemove).toHaveBeenCalledWith('test-task-1');
    });

    it('should not call onToggle when Remove button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      await user.click(removeButton);

      expect(mockOnToggle).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for incomplete task checkbox', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      const checkbox = screen.getByRole('button', { name: 'Mark as complete' });
      expect(checkbox).toBeInTheDocument();
    });

    it('should have proper aria-label for completed task checkbox', () => {
      const completedTask: Task = {
        ...mockTask,
        completed: true,
        completedAt: Date.now(),
      };
      render(
        <TaskItem
          task={completedTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      const checkbox = screen.getByRole('button', { name: 'Mark as incomplete' });
      expect(checkbox).toBeInTheDocument();
    });

    it('should have accessible button labels', () => {
      render(
        <TaskItem task={mockTask} onToggle={mockOnToggle} onRemove={mockOnRemove} />,
      );
      expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle task with very long title', () => {
      const longTitleTask: Task = {
        ...mockTask,
        title: 'A'.repeat(200),
      };
      render(
        <TaskItem
          task={longTitleTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      expect(screen.getByText('A'.repeat(200))).toBeInTheDocument();
    });

    it('should handle task with very long description', () => {
      const longDescriptionTask: Task = {
        ...mockTask,
        description: 'B'.repeat(1000),
      };
      render(
        <TaskItem
          task={longDescriptionTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      expect(screen.getByText('B'.repeat(1000))).toBeInTheDocument();
    });

    it('should handle task with special characters in title', () => {
      const specialCharTask: Task = {
        ...mockTask,
        title: 'Task with <special> & "characters"',
      };
      render(
        <TaskItem
          task={specialCharTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      expect(screen.getByText('Task with <special> & "characters"')).toBeInTheDocument();
    });

    it('should handle task with multiline description', () => {
      const multilineTask: Task = {
        ...mockTask,
        description: 'Line 1\nLine 2\nLine 3',
      };
      render(
        <TaskItem
          task={multilineTask}
          onToggle={mockOnToggle}
          onRemove={mockOnRemove}
        />,
      );
      // Use a more flexible matcher for multiline text
      const description = screen.getByText((content, element) => {
        return element?.textContent === 'Line 1\nLine 2\nLine 3';
      });
      expect(description).toBeInTheDocument();
      expect(description.className).toContain('whitespace-pre-wrap');
    });
  });
});
