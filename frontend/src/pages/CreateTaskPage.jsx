import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import TaskForm from '../components/TaskForm.jsx';
import { createTask } from '../services/taskService.js';

function CreateTaskPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await createTask(taskData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create task:', error);
      setErrorMessage(error?.response?.data?.error || 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Create Task</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Fill in the details below to add a new task to your task tracker.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 p-4">
            <h2 className="text-sm font-semibold text-rose-800">Unable to create task</h2>
            <p className="mt-1 text-sm text-rose-700">{errorMessage}</p>
          </div>
        )}

        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => navigate('/')}
          isSubmitting={isSubmitting}
          submitButtonLabel="Create Task"
        />
      </div>
    </Layout>
  );
}

export default CreateTaskPage;
