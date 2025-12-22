import { Button, Card, Input, Textarea } from '../../../components';
import { cn } from '../../../utils/cn';
import { getAllDifficulties, getDifficultyLabel, type TaskDifficulty } from '../model/constants';
import { useTaskForm } from '../hooks/useTaskForm';

/**
 * Task Form Component
 * 
 * UI-only component for task creation form.
 * All form logic is handled by the useTaskForm hook.
 */
export function TaskForm() {
  const {
    formState,
    setTitle,
    setDescription,
    setDifficulty,
    setCategory,
    canSubmit,
    lastError,
    clearError,
    handleFieldFocus,
    handleSubmit,
  } = useTaskForm();

  return (
    <Card
      title="New Task"
      subtitle="Add a task to your quest log"
      headerActions={
        lastError ? (
          <button
            className="text-xs font-semibold text-hero-danger hover:text-white transition-colors"
            onClick={clearError}
            type="button"
          >
            Dismiss
          </button>
        ) : null
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Title"
          placeholder="e.g. Finish onboarding flow"
          value={formState.title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFieldFocus}
          fullWidth
          minLength={3}
          required
        />
        <Textarea
          label="Description (optional)"
          placeholder="What does success look like?"
          value={formState.description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={handleFieldFocus}
          fullWidth
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Difficulty Selection */}
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-semibold text-gray-300 mb-1"
            >
              Difficulty
            </label>
            <select
              id="difficulty"
              value={formState.difficulty}
              onChange={(e) => setDifficulty(e.target.value as TaskDifficulty)}
              className={cn(
                'block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                'bg-gray-800/50 text-white',
                'border-gray-600/50 focus:border-hero-primary focus:ring-hero-primary focus:shadow-glow-primary/50',
              )}
            >
              {getAllDifficulties().map((diff) => (
                <option key={diff} value={diff}>
                  {getDifficultyLabel(diff)}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-400">
              XP value is calculated automatically based on difficulty
            </p>
          </div>

          {/* Category Selection */}
          <div>
            <Input
              label="Category (optional)"
              placeholder="e.g. Work, Personal, Health"
              value={formState.category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={handleFieldFocus}
              fullWidth
              maxLength={50}
            />
          </div>
        </div>

        {lastError && (
          <div className="rounded-xl border border-hero-danger/30 bg-hero-danger/10 px-3 py-2 text-sm text-hero-danger">
            {lastError}
          </div>
        )}

        <div className="flex justify-end">
          <Button variant="primary" type="submit" disabled={!canSubmit}>
            Add task
          </Button>
        </div>
      </form>
    </Card>
  );
}

