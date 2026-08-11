import apiClient from './apiClient.js';

const STORAGE_KEY = 'mini_task_tracker_tasks';

const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Create Flask API endpoints',
    description: 'Prepare the CRUD endpoints for the backend task resource.',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Design responsive task cards',
    description: 'Make sure each task is readable on small screens and desktop layouts.',
    status: 'done',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Add title validation',
    description: 'Show a clear validation message when a task title is missing.',
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
];

function getLocalTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  }
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fallback if parsing fails
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
  return INITIAL_TASKS;
}

function saveLocalTasks(tasks) {
  if (Array.isArray(tasks)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}

export async function getTasks() {
  try {
    const response = await apiClient.get('/tasks');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.tasks)) {
      return response.data.tasks;
    }
  } catch {
    // API not reachable or returns error status (e.g. 404)
  }
  return getLocalTasks();
}

export async function createTask(taskData) {
  try {
    const response = await apiClient.post('/tasks', taskData);
    if (response.data && typeof response.data === 'object' && response.data.id) {
      return response.data;
    }
  } catch {
    // Fallback to local storage
  }
  const tasks = getLocalTasks();
  const newTask = {
    id: String(Date.now()),
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status || 'todo',
    createdAt: new Date().toISOString(),
  };
  const updatedTasks = [newTask, ...tasks];
  saveLocalTasks(updatedTasks);
  return newTask;
}

export async function updateTask(id, updateData) {
  try {
    const response = await apiClient.put(`/tasks/${id}`, updateData);
    if (response.data && typeof response.data === 'object' && response.data.id) {
      return response.data;
    }
  } catch {
    // Fallback to local storage
  }
  const tasks = getLocalTasks();
  let updatedTask = null;
  const updatedTasks = tasks.map((task) => {
    if (String(task.id) === String(id)) {
      updatedTask = { ...task, ...updateData };
      return updatedTask;
    }
    return task;
  });
  saveLocalTasks(updatedTasks);
  return updatedTask || { id, ...updateData };
}

export async function deleteTask(id) {
  try {
    await apiClient.delete(`/tasks/${id}`);
  } catch {
    // Fallback to local storage
  }
  const tasks = getLocalTasks();
  const updatedTasks = tasks.filter((task) => String(task.id) !== String(id));
  saveLocalTasks(updatedTasks);
  return true;
}
