/**
 * Custom Hook for Task Form Management
 * 
 * Separates form logic from UI, making the component more maintainable.
 * Handles form state, validation, submission, and error management.
 */

import { useMemo, useState, useCallback } from 'react';
import { useTaskStore } from '../model/store';
import { DEFAULT_DIFFICULTY, type TaskDifficulty } from '../model/constants';

export interface TaskFormState {
  title: string;
  description: string;
  difficulty: TaskDifficulty;
  category: string;
}

export interface UseTaskFormReturn {
  // Form state
  formState: TaskFormState;
  
  // Setters
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setDifficulty: (value: TaskDifficulty) => void;
  setCategory: (value: string) => void;
  
  // Validation
  canSubmit: boolean;
  isTitleValid: boolean;
  
  // Error handling
  lastError: string | undefined;
  clearError: () => void;
  handleFieldFocus: () => void;
  
  // Form actions
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
}

const MIN_TITLE_LENGTH = 3;

/**
 * Custom hook for managing task form state and logic
 */
export function useTaskForm(): UseTaskFormReturn {
  const addTask = useTaskStore((s) => s.addTask);
  const lastError = useTaskStore((s) => s.lastError);
  const clearError = useTaskStore((s) => s.clearError);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>(DEFAULT_DIFFICULTY);
  const [category, setCategory] = useState('');

  // Validation
  const isTitleValid = useMemo(() => {
    return title.trim().length >= MIN_TITLE_LENGTH;
  }, [title]);

  const canSubmit = useMemo(() => {
    return isTitleValid;
  }, [isTitleValid]);

  // Error handling
  const handleFieldFocus = useCallback(() => {
    if (lastError) {
      clearError();
    }
  }, [lastError, clearError]);

  // Form reset
  const resetForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setDifficulty(DEFAULT_DIFFICULTY);
    setCategory('');
  }, []);

  // Form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Submit task
      addTask({
        title,
        description,
        difficulty,
        category: category.trim() || undefined,
      });

      // If validation passed (store will validate), reset form
      // If validation failed, store will set lastError and we keep inputs
      if (isTitleValid) {
        resetForm();
      }
    },
    [title, description, difficulty, category, addTask, isTitleValid, resetForm],
  );

  return {
    formState: {
      title,
      description,
      difficulty,
      category,
    },
    setTitle,
    setDescription,
    setDifficulty,
    setCategory,
    canSubmit,
    isTitleValid,
    lastError,
    clearError,
    handleFieldFocus,
    handleSubmit,
    resetForm,
  };
}

