import { Route, Routes } from 'react-router-dom';
import TasksPage from './pages/TasksPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TasksPage />} />
    </Routes>
  );
}

export default App;
