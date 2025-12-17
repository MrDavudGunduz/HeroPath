import { Card, Button, Badge } from '../../../components';
import { useTaskStore } from '../model/store';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const tasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const removeTask = useTaskStore((s) => s.removeTask);
  const clearCompleted = useTaskStore((s) => s.clearCompleted);

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <Card
      title="Quest Log"
      subtitle="Your active missions and victories"
      headerActions={
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            Active: {activeCount}
          </Badge>
          <Badge variant="success" size="sm">
            Completed: {completedCount}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Clear completed
          </Button>
        </div>
      }
    >
      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-purple-500/20 bg-black/10 px-4 py-6 text-center text-gray-300">
          No tasks yet. Add your first task above.
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={toggleTask} onRemove={removeTask} />
          ))}
        </ul>
      )}
    </Card>
  );
}

