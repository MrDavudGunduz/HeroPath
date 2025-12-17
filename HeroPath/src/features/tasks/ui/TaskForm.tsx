import { useMemo, useState } from 'react';
import { Button, Card, Input, Textarea } from '../../../components';
import { useTaskStore } from '../model/store';

export function TaskForm() {
  const addTask = useTaskStore((s) => s.addTask);
  const lastError = useTaskStore((s) => s.lastError);
  const clearError = useTaskStore((s) => s.clearError);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

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
          addTask({ title, description });
          // If validation failed, store will set lastError and we keep inputs.
          // If it succeeded, we clear local fields.
          const ok = title.trim().length > 0;
          if (ok) {
            setTitle('');
            setDescription('');
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
        />
        <Textarea
          label="Description (optional)"
          placeholder="What does success look like?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => lastError && clearError()}
          fullWidth
        />

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

