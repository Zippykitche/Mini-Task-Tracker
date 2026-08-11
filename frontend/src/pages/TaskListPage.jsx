import { useMemo, useState } from 'react';
import Layout from '../components/Layout.jsx';
import TaskList from '../components/TaskList.jsx';
import TaskEditModal from '../components/TaskEditModal.jsx';
import useTasks from '../hooks/useTasks.js';
import { STATUS_OPTIONS, normalizeStatus } from '../utils/statusOptions.js';

function LoadingState() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ filterStatus, searchQuery }) {
  let title = 'No tasks yet';
  let message = 'Create your first task to start tracking work.';

  if (searchQuery) {
    title = 'No matching tasks found';
    message = `No tasks match your search "${searchQuery}".`;
  } else if (filterStatus !== 'all') {
    const label = STATUS_OPTIONS.find((s) => s.id === filterStatus)?.label || filterStatus;
    title = `No "${label}" tasks`;
    message = `There are currently no tasks with "${label}" status.`;
  }

  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </section>
  );
}

function ErrorState({ message = 'Check your network connection and try again.', onRetry }) {
  return (
    <section className="rounded-lg border border-rose-200 bg-rose-50 p-4 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-rose-800">Unable to load tasks</h2>
        <p className="mt-1 text-sm text-rose-700">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="rounded bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition"
      >
        Retry
      </button>
    </section>
  );
}

function TaskListPage() {
  const {
    tasks,
    isLoading,
    errorMessage,
    isSaving,
    fetchTasks,
    updateTask,
    deleteTask,
    clearError,
  } = useTasks();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const safeTasks = useMemo(() => (Array.isArray(tasks) ? tasks : []), [tasks]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
    } catch {
      // The hook stores the error message and refreshes the list.
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await updateTask(id, updatedData);
      setEditingTask(null);
    } catch {
      // Keep the modal open so the user can retry.
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(id);
    } catch {
      // The hook stores the error message and refreshes the list.
    }
  };

  const filteredTasks = useMemo(() => {
    return safeTasks.filter((task) => {
      const matchesStatus =
        filterStatus === 'all' || normalizeStatus(task.status) === filterStatus;
      const matchesSearch =
        !searchQuery.trim() ||
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [safeTasks, filterStatus, searchQuery]);

  // Count metrics
  const statusCounts = useMemo(() => {
    const counts = { all: safeTasks.length, todo: 0, in_progress: 0, done: 0 };
    safeTasks.forEach((t) => {
      const norm = normalizeStatus(t.status);
      if (counts[norm] !== undefined) counts[norm]++;
    });
    return counts;
  }, [safeTasks]);

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Task List</h1>
        </div>
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 font-medium shadow-sm">
          {safeTasks.length} total {safeTasks.length === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm">
          <button
            onClick={() => setFilterStatus('all')}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All ({statusCounts.all})
          </button>
          {STATUS_OPTIONS.map((opt) => {
            const isActive = filterStatus === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setFilterStatus(opt.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {opt.label} ({statusCounts[opt.id] || 0})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 pl-9 text-xs outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
          />
          <svg
            className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {!isLoading && errorMessage && (
        <div className="mb-6">
          <ErrorState
            message={errorMessage}
            onRetry={() => {
              clearError();
              fetchTasks();
            }}
          />
        </div>
      )}

      {isLoading && <LoadingState />}
      {!isLoading && !errorMessage && filteredTasks.length === 0 && (
        <EmptyState filterStatus={filterStatus} searchQuery={searchQuery} />
      )}
      {!isLoading && filteredTasks.length > 0 && (
        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDeleteTask}
        />
      )}

      {/* Edit Task Modal */}
      <TaskEditModal
        task={editingTask}
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onSave={handleUpdateTask}
        isSaving={isSaving}
      />
    </Layout>
  );
}

export default TaskListPage;
