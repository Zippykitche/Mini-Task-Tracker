import Layout from '../components/Layout.jsx';
import TaskForm from '../components/TaskForm.jsx';

function CreateTaskPage() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">New task</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-950 sm:text-3xl">Create Task</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add the task details now. Backend submission and validation can be wired in the next step.
          </p>
        </div>

        <TaskForm />
      </div>
    </Layout>
  );
}

export default CreateTaskPage;
