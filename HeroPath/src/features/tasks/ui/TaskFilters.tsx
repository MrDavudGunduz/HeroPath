import { useMemo } from 'react';
import { Badge, Button } from '../../../components';
import { useTaskStore } from '../model/store';
import { cn } from '../../../utils/cn';
import {
  getAllDifficulties,
  getDifficultyLabel,
  type TaskDifficulty,
} from '../model/constants';

export type FilterType = 'all' | 'active' | 'completed' | 'category' | 'difficulty';
export type DifficultyFilter = TaskDifficulty;

export interface TaskFiltersProps {
  filter: FilterType;
  categoryFilter?: string;
  difficultyFilter?: DifficultyFilter;
  onFilterChange: (filter: FilterType) => void;
  onCategoryChange?: (category: string) => void;
  onDifficultyChange?: (difficulty: DifficultyFilter) => void;
}

export function TaskFilters({
  filter,
  categoryFilter,
  difficultyFilter,
  onFilterChange,
  onCategoryChange,
  onDifficultyChange,
}: TaskFiltersProps) {
  const tasks = useTaskStore((s) => s.tasks);

  // Get unique categories from tasks
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    tasks.forEach((task) => {
      if (task.category) {
        categorySet.add(task.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [tasks]);

  // Get task counts
  const counts = useMemo(() => {
    const all = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;
    return { all, active, completed };
  }, [tasks]);

  return (
    <div className="space-y-4">
      {/* Main Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={filter === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          All <Badge variant="primary" size="sm" className="ml-2">{counts.all}</Badge>
        </Button>
        <Button
          variant={filter === 'active' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('active')}
        >
          Active <Badge variant="warning" size="sm" className="ml-2">{counts.active}</Badge>
        </Button>
        <Button
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('completed')}
        >
          Completed <Badge variant="success" size="sm" className="ml-2">{counts.completed}</Badge>
        </Button>
        {categories.length > 0 && (
          <Button
            variant={filter === 'category' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onFilterChange('category')}
          >
            By Category
          </Button>
        )}
        <Button
          variant={filter === 'difficulty' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => onFilterChange('difficulty')}
        >
          By Difficulty
        </Button>
      </div>

      {/* Category Filter Dropdown */}
      {filter === 'category' && categories.length > 0 && onCategoryChange && (
        <div className="rounded-xl border border-purple-500/20 bg-black/10 backdrop-blur-sm p-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange('')}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                !categoryFilter
                  ? 'bg-hero-primary text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50',
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  categoryFilter === cat
                    ? 'bg-hero-primary text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Difficulty Filter */}
      {filter === 'difficulty' && onDifficultyChange && (
        <div className="rounded-xl border border-purple-500/20 bg-black/10 backdrop-blur-sm p-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Filter by Difficulty
          </label>
          <div className="flex flex-wrap gap-2">
            {getAllDifficulties().map((difficulty) => {
              // Map difficulty to color variant for visual consistency
              const getColorClass = (diff: TaskDifficulty, isActive: boolean) => {
                if (!isActive) {
                  return 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50';
                }
                switch (diff) {
                  case 'easy':
                    return 'bg-hero-success text-white';
                  case 'medium':
                    return 'bg-hero-warning text-white';
                  case 'hard':
                    return 'bg-hero-danger text-white';
                  default:
                    return 'bg-gray-800/50 text-gray-300';
                }
              };

              return (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => onDifficultyChange(difficulty)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    getColorClass(difficulty, difficultyFilter === difficulty),
                  )}
                >
                  {getDifficultyLabel(difficulty)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

