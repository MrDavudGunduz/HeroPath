import type { Task } from '../model/task';
import { Badge, Button } from '../../../components';
import { cn } from '../../../utils/cn';

export function TaskItem(props: {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const { task, onToggle, onRemove } = props;

  return (
    <li
      className={cn(
        'rounded-2xl border border-purple-500/20 bg-black/10 backdrop-blur-sm px-4 py-3',
        task.completed && 'opacity-75'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              className={cn(
                'mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border transition-colors',
                task.completed
                  ? 'border-hero-success/50 bg-hero-success/20 text-hero-success'
                  : 'border-gray-500/50 bg-gray-800/30 text-gray-300 hover:border-hero-primary/60'
              )}
              aria-label={
                task.completed ? 'Mark as incomplete' : 'Mark as complete'
              }
            >
              {task.completed ? '✓' : ''}
            </button>

            <h4
              className={cn(
                'font-semibold text-white',
                task.completed && 'line-through'
              )}
            >
              {task.title}
            </h4>
            <Badge variant={task.completed ? 'success' : 'primary'} size="sm">
              {task.completed ? 'Completed' : 'Active'}
            </Badge>
          </div>

          {task.description && (
            <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onToggle(task.id)}>
            Toggle
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRemove(task.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
