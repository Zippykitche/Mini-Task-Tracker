import { useState } from 'react';
import { useNavigate } from 'react';
import Layout from '../components/Layout.jsx';
import TaskForm from '../components/TaskForm.jsx';
import { createTask } from '../services/taskService.js';

function CreateTaskPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateTask = async (taskData) => {
    setIsSubmitting(true);
    try {
      await createTask(taskData);
      navigate('/');
    } catch (err) {
      console.error('Failed to create task:', err);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500 font-sans">New task</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Create Task</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Fill in the details below to add a new task to your task tracker.
          </p>
        </div>

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
