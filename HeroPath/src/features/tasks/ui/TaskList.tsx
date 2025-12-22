import { useState, useMemo } from 'react';
import { Card, Button, Badge } from '../../../components';
import { useTaskStore } from '../model/store';
import { TaskItem } from './TaskItem';
import {
  TaskFilters,
  type FilterType,
  type DifficultyFilter,
} from './TaskFilters';

export function TaskList() {
  const allTasks = useTaskStore((s) => s.tasks);
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const removeTask = useTaskStore((s) => s.removeTask);
  const clearCompleted = useTaskStore((s) => s.clearCompleted);
  const getTasksByCategory = useTaskStore((s) => s.getTasksByCategory);
  const getTasksByDifficulty = useTaskStore((s) => s.getTasksByDifficulty);

  const [filter, setFilter] = useState<FilterType>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<
    DifficultyFilter | undefined
  >();

  // Filter tasks based on current filter state
  const tasks = useMemo(() => {
    let filtered = allTasks;

    switch (filter) {
      case 'active':
        filtered = filtered.filter((t) => !t.completed);
        break;
      case 'completed':
        filtered = filtered.filter((t) => t.completed);
        break;
      case 'category':
        if (categoryFilter) {
          filtered = getTasksByCategory(categoryFilter);
        }
        break;
      case 'difficulty':
        if (difficultyFilter) {
          filtered = getTasksByDifficulty(difficultyFilter);
        }
        break;
      case 'all':
      default:
        // No filtering needed
        break;
    }

    return filtered;
  }, [
    allTasks,
    filter,
    categoryFilter,
    difficultyFilter,
    getTasksByCategory,
    getTasksByDifficulty,
  ]);

  const completedCount = allTasks.filter((t) => t.completed).length;
  const activeCount = allTasks.length - completedCount;

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
      {/* Task Filters */}
      {allTasks.length > 0 && (
        <div className="mb-6">
          <TaskFilters
            filter={filter}
            categoryFilter={categoryFilter}
            difficultyFilter={difficultyFilter}
            onFilterChange={(newFilter) => {
              setFilter(newFilter);
              // Reset sub-filters when switching main filter
              if (newFilter !== 'category') setCategoryFilter('');
              if (newFilter !== 'difficulty') setDifficultyFilter(undefined);
            }}
            onCategoryChange={(category) => {
              setCategoryFilter(category);
              setFilter('category');
            }}
            onDifficultyChange={(difficulty) => {
              setDifficultyFilter(difficulty);
              setFilter('difficulty');
            }}
          />
        </div>
      )}

      {/* Task List */}
      {allTasks.length === 0 ? (
        <div className="rounded-2xl border border-purple-500/20 bg-black/10 px-4 py-6 text-center text-gray-300">
          No tasks yet. Add your first task above.
        </div>
      ) : tasks.length === 0 ? (
        <div className="rounded-2xl border border-purple-500/20 bg-black/10 px-4 py-6 text-center text-gray-300">
          No tasks match the current filter. Try a different filter.
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onToggle={toggleTask}
              onRemove={removeTask}
            />
          ))}
        </ul>
      )}
    </Card>
  );
}
