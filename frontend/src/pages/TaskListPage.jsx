import Layout from '../components/Layout.jsx';
import TaskList from '../components/TaskList.jsx';

const demoTasks = [
  {
    id: 1,
    title: 'Create Flask API endpoints',
    description: 'Prepare the CRUD endpoints for the backend task resource.',
    status: 'in_progress',
  },
  {
    id: 2,
    title: 'Design responsive task cards',
    description: 'Make sure each task is readable on small screens and desktop layouts.',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Add title validation',
    description: 'Show a clear validation message when a task title is missing.',
    status: 'pending',
  },
];

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

function EmptyState() {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <h2 className="text-base font-semibold text-slate-950">No tasks yet</h2>
      <p className="mt-2 text-sm text-slate-600">Create your first task to start tracking work.</p>
    </section>
  );
}

function ErrorState() {
  return (
    <section className="rounded-lg border border-rose-200 bg-rose-50 p-4">
      <h2 className="text-sm font-semibold text-rose-800">Unable to load tasks</h2>
      <p className="mt-1 text-sm text-rose-700">Check the API connection and try again.</p>
    </section>
  );
}

function TaskListPage() {
  const isLoading = false;
  const error = false;
  const tasks = demoTasks;

  return (
    <Layout>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Task List</h1>
        </div>
        <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          {tasks.length} total tasks
        </div>
      </div>

      {isLoading && <LoadingState />}
      {!isLoading && error && <ErrorState />}
      {!isLoading && !error && tasks.length === 0 && <EmptyState />}
      {!isLoading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}
    </Layout>
  );
}

export default TaskListPage;
