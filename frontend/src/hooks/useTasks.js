import { useCallback, useEffect, useState } from 'react';
import {
  deleteTask as deleteTaskRequest,
  getTasks as getTasksRequest,
  updateTask as updateTaskRequest,
} from '../services/taskService.js';

function getErrorMessage(error, fallbackMessage) {
  return error?.response?.data?.error || fallbackMessage;
}

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = await getTasksRequest();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
      setErrorMessage(getErrorMessage(error, 'Unable to load tasks.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const updateTask = async (id, taskData) => {
    setIsSaving(true);
    setErrorMessage('');

    try {
      await updateTaskRequest(id, taskData);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
      setErrorMessage(getErrorMessage(error, 'Failed to update task.'));
      await fetchTasks();
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTask = async (id) => {
    setErrorMessage('');

    try {
      await deleteTaskRequest(id);
      await fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
      setErrorMessage(getErrorMessage(error, 'Failed to delete task.'));
      await fetchTasks();
      throw error;
    }
  };

  return {
    tasks,
    isLoading,
    errorMessage,
    isSaving,
    fetchTasks,
    updateTask,
    deleteTask,
    clearError: () => setErrorMessage(''),
  };
}
