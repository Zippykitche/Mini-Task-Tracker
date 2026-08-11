import apiClient from './apiClient.js';

export async function getTasks() {
  const response = await apiClient.get('/tasks');
  return response.data;
}

export async function createTask(taskData) {
  const response = await apiClient.post('/tasks', taskData);
  return response.data;
}

export async function updateTask(id, updateData) {
  const response = await apiClient.put(`/tasks/${id}`, updateData);
  return response.data;
}

export async function deleteTask(id) {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
}
