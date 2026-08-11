import apiClient from './apiClient.js';
import { toApiStatus } from '../utils/statusOptions.js';

function prepareTaskPayload(taskData) {
  if (!taskData || !Object.hasOwn(taskData, 'status')) {
    return taskData;
  }

  return {
    ...taskData,
    status: toApiStatus(taskData.status),
  };
}

export async function getTasks() {
  const response = await apiClient.get('/tasks');
  return response.data;
}

export async function createTask(taskData) {
  const response = await apiClient.post('/tasks', prepareTaskPayload(taskData));
  return response.data;
}

export async function updateTask(id, updateData) {
  const response = await apiClient.put(`/tasks/${id}`, prepareTaskPayload(updateData));
  return response.data;
}

export async function deleteTask(id) {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
}
