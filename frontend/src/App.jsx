import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import CreateTaskPage from './pages/CreateTaskPage.jsx';
import TaskListPage from './pages/TaskListPage.jsx';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskListPage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
