import apiClient from './apiClient.js';

const STATUS_TO_API = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

function prepareTaskPayload(taskData) {
  return {
    ...taskData,
    status: STATUS_TO_API[taskData.status] || taskData.status,
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
