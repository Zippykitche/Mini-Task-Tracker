import Layout from '../components/Layout.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';

function TasksPage() {
  // Placeholder page for the task tracker workflow.
  // This page will coordinate fetching tasks and passing data to child components.
  return (
    <Layout>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <TaskForm />
        <TaskList />
      </div>
    </Layout>
  );
}

export default TasksPage;
