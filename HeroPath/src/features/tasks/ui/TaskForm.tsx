import { useMemo, useState } from 'react';
import { Button, Card, Input, Textarea } from '../../../components';
import { useTaskStore } from '../model/store';
import { cn } from '../../../utils/cn';

export function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const lastError = useTaskStore((s) => s.lastError);
  const clearError = useTaskStore((s) => s.clearError);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [category, setCategory] = useState('');

  const canSubmit = useMemo(() => title.trim().length >= 3, [title]);

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
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          addTask({ title, description, difficulty, category: category.trim() || undefined });
          // If validation failed, store will set lastError and we keep inputs.
          // If it succeeded, we clear local fields.
          const ok = title.trim().length >= 3;
          if (ok) {
            setTitle('');
            setDescription('');
            setDifficulty('medium');
            setCategory('');
          }
        }}
      >
        <Input
          label="Title"
          placeholder="e.g. Finish onboarding flow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => lastError && clearError()}
          fullWidth
          minLength={3}
          required
        />
        <Textarea
          label="Description (optional)"
          placeholder="What does success look like?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => lastError && clearError()}
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
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className={cn(
                'block w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200',
                'bg-gray-800/50 text-white',
                'border-gray-600/50 focus:border-hero-primary focus:ring-hero-primary focus:shadow-glow-primary/50',
              )}
            >
              <option value="easy">Easy (10 XP)</option>
              <option value="medium">Medium (25 XP)</option>
              <option value="hard">Hard (50 XP)</option>
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onFocus={() => lastError && clearError()}
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

